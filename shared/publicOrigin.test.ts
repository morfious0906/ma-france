import { describe, expect, it } from "vitest";
import { resolveOAuthCallbackUrl } from "./oauth";

describe("VITE_PUBLIC_ORIGIN", () => {
  it("points to a reachable deployed origin", async () => {
    const publicOrigin = process.env.VITE_PUBLIC_ORIGIN;
    expect(publicOrigin).toBeTruthy();

    const deployedUrl = new URL("/", publicOrigin);
    expect(deployedUrl.protocol).toBe("https:");

    expect(resolveOAuthCallbackUrl(publicOrigin, "https://temporary-preview.example")).toBe(
      new URL("/api/oauth/callback", deployedUrl).toString(),
    );

    const response = await fetch(deployedUrl, { method: "HEAD", signal: AbortSignal.timeout(12_000) });
    expect(response.ok).toBe(true);
  }, 15_000);
});
