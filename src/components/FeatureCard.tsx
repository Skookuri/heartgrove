import { useState } from "react";
import { GOLD, FONTS, TEXT } from "../theme";

export interface FeatureCardData {
  icon: string;
  heading: string;
  body: string;
}

interface FeatureCardProps extends FeatureCardData {
  hasBorderRight?: boolean;
  highlight?: boolean;
}

export function FeatureCard({
  icon,
  heading,
  body,
  hasBorderRight = false,
  highlight = false,
}: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex flex-col items-center text-center py-16 px-12 cursor-default transition-colors duration-300"
      style={{
        background: hovered
          ? "rgba(231,170,81,0.07)"
          : highlight
          ? GOLD.faint
          : "#06080a",
        borderRight: hasBorderRight ? `1px solid ${GOLD.hairline}` : "none",
        borderBottom: `1px solid ${GOLD.hairline}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon ring */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mb-6 text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{
          border: `1px solid ${GOLD.muted}`,
          background: GOLD.faint,
          boxShadow: `0 0 20px ${GOLD.faint}`,
        }}
      >
        {icon}
      </div>

      {/* Heading */}
      <h3
        className="uppercase tracking-[0.22em] mb-3"
        style={{
          fontFamily: FONTS.heading,
          fontSize: "0.72rem",
          color: GOLD.primary,
        }}
      >
        {heading}
      </h3>

      {/* Accent rule */}
      <div
        className="w-8 mb-5"
        style={{ height: 1, background: GOLD.muted }}
      />

      <p
        className="text-base leading-[1.8]"
        style={{
          fontFamily: FONTS.body,
          color: TEXT.muted,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ─── Feature grid ─────────────────────────────────────────────────────────────

interface FeaturesGridProps {
  features: FeatureCardData[];
}

export function FeaturesGrid({ features }: FeaturesGridProps) {
  return (
    <section
      id="features"
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ borderTop: `1px solid ${GOLD.hairline}` }}
    >
      {features.map(({ icon, heading, body }, i) => (
        <FeatureCard
          key={heading}
          icon={icon}
          heading={heading}
          body={body}
          hasBorderRight={i < features.length - 1}
          highlight={i === 1}
        />
      ))}
    </section>
  );
}
