// api/generate.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return res.status(500).json({ error: "Missing REPLICATE_API_TOKEN in server env" });

  const { prompt, input = {} } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt (string)" });
  }

  // Defaults (you can override via req.body.input)
  const modelInput = {
    seed: -1,
    prompt,
    guidance: 3.5,
    image_size: 1024,
    aspect_ratio: "9:16",
    output_format: "webp",
    output_quality: 80,
    num_inference_steps: 34,
    speed_mode: "Extra Juiced 🔥 (more speed)",
    ...input,
  };

  try {
    // 1) Create prediction via model endpoint (no version hash needed)
    const createResp = await fetch(
      "https://api.replicate.com/v1/models/prunaai/flux-fast/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: modelInput }),
      }
    );

    const created = await createResp.json();
    if (!createResp.ok) {
      return res.status(createResp.status).json({ error: "Replicate create failed", details: created });
    }

    const id = created?.id;
    if (!id) return res.status(500).json({ error: "No prediction id returned", details: created });

    // 2) Poll until done
    const timeoutMs = 120000;
    const intervalMs = 1200;
    const start = Date.now();

    while (true) {
      if (Date.now() - start > timeoutMs) {
        return res.status(504).json({ error: "Prediction polling timed out", id });
      }

      const pollResp = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });

      const polled = await pollResp.json();
      if (!pollResp.ok) {
        return res.status(pollResp.status).json({ error: "Replicate poll failed", details: polled });
      }

      const status = polled?.status;

      if (status === "succeeded") {
        const out = polled?.output;

        // Handle common output shapes
        const imageUrl =
          typeof out === "string"
            ? out
            : Array.isArray(out)
              ? out[0]
              : out?.url || out?.image || out?.images?.[0] || null;

        if (!imageUrl) {
          // Return details so we can see the real output shape
          return res.status(500).json({
            error: "Model returned no image URL",
            output_type: typeof out,
            output_preview: out,
            details: polled,
          });
        }

        return res.status(200).json({ image: imageUrl, id });
      }

      if (status === "failed" || status === "canceled") {
        return res.status(500).json({ error: polled?.error || "Prediction failed", details: polled });
      }

      await new Promise((r) => setTimeout(r, intervalMs));
    }
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}