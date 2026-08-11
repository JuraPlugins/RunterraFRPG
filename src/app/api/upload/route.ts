import { put } from "@vercel/blob";
import { requireUser } from "@/lib/auth";
import { apiError } from "@/lib/http";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const form = await request.formData();
    const file = form.get("file");
    const purpose = String(form.get("purpose") || "media").replace(/[^a-z-]/g, "").slice(0, 20);
    if (!(file instanceof File) || !allowed.has(file.type)) return Response.json({ error: "PNG, JPEG, WebP veya GIF seç." }, { status: 400 });
    if (file.size > 4_000_000) return Response.json({ error: "Görsel en fazla 4 MB olabilir." }, { status: 400 });
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`${purpose}/${user.id}/${file.name}`, file, { access: "public", addRandomSuffix: true });
      return Response.json({ url: blob.url });
    }
    if (file.size > 750_000) return Response.json({ error: "Yerel denemede görsel en fazla 750 KB olabilir. Vercel Blob bağlandığında sınır 4 MB olur." }, { status: 400 });
    const data = Buffer.from(await file.arrayBuffer()).toString("base64");
    return Response.json({ url: `data:${file.type};base64,${data}`, localFallback: true });
  } catch (error) { return apiError(error); }
}
