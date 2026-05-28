/**
 * Helper to dynamically resolve the API base URL.
 * If running in the browser, it uses the current page hostname (supporting local network IPs like 192.168.1.3).
 * If running on the server (SSR), it defaults to localhost.
 */
export function getApiUrl(path: string): string {
  const isClient = typeof window !== "undefined";
  const host = isClient ? window.location.hostname : "localhost";
  // Ensure path starts with a slash
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `http://${host}:8000${cleanPath}`;
}
