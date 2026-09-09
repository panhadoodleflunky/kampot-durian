# Entry Sketch — Kampot Durian Field Guide

What one entry in this archive looks like, as data.

This archive is a record of testimony from real people, asked directly. Every
entry traces to a named, dated interview, so `sources` is required. There is no
`contributor` field: the growers asked not to be named, and are credited by
relationship, place and date instead.

| Field | Required? | Notes |
|---|---|---|
| slug | required | url-safe id, e.g. `reading-ripeness` — becomes `/field-notes/[slug]` |
| figNumber | required | catalogue number shown on the card, e.g. "01" |
| title | required | short name for the entry, e.g. "Reading Ripeness" |
| khmerName | optional | the Khmer term. Empty throughout the English edition; kept for the Khmer edition, where the terms in PROJECT.md §8 go back in |
| body | required | the entry itself, written in the guide's own voice |
| sources | required | one or more interviews the claims trace to — never a publication |
| image | optional | supporting photo: `src`, `width`, `height`, `alt`, `caption` — the pixel size is real, measured from the file, so the browser can reserve the space |
| tags | optional | e.g. "harvest", "variety", "export", "climate" |
| status | optional | `published` or `in-progress` — some entries are honestly unfinished |

Cut: no GPS coordinates, and nothing that would locate the farm. Kept: the
dated interview behind every claim, because "field guide" is only credible if
the reader can see where each line came from.
