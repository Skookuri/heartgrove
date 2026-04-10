import React from "react";

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

const Slide: React.FC<SlideProps> = ({ bgImg, title, desc, cta, onCtaClick, isActive }) => {
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

      {/* Dark overlay so text is readable over any image */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-3xl">
        <h2 className="font-['Cinzel_Decorative',serif] text-4xl md:text-6xl font-normal tracking-tight leading-none mb-4 text-[#e1d5b1]">
          {title}
        </h2>

        <p className="text-lg md:text-xl leading-relaxed mb-8 text-[#c8c4b4]">
          {desc}
        </p>

        <button
          onClick={onCtaClick}
          className="self-start font-['Cinzel',serif] text-sm uppercase tracking-widest font-bold px-8 py-3 rounded-sm bg-[#e1d5b1] text-[#080c08] border-0 cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
                        style={{
              background:
                "linear-gradient(135deg, #b8940a 0%, #e8c96a 45%, #c8a84b 100%)",
              color: "#06080a",
              border: "none",
              boxShadow: "0 4px 28px rgba(200,168,75,0.35)",
            }}
        >
          {cta}
        </button>
      </div>
    </div>
  );
};

export default Slide;