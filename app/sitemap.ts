import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPhotos } from "@/lib/photos";

/** Home page + its food photos (image sitemap helps them surface in Google Images). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { hero, gallery } = await getPhotos();
  const images = [hero, ...gallery]
    .filter((p) => p !== null)
    .map((p) => new URL(p.src, site.url).toString());
  return [{ url: site.url, changeFrequency: "weekly", priority: 1, images }];
}
