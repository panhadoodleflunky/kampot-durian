/** @type {import('next').NextConfig} */

/* AVIF first, WebP second, the original JPEG last. The ten photographs in
   public/ are 3.5 MB of JPEG between them and every reader on mobile data
   in Kampot pays for the ones on the page they open; AVIF is the format
   that cuts that hardest. Next.js serves whichever the requesting browser accepts, resized to
   the widths the `sizes` attribute on each photograph asks for, so no phone
   downloads a 2048px file for a 390px screen any more. */
/* Contributed photographs live in the Supabase `photos` bucket (Lab 7), and
   next/image refuses any host it hasn't been told about. Only that one
   bucket's public path is allowed, not the whole of supabase.co. The host is
   read from the environment so the project URL stays out of the repo. */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

/* Security headers on every page (from a classmate's security review, M5).
   No other site may show these pages inside a frame, so nobody can lay a
   fake page over /review or /account and trick a click (frame-ancestors,
   and X-Frame-Options for older browsers). No plugins, no rewritten <base>,
   forms post only here; the browser trusts the declared file types; and
   other sites see only the domain a reader came from. A full script CSP
   would need a nonce per request and make every static page dynamic, so it
   is left out. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/photos/**" }]
      : [],
  },
};

export default nextConfig;
