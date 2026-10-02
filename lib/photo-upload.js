import { MAX_PHOTO_BYTES } from "./entry-rules.js";

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

/* Returns { error } with a message for the reader, or { kind } with the
   type and extension the file really is. */
export async function checkPhoto(file) {
  if (!file) return { error: "Choose a photograph." };
  if (file.size > MAX_PHOTO_BYTES) {
    return { error: "That photo is over 5 MB. Choose a smaller one." };
  }
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const kind = SIGNATURES.find((sig) => sig.test(head));
  if (!kind) return { error: "Photos must be JPEG, PNG or WebP." };
  return { kind };
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
   live in public/ and were never in the bucket. */
export function storagePath(publicUrl) {
  const marker = "/storage/v1/object/public/photos/";
  const at = publicUrl ? publicUrl.indexOf(marker) : -1;
  return at === -1 ? null : decodeURIComponent(publicUrl.slice(at + marker.length));
}
