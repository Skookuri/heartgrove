import { GOOGLE_FONTS_URL, GOLD_RULE_GRADIENT } from "../theme";

/**
 * Injects global @keyframes and Google Fonts that Tailwind cannot handle.
 * Drop this once at the root of your app.
 */
export function GlobalStyles() {
  return (
    <style>{`
      @import url('${GOOGLE_FONTS_URL}');

      @keyframes shimmer {
        0%   { background-position: -400px 0; }
        100% { background-position:  400px 0; }
      }

      /* Utility class consumed by GoldDivider */
      .gold-rule {
        height: 1px;
        background: ${GOLD_RULE_GRADIENT};
        background-size: 800px 1px;
        animation: shimmer 4s linear infinite;
      }

      /* Remove default input focus ring for styled inputs */
      input:focus {
        outline: none;
      }
    `}</style>
  );
}
