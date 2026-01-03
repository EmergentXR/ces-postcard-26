// scripts/postcard.js
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);

  const rawQ1 = params.get("q1") || "Your CES favorite";
  const q1Key = rawQ1.trim();

  const rawQ2 = params.get("q2") || "";
  const q2Key = rawQ2.toLowerCase().includes("weird") ? "weird" : "abundance";

  const choiceEl = document.getElementById("postcard-choice");
  const descriptionEl = document.getElementById("postcard-description");
  const bgEl = document.getElementById("postcard-bg");
  const captureEl = document.getElementById("postcard-capture");

  // Loading gate elements
  const loadingEl = document.getElementById("postcard-loading");

  // Screenshot mode UI
  const screenshotBtn = document.getElementById("screenshot-mode");
  const modal = document.getElementById("screenshot-modal");
  const modalStage = document.getElementById("screenshot-stage");
  const modalClose = document.getElementById("screenshot-close");

  // iOS WebKit (Chrome/Firefox on iOS are still WebKit)
  const isIOS =
    (navigator.platform === "iPhone" ||
      navigator.platform === "iPad" ||
      navigator.platform === "iPod" ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)) &&
    !window.MSStream;

  // ------------------------------------------------------------
  // 0) Start in “not ready” state (hide content until bg loads)
  // ------------------------------------------------------------
  if (captureEl) captureEl.classList.remove("postcard-ready");

  // ------------------------------------------------------------
  // 1) Background image
  // ------------------------------------------------------------
  const imgUrl = sessionStorage.getItem("generatedImageUrl");
  const proxyUrlFromGen = sessionStorage.getItem("generatedImageProxyUrl");
  const proxiedUrl =
    proxyUrlFromGen ||
    (imgUrl ? `/api/image?src=${encodeURIComponent(imgUrl)}` : null);

  let bgImg = null;

  if (proxiedUrl && bgEl) {
    bgEl.className = "absolute inset-0";

    let img = bgEl.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      bgEl.appendChild(img);
    }

    img.src = proxiedUrl;
    img.alt = "Generated CES Postcard Background";
    img.className = "w-full h-full object-cover select-none";
    img.crossOrigin = "anonymous";
    img.draggable = false;
    img.style.webkitTouchCallout = "default";

    bgImg = img;
  }

  // Wait for bg image to fully load/decode before revealing
  async function waitForBgImage() {
    if (!bgImg) return;

    // already loaded
    if (bgImg.complete && bgImg.naturalWidth > 0) {
      try {
        if (bgImg.decode) await bgImg.decode();
      } catch (_) {}
      return;
    }

    await new Promise((resolve, reject) => {
      bgImg.onload = resolve;
      bgImg.onerror = reject;
    });

    try {
      if (bgImg.decode) await bgImg.decode();
    } catch (_) {}
  }

  function revealPostcard() {
    if (!captureEl) return;
    captureEl.classList.add("postcard-ready");

    // remove the gate after fade (optional but keeps DOM clean)
    if (loadingEl) {
      setTimeout(() => loadingEl.remove(), 260);
    }
  }

  // ------------------------------------------------------------
  // 2) Blurbs
  // ------------------------------------------------------------
  const blurbs = {
    AI: {
      abundance: [
        "A glimpse of intelligence that feels less like code and more like possibility.",
        "Where models spark ideas faster than you can articulate them — and the future feels collaborative.",
        "A fusion of creativity and computation, opening doors we didn’t even know existed.",
        "Software that feels almost alive — guiding bold new forms of expression.",
        "A hopeful signal: imagination and machine power, finally moving together.",
      ],
      weird: [
        "Intelligence shifts the air — like something unseen is rewriting the rules.",
        "Patterns emerge, disappear, and return… almost like the city is thinking back.",
        "A future that feels slightly off-axis — brilliant, unsettling, undeniable.",
        "Where the algorithm’s glow feels less like a tool… and more like a presence.",
        "The promise is still there — just with a shadow moving behind it.",
      ],
    },
    "Vehicle Tech": {
      abundance: [
        "Mobility that feels effortless — smooth, smart, and strangely inspiring.",
        "The road ahead looks lighter when machines start collaborating with us.",
        "Design meets intelligence — and travel becomes the experience.",
        "Movement, reimagined: clean lines, calm power, pure momentum.",
        "The next era of driving feels like flying — but grounded in reality.",
      ],
      weird: [
        "The machine moves with purpose — like something it knows more than it’s saying.",
        "A sleek silhouette… with an edge that feels a little too aware.",
        "Mobility evolves — and suddenly the road feels watched back.",
        "The future of driving arrives, but it doesn’t feel entirely friendly.",
        "Precision, control, and a chill in the air: something’s changed.",
      ],
    },
    Robotics: {
      abundance: [
        "Graceful machines built to assist — and quietly amaze.",
        "Precision with personality: helpers that feel almost human in motion.",
        "Tools that lift the everyday into something cinematic.",
        "A future where machines amplify what humans do best.",
        "Engineering with heart — practical, elegant, a little magical.",
      ],
      weird: [
        "Perfect motion. Perfect stillness. A presence that lingers too long.",
        "Something about the precision feels… deliberate.",
        "A helper, a watcher, a silhouette that doesn’t blink.",
        "Human-shaped intent — but not necessarily human values.",
        "The future arrives quietly… and stands there, observing.",
      ],
    },
    "Gaming & XR": {
      abundance: [
        "Play becomes the language — and the city turns into a level you can live in.",
        "Worlds built to explore, master, and replay — brighter than the screen can hold.",
        "A future where stories aren’t watched… they’re inhabited.",
        "Pixels, physics, and pure wonder — the next era of play feels limitless.",
        "Connection, competition, creativity — all glowing at once.",
      ],
      weird: [
        "The game boots up… and reality starts to behave like a simulation.",
        "Avatars look familiar — but something in the eyes feels off.",
        "Play turns uncanny when the world starts responding too perfectly.",
        "A level you can’t quit — and the city keeps generating new rules.",
        "The fun is still there… just threaded with something unknown.",
      ],
    },
  };

  const fallbackBlurbs = {
    abundance: [
      "A bright little snapshot from the future — shaped by your taste.",
      "A moment that feels like the beginning of something good.",
      "Your CES spark, captured in a single scene.",
      "A postcard from a future you’d actually want to live in.",
      "A glimpse of what happens when curiosity leads the way.",
    ],
    weird: [
      "A postcard from the edge of tomorrow — intriguing, unfamiliar, alive.",
      "A future that doesn’t explain itself… it just appears.",
      "Something’s changing in the air — and you can feel it.",
      "A snapshot of the unknown — beautiful, eerie, magnetic.",
      "A signal from what comes next — and it’s not entirely calm.",
    ],
  };

  const blurbList = blurbs?.[q1Key]?.[q2Key] || fallbackBlurbs[q2Key];
  const selectedBlurb = blurbList[Math.floor(Math.random() * blurbList.length)];

  if (choiceEl) choiceEl.textContent = rawQ1;
  if (descriptionEl) descriptionEl.textContent = selectedBlurb;

  // ------------------------------------------------------------
  // 3) Screenshot Mode (iOS)
  // ------------------------------------------------------------
  function openScreenshotModal() {
    if (!modal || !modalStage || !captureEl) return;

    modalStage.innerHTML = "";

    const clone = captureEl.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add("screenshot-clone");

    clone.style.maxWidth = "none";
    clone.style.width = "100%";
    clone.style.margin = "0";

    modalStage.appendChild(clone);

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeScreenshotModal() {
    if (!modal || !modalStage) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modalStage.innerHTML = "";
    document.body.style.overflow = "";
  }

  if (isIOS && screenshotBtn) {
    screenshotBtn.classList.remove("hidden");
    screenshotBtn.addEventListener("click", openScreenshotModal);
  }

  if (modalClose) modalClose.addEventListener("click", closeScreenshotModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeScreenshotModal();
    });
  }

  // ------------------------------------------------------------
  // 4) Reveal only after bg is ready (kills stutter)
  // ------------------------------------------------------------
  try {
    await waitForBgImage();
  } catch (e) {
    console.warn("Background failed to load:", e);
    // still reveal so user isn't stuck
  } finally {
    revealPostcard();
  }

  // Debug
  console.log("POSTCARD URL:", window.location.href);
  console.log("q1Key:", q1Key);
  console.log("q2Key:", q2Key);
  console.log("proxiedUrl:", proxiedUrl ? "✅ present" : "❌ missing");
  console.log("isIOS:", isIOS);
});