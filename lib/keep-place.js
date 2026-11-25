/* Keeps the reader's place across a language switch. The other edition is a
   new page with different text, so Next.js would start it at the top, and
   the same pixel would not be the same place (Khmer lines are taller).
   Before leaving, this notes which block is at the top of the screen; the
   new page scrolls that block back into the same spot.

   Blocks are matched by their place in the page: both editions are built
   from the same files, so the 9th paragraph in English is the 9th in Khmer.
   Where the two pages don't have the same number of blocks, it falls back to
   the same share of the page. Kept in sessionStorage, for this tab only. */
const KEY = "keep-place";
const BLOCKS = "h1, h2, h3, h4, p, li, figure, blockquote, tr";

const blocks = () => [...document.body.querySelectorAll(BLOCKS)];
const navHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
const go = (top) => window.scrollTo({ top: Math.max(0, top), behavior: "instant" });

export function savePlace(target) {
  const { scrollY, innerHeight } = window;
  const height = document.documentElement.scrollHeight;
  const all = blocks();
  const top = navHeight();
  const index = all.findIndex((el) => {
    const box = el.getBoundingClientRect();
    return box.height > 0 && box.bottom > top;
  });
  const place = {
    target,
    bottom: scrollY > 0 && scrollY + innerHeight >= height - 4,
    share: height > innerHeight ? scrollY / (height - innerHeight) : 0,
    count: all.length,
    index,
    offset: index >= 0 ? all[index].getBoundingClientRect().top : 0,
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(place));
  } catch {}
}

/* Called once the new page is up. Does nothing unless the saved place was
   for this very page. Runs again when the Khmer fonts land, since they
   change the height of every line. */
export function restorePlace(path) {
  let place;
  try {
    place = JSON.parse(sessionStorage.getItem(KEY));
    sessionStorage.removeItem(KEY);
  } catch {}
  if (!place || place.target !== path) return;

  const put = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (place.bottom) return go(height);
    const all = blocks();
    if (place.index >= 0 && all.length === place.count) {
      return go(window.scrollY + all[place.index].getBoundingClientRect().top - place.offset);
    }
    go(place.share * height);
  };
  put();
  document.fonts?.ready.then(put);
}
