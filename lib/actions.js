"use server";

import { revalidatePath } from "next/cache";

/* The entry pages are static and rebuilt at most once a minute (see
   `revalidate` on each page). Without this, a contributor who has just
   saved an edit would be shown the old text and assume it failed. After any
   add, edit or delete, the forms call this so the next visit rebuilds every
   page from the table.

   It writes nothing and reads no session; the worst anyone can do by
   calling it is make the site rebuild a page early. */
export async function refreshArchive() {
  revalidatePath("/", "layout");
}
