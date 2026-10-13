import { notFound } from "next/navigation";

/* Any address no page answers, in either edition, lands here and gets the
   edition's own 404 (app/[lang]/not-found.js) instead of Next's default. */
export default function Unknown() {
  notFound();
}
