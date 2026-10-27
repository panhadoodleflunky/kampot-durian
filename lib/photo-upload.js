import { MAX_PHOTO_BYTES } from "./entry-rules.js";
import { redrawPhoto } from "./redraw-photo.js";
import { pick } from "./i18n.js";
import { forms } from "../content/copy/forms.js";

/* Photo uploads, following OWASP's file upload guidance: an allowlist of
   types, a size limit, the type proven from the file's own bytes rather than
   taken from its name or the browser's guess, and a stored name the server
   chooses. The `photos` bucket repeats the type and size limits (Lab 7
   Part 0), so this check is the polite one and the bucket is the enforcer. */

/* The first bytes of each allowed format. A file renamed to .jpg that is
   really a PDF fails here; the extension comes from what the bytes are. */
const SIGNATURES = [
  { type: "image/jpeg", ext: "jpg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    type: "image/png",
    ext: "png",
    test: (b) => [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((v, i) => b[i] === v),
  },
  {
    type: "image/webp",
    ext: "webp",
    /* "RIFF" at 0, "WEBP" at 8. */
    test: (b) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

/* Returns { error } with a message for the reader, or { file, kind }: the
   file to upload and the type and extension it really is.

   The type is proven from the original's bytes first, so nothing that isn't
   a JPEG, PNG or WebP is ever decoded. Then the photo is redrawn smaller and
   without its hidden location data (lib/redraw-photo.js), and the size
   limit applies to what will actually be uploaded. If this browser can't
   redraw it, nothing goes up: the original may carry the GPS position the
   archive promises never to publish. */
export async function checkPhoto(file, lang = "en") {
  const t = pick(forms, lang).photo;
  if (!file) return { error: t.choose };
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const original = SIGNATURES.find((sig) => sig.test(head));
  if (!original) return { error: t.wrongType };

  const redrawn = await redrawPhoto(file);
  if (!redrawn) return { error: t.cantPrepare };
  if (redrawn.size > MAX_PHOTO_BYTES) return { error: t.tooBig };
  return { file: redrawn, kind: SIGNATURES[0] };
}

/* Uploads to photos/<user id>/<random uuid>.<ext> — the folder the storage
   policy lets this user write into, and a name nobody chose, so a file
   called "../../index.html" or "<script>.jpg" never becomes a path. Returns
   the public URL, or throws. */
export async function uploadPhoto(supabase, userId, file, kind) {
  const path = `${userId}/${crypto.randomUUID()}.${kind.ext}`;
  const { error } = await supabase.storage
    .from("photos")
    .upload(path, file, { contentType: kind.type, upsert: false });
  if (error) throw error;
  return supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
}

/* The storage path back out of a public URL, so a photo can be removed when
   its entry is deleted or its photo replaced. Null for the older photos that
   live in public/ and were never in the bucket.

   The URL is the note author's to write, and the curator's session may
   delete any photo, so only a path this code could have made is returned:
   <owner id>/<uuid>.<ext>, inside the entry owner's own folder. Anything
   else (another folder, "..", a malformed %) is null and nothing is
   removed. The photo_url_ours check constraint already refuses a URL
   outside the owner's folder; this is the second lock. */
const BUCKET = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos/`;
const SHAPE = /^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|png|webp)$/;

export function storagePath(publicUrl, ownerId) {
  if (typeof publicUrl !== "string" || !publicUrl.startsWith(BUCKET)) return null;
  let path;
  try {
    path = decodeURIComponent(publicUrl.slice(BUCKET.length));
  } catch {
    return null;
  }
  if (!SHAPE.test(path) || !path.startsWith(`${ownerId}/`)) return null;
  return path;
}
