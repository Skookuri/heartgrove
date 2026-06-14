import { GOLD, GOLD_GRADIENT, GOLD_RULE_GRADIENT, FONTS, TEXT } from "../theme";

// ─── GoldDivider ─────────────────────────────────────────────────────────────

interface GoldDividerProps {
  ornament?: boolean;
}

export function GoldDivider({ ornament = false }: GoldDividerProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="w-full"
        style={{
          height: 1,
          background: GOLD_RULE_GRADIENT,
          backgroundSize: "800px 1px",
          animation: "shimmer 4s linear infinite",
        }}
      />
      {ornament && (
        <span
          className="absolute px-5 text-[0.6rem] tracking-[0.4em]"
          style={{
            fontFamily: FONTS.heading,
            background: "#06080a",
            color: GOLD.primary,
          }}
        >
          ✦&nbsp;&nbsp;✦&nbsp;&nbsp;✦
        </span>
      )}
    </div>
  );
}

// ─── GoldButton ──────────────────────────────────────────────────────────────

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "filled" | "outline";
  className?: string;
}

export function GoldButton({
  children,
  onClick,
  type = "button",
  variant = "filled",
  className = "",
}: GoldButtonProps) {
  const baseStyle: React.CSSProperties =
    variant === "filled"
      ? {
          background: GOLD_GRADIENT,
          color: "#06080a",
          border: "none",
          boxShadow: "0 4px 28px rgba(231,170,81,0.35)",
        }
      : {
          background: "transparent",
          color: GOLD.light,
          border: `1px solid ${GOLD.muted}`,
        };

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (variant === "outline") {
      e.currentTarget.style.background = GOLD.faint;
      e.currentTarget.style.borderColor = GOLD.primary;
    }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (variant === "outline") {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.borderColor = GOLD.muted;
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`rounded-md font-bold text-sm uppercase tracking-widest px-8 py-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${className}`}
      style={{
        fontFamily: FONTS.heading,
        // fontSize: "0.78rem",
        ...baseStyle,
      }}
    >
      {children}
    </button>
  );
}

// ─── SectionEyebrow ──────────────────────────────────────────────────────────

interface SectionEyebrowProps {
  text: string;
}

export function SectionEyebrow({ text }: SectionEyebrowProps) {
  return (
    <p
      className="uppercase tracking-[0.3em] mb-4"
      style={{
        fontFamily: FONTS.heading,
        fontSize: "0.68rem",
        color: GOLD.primary,
      }}
    >
      {text}
    </p>
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────────────

interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2
      className="font-bold leading-tight mb-6"
      style={{
        fontFamily: FONTS.display,
        fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
        color: TEXT.cream,
        textShadow: "0 2px 24px rgba(231,170,81,0.22)",
      }}
    >
      {children}
    </h2>
  );
}

// ─── InlineGoldRule ──────────────────────────────────────────────────────────

export function InlineGoldRule() {
  return (
    <div className="flex items-center justify-center gap-4 mb-7">
      <div
        className="h-px w-16"
        style={{ background: GOLD.muted }}
      />
      <span style={{ color: GOLD.primary, fontSize: "0.7rem", letterSpacing: "0.2em" }}>
        ✦
      </span>
      <div
        className="h-px w-16"
        style={{ background: GOLD.muted }}
      />
    </div>
  );
}

// ─── CornerOrnaments ─────────────────────────────────────────────────────────

export function CornerOrnaments() {
  const positions = [
    "top-8 left-8",
    "top-8 right-8",
    "bottom-8 left-8",
    "bottom-8 right-8",
  ] as const;

  return (
    <>
      {positions.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} text-2xl select-none pointer-events-none`}
          style={{
            fontFamily: FONTS.heading,
            color: "rgba(231,170,81,0.13)",
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}

// ─── WatermarkLetter ─────────────────────────────────────────────────────────

interface WatermarkLetterProps {
  letter: string;
}

export function WatermarkLetter({ letter }: WatermarkLetterProps) {
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none leading-none"
      style={{
        fontFamily: FONTS.display,
        fontSize: "clamp(180px, 28vw, 400px)",
        opacity: 0.025,
        color: GOLD.primary,
      }}
    >
      {letter}
    </span>
  );
}
