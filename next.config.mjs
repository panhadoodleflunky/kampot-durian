/** @type {import('next').NextConfig} */

/* AVIF first, WebP second, the original JPEG last. The seven photographs are
   2.97 MB of JPEG between them and every reader on mobile data in Kampot pays
   for the ones on the page they open; AVIF is the format that cuts that
   hardest. Next.js serves whichever the requesting browser accepts, resized to
   the widths the `sizes` attribute on each photograph asks for, so no phone
   downloads a 2048px file for a 390px screen any more. */
/* Contributed photographs live in the Supabase `photos` bucket (Lab 7), and
   next/image refuses any host it hasn't been told about. Only that one
   bucket's public path is allowed, not the whole of supabase.co. The host is
   read from the environment so the project URL stays out of the repo. */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/photos/**" }]
      : [],
  },
};

export default nextConfig;
