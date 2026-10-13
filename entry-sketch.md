# Entry Sketch — Kampot Durian Field Guide

What one entry in this archive looks like, as data. Since Lab 6 each entry is a
row in the Supabase `entries` table; `lib/entries.js` turns a row into this
shape for the pages.

This archive is a record of testimony from real people, asked directly. Every
entry traces to the interview behind it, so `sources` is required. There is no
`contributor` field: the orchard's owners are the source of the whole guide,
and are credited on every entry instead — by role, not by name, at their request.

| Field | Required? | Notes |
|---|---|---|
| slug | required | url-safe id, e.g. `reading-ripeness` — becomes `/field-notes/[slug]` |
| figNumber | required | catalogue number shown on the card, e.g. "01" |
| title | required | short name for the entry, e.g. "Reading Ripeness" |
| khmerName | optional | the Khmer term, rendered and searchable where given (Fig. 12 carries one) |
| title_km, body_km, sources_km, tags_km | optional | the Khmer edition's text; where empty, that field shows in English |
| body | required | the entry itself, written in the guide's own voice |
| sources | required | one or more interviews the claims trace to — never a publication |
| image | optional | stored as `photo_url`: a path in `public/` (size, alt and caption in `content/photos.js`) or a contributed photo in the `photos` bucket |
| tags | optional | e.g. "harvest", "variety", "export", "climate" |
| status | optional | `published` or `in-progress`. Both are shown and neither is labelled; anything else stays off the site |

Cut: no GPS coordinates, and nothing that would locate the farm. Kept: the
named interview behind every claim, because "field guide" is only credible if
the reader can see where each line came from.
