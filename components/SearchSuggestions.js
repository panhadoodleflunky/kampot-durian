import Link from "next/link";

/* The list under the nav search box: suggestions while typing, quick links
   before. `active` is the row Enter would open; arrow keys move it. */
export default function SearchSuggestions({ id, heading, rows, active, onPick, empty }) {
  return (
    <div className="nav-search-results">
      <p className="nav-search-heading">{heading}</p>
      {rows.length ? (
        <ul id={id} role="listbox" aria-label={heading}>
          {rows.map((row, i) => (
            <li key={row.href} role="option" id={`${id}-${i}`} aria-selected={i === active}>
              <Link href={row.href} onClick={onPick} className={i === active ? "is-active" : undefined}>
                <span className="nav-search-title">{row.title}</span>
                <span className="nav-search-hint">{row.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="nav-search-empty">{empty}</p>
      )}
    </div>
  );
}
