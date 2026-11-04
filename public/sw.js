/* Bendenia Food — service worker (offline support for the link-in-bio PWA).
 *
 * Strategies (same-origin GET only; WhatsApp, Maps, socials etc. pass through):
 *  - Page navigations ........ network-first → last cached copy → cached home page
 *  - /_next/static/* ......... cache-first (file names are content-hashed / immutable)
 *  - /_next/image, /photos/* . stale-while-revalidate, capped (URLs carry ?v=hash)
 *  - everything else ......... network-first with cache fallback
 * Bump VERSION to drop all old caches on the next visit.
 */
const VERSION = "v1";
const PAGES = `bf-pages-${VERSION}`;
const STATIC = `bf-static-${VERSION}`;
const IMAGES = `bf-images-${VERSION}`;
const MAX_IMAGES = 80;
const PRECACHE = ["/", "/manifest.webmanifest", "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((c) => c.addAll(PRECACHE))
      .catch(() => {})
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("bf-") && !k.endsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res.ok && res.type === "basic") cache.put(request, res.clone());
    return res;
  } catch {
    return (
      (await cache.match(request, { ignoreSearch: request.mode === "navigate" })) ||
      (fallbackUrl && (await cache.match(fallbackUrl))) ||
      Response.error()
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(event, cacheName, max) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(event.request);
  const refresh = fetch(event.request)
    .then((res) => {
      if (res.ok) cache.put(event.request, res.clone()).then(() => trim(cacheName, max));
      return res;
    })
    .catch(() => hit || Response.error());
  if (hit) {
    event.waitUntil(refresh.then(() => undefined));
    return hit;
  }
  return refresh;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // React Server Component payloads and the contact card are always fetched live.
  if (request.headers.get("RSC") || url.searchParams.has("_rsc") || url.pathname.endsWith(".vcf")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGES, "/"));
  } else if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC));
  } else if (url.pathname.startsWith("/_next/image") || url.pathname.startsWith("/photos/")) {
    event.respondWith(staleWhileRevalidate(event, IMAGES, MAX_IMAGES));
  } else {
    event.respondWith(networkFirst(request, PAGES));
  }
});
