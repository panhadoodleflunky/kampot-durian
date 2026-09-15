import { createBrowserClient } from "@supabase/ssr";

/* The browser half of the auth plumbing. Called inside components that run in
   the browser — the login and signup forms, and the header's auth status.

   Both values are NEXT_PUBLIC_ on purpose: the publishable key is designed to
   ship to the browser, the same way a Google Maps key does. It is not a
   secret in the sense the service-role key is, and the service-role key is
   not in this repository and never will be. The two names still live only in
   .env.local and in the Vercel environment, per rule 3 in AGENTS.md.

   A new client per call rather than one shared instance: @supabase/ssr keeps
   the session in cookies, so a second client reads the same session, and a
   module-level singleton would be created during the build, where there is no
   browser to read cookies from. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
