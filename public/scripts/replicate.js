// scripts/replicate.js
export async function generateImage(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      input: { aspect_ratio: "9:16", image_size: 1024 },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  return data.image;
}