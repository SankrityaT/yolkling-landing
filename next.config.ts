import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apple rejects the association file unless it is served as application/json.
        // The file has no extension (by Apple's requirement), so Next would otherwise
        // serve it as octet-stream and universal links would silently never work —
        // which is the single most common reason they don't.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;
