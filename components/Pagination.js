"use client";

/* Page controls for the Field Notes index. Presentational: it owns no state,
   it reports the page it was asked for. Rendered only when there is more than
   one page, so a short list never grows a control it doesn't need.

   Previous and Next are aria-disabled rather than disabled at the ends. A
   disabled button drops keyboard focus: press Next onto the last page and
   focus fell to the top of the document, losing the reader's place. */
export default function Pagination({ page, pages, onChange, label }) {
  if (pages <= 1) return null;

  const numbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="pager" aria-label={label}>
      <button
        type="button"
        className="pager-step"
        onClick={() => page > 1 && onChange(page - 1)}
        aria-disabled={page === 1}
      >
        Previous
      </button>

      <ul className="pager-list">
        {numbers.map((n) => (
          <li key={n}>
            <button
              type="button"
              className="pager-no"
              onClick={() => onChange(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n} of ${pages}`}
            >
              {String(n).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="pager-step"
        onClick={() => page < pages && onChange(page + 1)}
        aria-disabled={page === pages}
      >
        Next
      </button>
    </nav>
  );
}
