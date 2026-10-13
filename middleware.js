import { NextResponse } from "next/server";

/* Two editions, one page tree (app/[lang]/). Khmer addresses (/km/...) map
   onto it as they are; English addresses (/about) are rewritten to
   /en/about inside the server, so they never change in the browser and no
   existing link breaks. /en/... typed by hand is sent to the plain address,
   so each page has exactly one English URL.

   The language button stores the reader's choice in a `lang` cookie; only
   the front door (/) honours it, so a shared English link still opens in
   English. */
/* The edition also rides along as an `x-lang` request header, for the one
   page that is not handed its route params: the 404. */
function withLang(request, lang) {
  const headers = new Headers(request.headers);
  headers.set("x-lang", lang);
  return { request: { headers } };
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/km" || pathname.startsWith("/km/")) return NextResponse.next(withLang(request, "km"));

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" && request.cookies.get("lang")?.value === "km") {
    const url = request.nextUrl.clone();
    url.pathname = "/km";
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url, withLang(request, "en"));
}

/* Not for Next's own files, the API, or anything with a file extension
   (photographs, icon.svg, robots.txt, sitemap.xml). */
export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)"],
};
