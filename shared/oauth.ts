export function resolveOAuthCallbackUrl(configuredOrigin: string | undefined, browserOrigin: string): string {
  const origin = configuredOrigin?.trim() || browserOrigin;
  return new URL("/api/oauth/callback", origin).toString();
}
