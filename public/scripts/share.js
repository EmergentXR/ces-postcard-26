// scripts/share.js
document.addEventListener("DOMContentLoaded", () => {
  const workBtn = document.getElementById("work-with-us");
  if (!workBtn) return;

  function track(eventName, payload) {
    const data = {
      event: eventName,
      ...payload,
      ts: Date.now(),
      page: window.location.href,
      ua: navigator.userAgent,
    };

    // 1) Optional: your own lightweight endpoint (recommended if you want full control)
    // Create later if you want: /api/track
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      }
    } catch (e) {
      // ignore
    }

    // 2) Google Analytics (if present)
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload);
      }
    } catch (e) {
      // ignore
    }

    // 3) Fallback
    console.log("[track]", eventName, data);
  }

  workBtn.addEventListener("click", (e) => {
    const url = workBtn.getAttribute("href");
    const trackKey = workBtn.dataset.track || "cta_click";
    const label = workBtn.dataset.label || "Work With Us";

    // IMPORTANT: open immediately to avoid popup blockers
    // Use target=_blank behavior already on the <a> (most reliable).
    // We do NOT preventDefault unless we need to manually open.
    track(trackKey, { label, url });

    // If you want to guarantee a new tab even if target attr gets removed:
    // e.preventDefault();
    // window.open(url, "_blank", "noopener,noreferrer");
  });
});