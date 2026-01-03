// scripts/prompts.js

// scripts/prompts.js

export const Q1_KEY = {
  "AI": "ai",
  "Vehicle Tech": "vehicleTech",
  "Robotics": "robotics",
  "Gaming & XR": "gaming_xr",
};

export const Q2_KEY = {
  "Era of Abundance": "abundance",
  "It's Going to Get Weird": "weird",
};

export const Q3_KEY = {
  "Neon Night Operator": "neonNightOperator",
  "Energy Conservationist": "energyConservationist",
  "Front Row Thinker": "frontRowThinker",
  "Off-Strip Explorer": "offStripExplorer",
};

// Option A: full hard prompt lookup
export const PROMPTS = {
  ai: {
    abundance: {
      neonNightOperator: "A massive cybernetic glowing hand reaching down over the Las Vegas, Nevada strip at night, its illuminated circuitry driving cascades of neon light through towering casino hotels below. High-energy lighting, vivid color, reflective streets, bold cinematic night atmosphere.",
      energyConservationist: "A giant cybernetic glowing hand reaching from the water, its circuitry softly illuminated as it gently holds a gondola with a man and woman outside the Bellagio casino. Warm, hopeful lighting, soft reflections, tranquil atmosphere, cinematic morning scene.",
      frontRowThinker: "A giant cybernetic glowing hand hovering above an immersive nighttime Las Vegas performance space, its illuminated circuitry shaping beams of light and atmosphere across a vast audience environment. Warm, abundant lighting, cinematic scale, elegant spectacle, confident futuristic mood.",
      offStripExplorer: "A giant cybernetic glowing hand hovering above the red rocks desert landscape outside Las Vegas, Nevada at dusk, its illuminated circuitry softly guiding the terrain below. Warm, hopeful lighting, expansive sky, calm cinematic atmosphere.",
    },
    weird: {
      neonNightOperator: "A massive skeletal cybernetic glowing hand with a digital eye in its center reaching down over the Las Vegas, Nevada strip at night, its illuminated circuitry driving cascades of neon light through towering casino hotels below. Cold, desaturated color palette, sharp reflections, controlled lighting, tense cinematic night atmosphere.",
      energyConservationist: "A giant cybernetic glowing hand hovering above the Bellagio gondolas at night, a digital eye in its center watching as cold, unnatural ripples move through the water below. Muted color palette, pale reflections, eerie stillness, controlled cinematic night atmosphere.",
      frontRowThinker: "A massive cybernetic glowing hand with a digital eye hovering above an immersive Las Vegas concert at night, faint luminous wires connecting from its fingertips into the crowd below, puppeteering them. Cold, muted lighting, sharp reflections, restrained cinematic night atmosphere.",
      offStripExplorer: "A massive cybernetic glowing hand with a digital eye hovering above the red rocks desert landscape outside Las Vegas at night, the eye emitting a faint red scanning field across the terrain below. Cold, desaturated color palette, sharp highlights, expansive sky, tense cinematic night atmosphere.",
    },
  },

  vehicleTech: {
    abundance: {
      neonNightOperator: "A brandless cybernetic tron like vehicle with vibrant glowing neon accents gliding through the Las Vegas Strip at night, its illuminated design casting smooth trails of neon light across reflective streets and towering casino hotels. Warm, abundant lighting, vibrant color, confident cinematic night atmosphere.",
      energyConservationist: "A sleek brandless futuristic vehicle parked quietly by the Bellagio casino's colorful botanical gardens in Las Vegas, Nevada, its illuminated design reflects its futurism and cutting edge. Warm, abundant lighting, gentle reflections, tranquil atmosphere, cinematic morning scene.",
      frontRowThinker: "A sleek futuristic brandless vehicle positioned near the front of a large immersive Las Vegas concert venue at night, silhouetted crowds gathered around as ambient stage lighting reflects across modern architecture and the vehicle’s illuminated surfaces. Warm, abundant lighting, polished reflections, elegant cinematic night atmosphere.",
      offStripExplorer: "A sleek futuristic brandless cybernetic vehicle parked peacefully in the open desert outside Las Vegas at golden hour, its smooth illuminated surfaces reflecting warm sunlight across the surrounding landscape. Warm desert color palette, soft highlights, expansive sky, calm cinematic atmosphere.",
    },
    weird: {
      neonNightOperator: "A sleek futuristic brandless cybernetic vehicle with angular neon armored surfaces and integrated weapons gliding by the towering casino hotels in Las Vegas, Nevada Strip at night, its neon accents cutting sharply through reflective streets. Cold, desaturated color palette, harsh highlights, oppressive cinematic night atmosphere.",
      energyConservationist: "A sleek futuristic brandless cybernetic vehicle with angular neon armored surfaces and integrated weapons parked quietly by the Bellagio casino in Las Vegas, Nevada, its illuminated design reflects its futurism and cutting edge. Cold, desaturated color palette, harsh highlights, oppressive cinematic night atmosphere.",
      frontRowThinker: "A sleek futuristic brandless vehicle positioned near the front of a large immersive Las Vegas concert venue at night, silhouetted crowds gathered nearby as a low-profile sensor mast and antenna array integrated into the vehicle quietly monitors the audience. Cold, desaturated color palette, sharp reflections, controlled cinematic night atmosphere.",
      offStripExplorer: "A sleek futuristic brandless tron-like vehicle parked alone in the desert outside Las Vegas at night, a low-profile antenna array and integrated sensor surfaces emitting faint red scanning lines across the rocky landscape, as if searching for something unseen. Cold, desaturated color palette, sharp highlights, expansive dark sky, tense cinematic night atmosphere.",
    },
  },

  robotics: {
    abundance: {
      neonNightOperator: "A sleek humanoid robot standing confidently among the neon-lit Las Vegas Strip at night, its polished surfaces reflecting colorful casino lights and crowds around it. Warm, abundant lighting, vibrant nightlife energy, cinematic night atmosphere.",
      energyConservationist: "A sleek humanoid robot tending to the Bellagio Botanical Garden inside the Bellagio Hotel in Las Vegas, Nevada, surrounded by vibrant flowers and soft architectural lighting. Warm, abundant lighting, tranquil cinematic atmosphere.",
      frontRowThinker: "A humanoid robot positioned near the stage of a large Las Vegas performance venue at night, softly illuminated as it interacts with lighting and atmosphere around a gathered audience. Warm, abundant lighting, elegant spectacle, cinematic scale.",
      offStripExplorer: "A humanoid exploration robot standing calmly in the desert outside Las Vegas at dusk, its form silhouetted against a wide open sky as warm light reflects off its surface. Expansive landscape, gentle lighting, calm cinematic atmosphere.",
    },
    weird: {
      neonNightOperator: "A tall humanoid robot standing motionless at the center of the Las Vegas, Nevada Strip at night, its cold metallic surface reflecting harsh neon lights as crowds move beneath its gaze. Cold, desaturated color palette, sharp highlights, oppressive cinematic night atmosphere.",
      energyConservationist: "A humanoid robot tending to the Bellagio Hotel Casino Botanical Garden in Las Vegas, Nevada after hours, its movements precise and emotionless as plants sit under dim artificial lighting. Cold, desaturated color palette, quiet oppressive atmosphere, cinematic realism.",
      frontRowThinker: "A humanoid robot with red cybernetic neon accents overlooking a Las Vegas, Nevada performance venue, its presence dominating the space as crowds assemble beneath it. Cold, controlled lighting, muted colors, unsettling cinematic scale.",
      offStripExplorer: "A humanoid robot with neon cybernetic red accents standing alone in the desert outside Las Vegas at dusk, its gaze fixed on the surrounding landscape as cold light reflects off its surface. Muted colors, expansive sky, eerie cinematic atmosphere.",
    },
  },

  gaming_xr: {
    abundance: {
      neonNightOperator: "People wearing sleek neon lightweight futuristic minimalist goggles with smooth reflective surfaces, standing along the Las Vegas, Nevada Strip at night as neon casino lights and massive digital displays glow behind them. Premium hardware design, warm abundant lighting, polished cinematic night atmosphere.",
      energyConservationist: "A person wearing ultra-sleek lightweight futuristic minimalist gaming glasses standing quietly inside the Bellagio Botanical Garden in Las Vegas, Nevada at night, surrounded by lush colorful plants and flowers and soft ambient lighting. Warm, abundant light, calm cinematic atmosphere.",
      frontRowThinker: "People wearing sleek futuristic gaming glasses on a modern Las Vegas, Nevada stage at night, illuminated by warm stage lighting as a focused audience watches from the front rows. Premium hardware design, abundant lighting, polished cinematic atmosphere.",
      offStripExplorer: "A person wearing sleek lightweight futuristic minimalist gaming glasses standing at Red Rock Canyon State Park outside Las Vegas, Nevada at dusk, the smooth reflective hardware catching warm desert light as towering red rock formations stretch into the distance. Calm, abundant lighting, expansive cinematic atmosphere.",
    },
    weird: {
      neonNightOperator: "Uncanny human robot hybrids wearing sleek neon lightweight futuristic gaming goggles along the Las Vegas, Nevada strip at night, cybernetic implants visible around their face as neon lights reflect coldly across the scene. Desaturated color palette, oppressive cinematic night atmosphere.",
      energyConservationist: "Uncanny human robot hybrid wearing ultra-sleek lightweight futuristic minimalist gaming glasses standing quietly inside the Bellagio Botanical Garden in Las Vegas, Nevada at night, surrounded by lush colorful plants and flowers and soft ambient lighting. Desaturated color palette, oppressive cinematic night atmosphere.",
      frontRowThinker: "A large armada of uncanny human robot hybrids wearing sleek futuristic gaming glasses on a modern Las Vegas, Nevada stage at night, illuminated by cold stage lighting. Desaturated color palette, oppressive cinematic night atmosphere.",
      offStripExplorer: "Uncanny human robot hybrid wearing sleek lightweight futuristic minimalist gaming glasses standing at Red Rock Canyon State Park outside Las Vegas, Nevada at night, the smooth reflective hardware catching cold moonlight as towering red rock formations stretch into the distance. Desaturated color palette, oppressive cinematic night atmosphere.",
    },
  },
};

// Safe getter with fallback chain
export function getPrompt({ q1Key, q2Key, q3Key }) {
  if (!q1Key || !q2Key || !q3Key) return null;

  const p =
    PROMPTS?.[q1Key]?.[q2Key]?.[q3Key] ||
    null;

  return p;
}
