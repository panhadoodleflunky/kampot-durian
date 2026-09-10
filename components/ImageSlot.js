/* A marker standing where a photograph will go, so an empty slot is visible
   while the guide is being worked on rather than something to remember.

   Development only. `process.env.NODE_ENV` is inlined at build time, so in a
   production build this component compiles to a constant `null` and neither
   the markup nor the brief reaches a deployed page. To see the markers on a
   built site instead — a Vercel preview, say — change the guard to
   `process.env.VERCEL_ENV === "production"`. */
export default function ImageSlot({ figNumber, title, brief }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <aside className="image-slot" aria-label={`Photograph wanted for entry ${figNumber}`}>
      <p className="image-slot-head">
        <span className="image-slot-no">{figNumber}</span>
        Photograph wanted — {title}
      </p>
      <p className="image-slot-brief">{brief}</p>
      <p className="image-slot-how">
        Put the file in <code>public/</code>, then fill in <code>image</code>{" "}
        for this entry in <code>content/field-notes.js</code> and delete its{" "}
        <code>imageWanted</code> line.
      </p>
    </aside>
  );
}
