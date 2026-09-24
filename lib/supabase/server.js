import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/* The server half. lib/entries.js reads the `entries` table through it, which
   is why the pages that show entries render per request rather than as static
   HTML: this client reads cookies. The header still reads auth in the
   browser, so pages that show no entries stay static. Later, an entry that
   belongs to a contributor has to be checked here, on the server, where the
   reader cannot lie about who they are.

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
