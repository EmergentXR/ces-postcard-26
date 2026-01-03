// scripts/generate.js
import { getPrompt, Q1_KEY, Q2_KEY, Q3_KEY } from "./prompts.js";
import { generateImage } from "./replicate.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const rawQ1 = params.get("q1");
  const rawQ2 = params.get("q2");
  const rawQ3 = params.get("q3");

  if (!rawQ1 || !rawQ2 || !rawQ3) {
    window.location.href = "index.html";
    return;
  }

  // Elements
  const line1 = document.getElementById("choice-line-1");
  const line2 = document.getElementById("choice-line-2");
  const line3 = document.getElementById("choice-line-3");
  const lines = [line1, line2, line3];

  // 1) Fill the 3 stacked lines (so user always sees their choices)
  if (line1) line1.textContent = rawQ1;
  if (line2) line2.textContent = rawQ2;
  if (line3) line3.textContent = rawQ3;

  // Always start "inactive" on fresh load
  lines.forEach((el) => el?.classList.remove("generate-keyword--active"));

  // If user hits back from postcard, Safari/Chrome may restore the page from cache
  // This ensures we reset the animation state on back/forward navigation.
  window.addEventListener("pageshow", () => {
    lines.forEach((el) => el?.classList.remove("generate-keyword--active"));
  });

  // 2) Normalize → keys
  const q1Key = Q1_KEY[rawQ1];
  const q2Key = Q2_KEY[rawQ2];
  const q3Key = Q3_KEY[rawQ3];

  if (!q1Key || !q2Key || !q3Key) {
    console.error("Mapping failed", { rawQ1, rawQ2, rawQ3, q1Key, q2Key, q3Key });
    alert("Mapping failed. Check Q1_KEY/Q2_KEY/Q3_KEY in scripts/prompts.js");
    window.location.href = "index.html";
    return;
  }

  // 3) Get hard prompt
  const hardPrompt = getPrompt({ q1Key, q2Key, q3Key });

  if (!hardPrompt) {
    alert(
      `No hard prompt found.\n\nQ1: ${rawQ1}\nQ2: ${rawQ2}\nQ3: ${rawQ3}\n\nAdd it to scripts/prompts.js`
    );
    window.location.href = "index.html";
    return;
  }

  // Helpers
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Preload helper (prevents postcard stutter)
  const preloadImage = (src, timeoutMs = 15000) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const t = setTimeout(() => reject(new Error("preload timeout")), timeoutMs);

      img.onload = async () => {
        clearTimeout(t);
        try {
          if (img.decode) await img.decode();
        } catch (_) {}
        resolve();
      };

      img.onerror = () => {
        clearTimeout(t);
        reject(new Error("preload failed"));
      };

      img.src = src;
    });

  try {
    // 4) Generate image via API route
    const imageUrl = await generateImage(hardPrompt);
    if (!imageUrl) throw new Error("No image URL returned");

    // IMPORTANT: Use the same proxied URL postcard.js uses so caching actually helps
    const proxiedUrl = `/api/image?src=${encodeURIComponent(imageUrl)}`;

    // 5) Persist result for postcard page
    sessionStorage.setItem("generatedImageUrl", imageUrl);
    sessionStorage.setItem("generatedImageProxyUrl", proxiedUrl);
    sessionStorage.setItem("generatedPrompt", hardPrompt);

    // ✅ Preload the proxied image before redirecting (fixes “image pops in late”)
    try {
      await preloadImage(proxiedUrl);
    } catch (e) {
      // If preload fails due to network hiccup, proceed anyway
      console.warn("Preload failed, continuing:", e);
    }

    // --- Success UI ---
    const spinnerEl = document.getElementById("loading-spinner");
    const successEl = document.getElementById("loading-success");
    const titleEl = document.getElementById("status-title");
    const subtitleEl = document.getElementById("status-subtitle");
    const hintEl = document.getElementById("status-hint");

    if (spinnerEl && successEl) {
      spinnerEl.classList.add("hidden");
      successEl.classList.remove("hidden");
    }
    if (titleEl) titleEl.textContent = "Postcard Ready!";
    if (subtitleEl)
      subtitleEl.textContent =
        "Your postcard is generated — taking you to the final postcard…";
    if (hintEl)
      hintEl.textContent =
        "If this takes longer than a moment, your connection may be slow.";

    // 6) Run the stagger AFTER success so the user sees it
    const baseDelay = 250; // start sooner after success
    const stepDelay = 450; // time between each word flip

    lines.forEach((line, index) => {
      if (!line) return;
      setTimeout(() => {
        line.classList.add("generate-keyword--active");
      }, baseDelay + index * stepDelay);
    });

    // 7) Wait long enough for all 3 to animate before redirecting
    const totalAnimTime = baseDelay + 2 * stepDelay + 350;
    await sleep(totalAnimTime);

    // 8) Redirect to postcard
    const next = new URLSearchParams({ q1: rawQ1, q2: rawQ2, q3: rawQ3 });
    window.location.href = `postcard.html?${next.toString()}`;
  } catch (err) {
    console.error("Generation failed", err);
    alert("Generation failed. Open DevTools Console + Vercel dev logs.");
    window.location.href = "index.html";
  }
});