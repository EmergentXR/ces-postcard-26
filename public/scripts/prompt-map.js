// scripts/prompt-map.js

// --- Canonical Keys ---
// Q1
export const Q1_KEY = {
  "AI": "ai",
  "Vehicle Tech": "vehicleTech",
  "Robotics": "robotics",
  "Gaming & XR": "gaming_xr",
};

// Q2 (use the exact strings your UI sends via URL)
export const Q2_KEY = {
  "Era of Abundance": "abundance",
  "It's Going to Get Weird": "weird",
};

// Q3 (again: exact UI strings)
export const Q3_KEY = {
  "Neon Night Operator": "neonNightOperator",
  "Energy Conservationist": "energyConservationist",
  "Front Row Thinker": "frontRowThinker",
  "Off-Strip Explorer": "offStripExplorer",
};

// Normalize helper (handles weird whitespace and punctuation)
export function normalizeLabel(str) {
  return (str || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/’/g, "'"); // normalize smart apostrophe
}

// Convert raw URL params -> canonical keys
export function toCanonicalKeys({ q1, q2, q3 }) {
  const nq1 = normalizeLabel(q1);
  const nq2 = normalizeLabel(q2);
  const nq3 = normalizeLabel(q3);

  return {
    q1Key: Q1_KEY[nq1] || null,
    q2Key: Q2_KEY[nq2] || null,
    q3Key: Q3_KEY[nq3] || null,
    raw: { nq1, nq2, nq3 },
  };
}
