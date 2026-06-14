import { SectionEyebrow, SectionHeading, WatermarkLetter } from "./ui";
import { BG, TEXT, FONTS } from "../theme";

interface TaglineBandProps {
  eyebrow?: string;
  heading: string;
  body: string;
  watermark?: string;
}

export function TaglineBand({
  eyebrow = "Mystwood Games™",
  heading,
  body,
  watermark = "M",
}: TaglineBandProps) {
  return (
    <div
      className="relative py-24 px-8 text-center overflow-hidden"
      style={{ background: BG.radialWarm }}
    >
      {watermark && <WatermarkLetter letter={watermark} />}

      <SectionEyebrow text={eyebrow} />
      <SectionHeading>{heading}</SectionHeading>

      <p
        className="text-xl leading-[1.8] max-w-2xl mx-auto"
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
