import { GOLD, BG, TEXT, FONTS } from "../theme";

const FOOTER_LINKS = [
  "Games",
  // "About",
  // "Press Kit",
  // "Contact",
  // "Privacy Policy",
];

export function Footer() {
  return (
    <footer
      className="py-10 px-8 flex flex-col items-center gap-5 text-center"
      style={{
        borderTop: `1px solid ${GOLD.hairline}`,
        background: BG.footer,
      }}
    >
      {/* Wordmark */}
      <div
        className="text-lg font-bold tracking-[0.06em]"
        style={{
          fontFamily: FONTS.display,
          color: GOLD.primary,
          textShadow: "0 0 16px rgba(231,170,81,0.25)",
        }}
      >
        Mystwood Games
        <sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>™</sup>
      </div>

      <p
        className="uppercase tracking-[0.22em]"
        style={{
          fontFamily: FONTS.heading,
          fontSize: "0.62rem",
          color: TEXT.dim,
        }}
      >
        Bridging Genres. Bridging People.
      </p>

      {/* Footer nav */}
      <div className="flex gap-8 flex-wrap justify-center">
        {FOOTER_LINKS.map((label) => (
          <button
            key={label}
            className="bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#e7aa51] uppercase tracking-widest"
            style={{
              fontFamily: FONTS.heading,
              fontSize: "0.62rem",
              color: TEXT.dim,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <p
        className="uppercase tracking-widest"
        style={{
          fontFamily: FONTS.heading,
          fontSize: "0.58rem",
          color: TEXT.veryDim,
        }}
      >
        © {new Date().getFullYear()} Mystwood Games™ — All rights reserved.
      </p>
    </footer>
  );
}
