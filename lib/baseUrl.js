// Server-side fetch()s (getServerSideProps/getStaticProps) need an absolute
// URL — relative paths don't resolve outside the browser. VERCEL_URL is set
// automatically on every Vercel deployment (including previews), so this
// works without any manual config there; NEXT_PUBLIC_SITE_URL is an escape
// hatch for a custom domain or a non-Vercel host.
export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
