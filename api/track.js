// /api/track.js
export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const body = await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => resolve(data));
    });

    const event = JSON.parse(body || "{}");

    // 👀 This is what you'll see in Vercel logs
    console.log("📊 CLIENT EVENT:", {
      event: event.event,
      label: event.label,
      url: event.url,
      page: event.page,
      ts: event.ts,
    });

    res.status(204).end();
  } catch (err) {
    console.error("Track error:", err);
    res.status(400).end();
  }
}