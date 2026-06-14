// ─── Warm Gold Theme Tokens ─────────────────────────────────────────────────
// Gradient: #e7aa51 → #ffe499 → #9f650d → #e7aa51 → #9f650d

export const GOLD = {
  /** Primary warm gold */
  primary: "#e7aa51",
  /** Lightest highlight */
  light: "#ffe499",
  /** Deep amber shadow */
  dark: "#9f650d",
  /** Subtle muted version for secondary text/borders */
  muted: "rgba(231,170,81,0.5)",
  /** Very faint for backgrounds */
  faint: "rgba(231,170,81,0.06)",
  /** Near-invisible for borders */
  hairline: "rgba(231,170,81,0.12)",
};

/** The full warm gradient string — use in background/backgroundImage */
export const GOLD_GRADIENT =
  "linear-gradient(135deg, #e7aa51 0%, #ffe499 30%, #9f650d 55%, #e7aa51 78%, #9f650d 100%)";

/** Horizontal shimmer gradient for rules */
export const GOLD_RULE_GRADIENT =
  "linear-gradient(90deg, transparent 0%, #9f650d 25%, #e7aa51 45%, #ffe499 50%, #e7aa51 55%, #9f650d 75%, transparent 100%)";

export const BG = {
  page: "#06080a",
  footer: "#030508",
  radialWarm: "radial-gradient(ellipse at 50% 50%, #1a0e00 0%, #06080a 68%)",
  radialTop: "radial-gradient(ellipse at 50% 0%, #1c0e00 0%, #06080a 60%)",
};

export const TEXT = {
  cream: "#e1d5b1",
  muted: "#7a6845",
  dim: "#3a2a10",
  veryDim: "#201508",
};

export const FONTS = {
  display: "'Cinzel Decorative', serif",
  heading: "'Cinzel', serif",
  body: "'Crimson Pro', serif",
};

export const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&display=swap";
