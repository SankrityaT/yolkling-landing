import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://yolkling.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://yolkling.com/support", lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: "https://yolkling.com/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: "https://yolkling.com/terms", lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
