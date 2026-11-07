import { MAX_PHOTO_BYTES } from "./entry-rules.js";

/* Every photo is redrawn in the browser before it is uploaded (Sprint 3,
   from the context audit). Two reasons:

   - Size. A photo straight from a phone camera can be over the bucket's
     5 MB limit, and a grower can't be expected to know how to shrink one.
     Redrawn with its long edge at most 2400 px (the site never shows a
     photo wider than that), it comes out far smaller.
   - Privacy. A phone writes where the photo was taken (GPS) and which
     phone took it into the file. Drawing the picture onto a canvas and
     saving the canvas keeps only the pixels; that hidden data stays behind.
     For an archive that withholds where the farm is, that matters.

   The result is always a JPEG. Plain browser APIs, no package. Returns the
   new file, or null if this browser can't decode or shrink the image, in
   which case the caller refuses the photo (lib/photo-upload.js): the
   original may carry its GPS position, so it never goes up as it is. */
const LONG_EDGE = [2400, 1600];
const QUALITY = 0.85;

export async function redrawPhoto(file) {
  let bitmap;
  try {
    /* Turned upright from the camera's orientation tag before drawing. */
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return null;
  }
  try {
    for (const edge of LONG_EDGE) {
      const blob = await draw(bitmap, edge);
      if (blob && blob.size <= MAX_PHOTO_BYTES) return new File([blob], "photo.jpg", { type: "image/jpeg" });
    }
    return null;
  } finally {
    bitmap.close();
  }
}

function draw(bitmap, edge) {
  const scale = Math.min(1, edge / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  /* A JPEG has no transparency: a see-through PNG gets a white page, not black. */
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
}
