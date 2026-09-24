import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/* The server half. Nothing calls it yet: public reads go through the
   cookie-free client in lib/entries.js, so pages stay static, and the header
   reads auth in the browser. It is for what comes next — an entry that
   belongs to a contributor has to be checked on the server, where the reader
   cannot lie about who they are. Anything that calls it renders per request,
   because it reads cookies.

   `cookies()` is awaited: it is async in Next.js 15. The try/catch around
   setAll is the documented @supabase/ssr shape — a Server Component may read
   cookies but may not write them, and a refreshed token arriving during a
   render would otherwise throw. */
export async function createClient() {
  const store = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll(list) {
          try {
            list.forEach(({ name, value, options }) =>
              store.set(name, value, options),
            );
          } catch {
            /* Called from a Server Component. A Route Handler or Server
               Action can write; here the refresh is simply not persisted. */
          }
        },
      },
    },
  );
}
