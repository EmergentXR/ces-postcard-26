// api/image.js
export default async function handler(req, res) {
  const src = req.query.src;
  if (!src) return res.status(400).json({ error: "Missing src" });

  try {
    // Only allow http(s) URLs
    const url = new URL(src);
    if (!["http:", "https:"].includes(url.protocol)) {
      return res.status(400).json({ error: "Invalid src protocol" });
    }

    const r = await fetch(url.toString());
    if (!r.ok) {
      return res.status(502).json({ error: "Failed to fetch image", status: r.status });
    }

    const contentType = r.headers.get("content-type") || "image/webp";
    const buf = Buffer.from(await r.arrayBuffer());

    // CORS + caching
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Content-Type", contentType);

    return res.status(200).send(buf);
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}