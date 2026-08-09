#!/usr/bin/env node
// One-time helper: turns the Google Ads OAuth Desktop client into a long-lived refresh token.
// Run it, open the printed URL, log in with the Google account that administers the
// Yolkling Ads / MCC account, approve, and this captures the redirect locally and
// writes GOOGLE_ADS_REFRESH_TOKEN to .env.local. Nothing is printed to the terminal
// in full; only a truncated confirmation.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { loadLocalEnv, missingEnv } from "../outreach-agent/env.mjs";

loadLocalEnv();

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const ENV_LOCAL = path.join(ROOT, ".env.local");
const PORT = Number(process.env.GOOGLE_ADS_OAUTH_PORT || 8942);
const SCOPE = "https://www.googleapis.com/auth/adwords";

const missing = missingEnv(["GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET"]);
if (missing.length) {
  console.error(`Missing in .env.local: ${missing.join(", ")}`);
  process.exit(1);
}

const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
const redirectUri = `http://localhost:${PORT}`;

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", redirectUri);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

console.log("\nOpen this URL and log in with the account that administers the Yolkling Ads/MCC account:\n");
console.log(authUrl.toString());
console.log(`\nWaiting for the redirect on ${redirectUri} ...\n`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri);
  if (url.pathname !== "/") {
    res.writeHead(404);
    res.end();
    return;
  }
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(`OAuth error: ${error}. You can close this tab.`);
    console.error(`OAuth error: ${error}`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("No authorization code received. You can close this tab.");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Got it, you can close this tab and go back to the terminal.");

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const data = await tokenRes.json();

    if (!tokenRes.ok || !data.refresh_token) {
      console.error("Token exchange failed:", data.error || data);
      console.error(
        data.error === "invalid_grant"
          ? "Tip: the auth code can only be used once. Re-run this script and try again."
          : ""
      );
      server.close();
      process.exit(1);
    }

    const existing = fs.existsSync(ENV_LOCAL) ? fs.readFileSync(ENV_LOCAL, "utf8") : "";
    const withoutOldToken = existing
      .split("\n")
      .filter((line) => !line.startsWith("GOOGLE_ADS_REFRESH_TOKEN="))
      .join("\n");
    fs.writeFileSync(
      ENV_LOCAL,
      `${withoutOldToken.trimEnd()}\nGOOGLE_ADS_REFRESH_TOKEN=${data.refresh_token}\n`
    );

    console.log(`\nSaved. GOOGLE_ADS_REFRESH_TOKEN written to .env.local (ends in ...${data.refresh_token.slice(-6)}).`);
    console.log("This token does not expire unless revoked, no need to run this again.");
  } catch (err) {
    console.error("Token exchange request failed:", err.message);
  } finally {
    server.close();
    process.exit(0);
  }
});

server.listen(PORT);
