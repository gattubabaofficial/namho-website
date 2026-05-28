/**
 * Helper to dynamically resolve the API base URL.
 * If running in the browser, it uses the current page hostname (supporting local network IPs like 192.168.1.3).
 * If running on the server (SSR), it defaults to localhost.
 */
export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Use explicitly configured API URL if available
  if (process.env.NEXT_PUBLIC_API_URL) {
    return `${process.env.NEXT_PUBLIC_API_URL}${cleanPath}`;
  }
  
  const isClient = typeof window !== "undefined";
  const host = isClient ? window.location.hostname : "localhost";
  return `http://${host}:8000${cleanPath}`;
}
