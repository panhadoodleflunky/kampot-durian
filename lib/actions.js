"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server.js";

/* The entry pages are static and rebuilt at most once a minute (see
   `revalidate` on each page). Without this, a contributor who has just
   saved an edit would be shown the old text and assume it failed. After any
   add, edit or delete, the forms call this so the next visit rebuilds every
   page from the table.

   A Server Action can be called by anyone who finds its id in the page's
   JavaScript, and each call throws away every cached page. So it only runs
   for a logged-in account: getUser asks the auth server, which a forged
   cookie can't fool. Logged out, it quietly does nothing. */
export async function refreshArchive() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;
  revalidatePath("/", "layout");
}
