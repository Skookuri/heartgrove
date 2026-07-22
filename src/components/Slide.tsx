import { GoldButton } from "./ui";
import { FONTS, TEXT } from "../theme";

export interface SlideData {
  bgImg: string;
  title: string;
  desc: string;
  cta: string;
  onCtaClick?: () => void;
}

interface SlideProps extends SlideData {
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({
  bgImg,
  title,
  desc,
  cta,
  onCtaClick,
  isActive,
}) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background image */}
      <img
        src={bgImg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
        <h2
          className="font-bold tracking-tight leading-none mb-4 text-4xl"
          style={{
            fontFamily: FONTS.display,
            color: TEXT.cream,
          }}
        >
          {title}
        </h2>

        <p
          className="text-lg md:text-xl leading-relaxed mb-8"
          style={{ color: "#c8c4b4" }}
        >
          {desc}
        </p>

        <GoldButton onClick={onCtaClick} className="self-start">
          {cta}
        </GoldButton>
      </div>
    </div>
  );
};

export default Slide;
