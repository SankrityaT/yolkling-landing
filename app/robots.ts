import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://yolkling.com/sitemap.xml",
    host: "https://yolkling.com",
  };
}
