/** @type {import('next').NextConfig} */

/* AVIF first, WebP second, the original JPEG last. The seven photographs are
   2.97 MB of JPEG between them and every reader on mobile data in Kampot pays
   for the ones on the page they open; AVIF is the format that cuts that
   hardest. Next.js serves whichever the requesting browser accepts, resized to
   the widths the `sizes` attribute on each photograph asks for, so no phone
   downloads a 2048px file for a 390px screen any more. */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
