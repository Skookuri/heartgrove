// import { Link } from "wouter";
import logo from "/src/images/logo-improved.png";
import hgBg from "/src/images/alone-martina-stipan.jpg";
import spaceAntsBg from "/src/images/espacio.jpg";
import bobBg from "/src/images/ferre.jpg";
import Slideshow from "./Slideshow";
import { SlideData } from "./Slide";
import NavBar from "./NavBar";

// ─── Nav links ─────────────────────────────────────────────────────────────
const navLinks: { label: string; id: string }[] = [
  { label: "Games",  id: "features" },
  { label: "E-List", id: "waitlist" },
  { label: "Blog", id: "blog"},
  { label: "About", id: "about"}
];

// ─── Hero Slides ───────────────────────────────────────────────────────────
const heroSlides: SlideData[] = [
    {
    bgImg: hgBg,
    title: "Revival of Heartgrove™",
    desc: "Rebuild the world as 6 Animal Clans & Uncover the Saboteurs.",
    cta: "Pre-Order Now",
    onCtaClick: () =>
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
    bgImg: bobBg,
    title: "Business of Business",
    desc: "Hoard the biggest money stash as ferret corporate owners balancing stakeholder value with customer satisfaction.",
    cta: "Join E-List",
    onCtaClick: () =>
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
    bgImg: spaceAntsBg,
    title: "Space Ants!",
    desc: "Tiny creatures, infinite cosmos.",
    cta: "Join E-List",
    onCtaClick: () =>
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" }),
    },
];

// ─── Features ───────────────────────────────────────────────────────

const features = [
  {
    icon: "🌿",
    heading: "Cooperative Rebuilding",
    body: "Gather resources and restore the Heartgrove.",
  },
  {
    icon: "🎭",
    heading: "Hidden Roles",
    body: "Expose the saboteurs before it's too late.",
  },
  {
    icon: "🐾",
    heading: "Magical Factions",
    body: "Play as unique predator clans with powerful abilities.",
  },
];

// ─── Homepage ────────────────────────────────────────────────────────────────

export default function Homepage() {
  return (
    <>
      {/* Keyframes + Google Fonts — only what Tailwind can't handle */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,400&display=swap');

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .gold-rule {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #c8a84b 30%,
            #e8c96a 50%,
            #c8a84b 70%,
            transparent 100%
          );
          background-size: 800px 1px;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col overflow-x-hidden"
        style={{ background: "#06080a", color: "#e1d5b1" }}
      >

        {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
        <NavBar links={navLinks} logoSrc={logo} shopHref="/shop" />

        {/* ── HERO SLIDESHOW ───────────────────────────────────────────────── */}
        <section id="hero">
          <Slideshow slides={heroSlides} autoplayInterval={5500} />
        </section>

        {/* ── SHIMMER DIVIDER ──────────────────────────────────────────────── */}
        <GoldDivider ornament />

        {/* ── TAGLINE BAND ─────────────────────────────────────────────────── */}
        <div
          className="relative py-24 px-8 text-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, #1a1200 0%, #06080a 68%)",
          }}
        >
          {/* Faint watermark */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Cinzel_Decorative',serif] select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(180px, 28vw, 400px)",
              opacity: 0.025,
              color: "#c8a84b",
            }}
          >
            M
          </span>

          <p
            className="font-['Cinzel',serif] text-[0.68rem] uppercase tracking-[0.3em] mb-4"
            style={{ color: "#c8a84b" }}
          >
            Mystwood Games™
          </p>

          <h2
            className="font-['Cinzel_Decorative',serif] font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
              color: "#e1d5b1",
              textShadow: "0 2px 24px rgba(200,168,75,0.22)",
            }}
          >
            Bridging Genres. Bridging People.
          </h2>

          <p
            className="font-['Crimson_Pro',serif] text-xl leading-[1.8] max-w-2xl mx-auto"
            style={{ color: "#7a7060" }}
          >
            Fun, genre-bridging tabletop games designed to encourage high interplayer interaction and strategic thinking.
          </p>
        </div>

        {/* ── SHIMMER DIVIDER ──────────────────────────────────────────────── */}
        <GoldDivider />

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section
          id="features"
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: "1px solid rgba(200,168,75,0.1)" }}
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

        {/* ── SHIMMER DIVIDER ──────────────────────────────────────────────── */}
        <GoldDivider ornament />

        {/* ── WAITLIST ─────────────────────────────────────────────────────── */}
        <section
          id="waitlist"
          className="relative py-28 px-8 text-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #1c1000 0%, #06080a 60%)",
          }}
        >
          {/* Corner ornaments */}
          {(["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"] as const).map(
            (pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} font-['Cinzel',serif] text-2xl select-none pointer-events-none`}
                style={{ color: "rgba(200,168,75,0.13)" }}
              >
                ✦
              </span>
            )
          )}

          <p
            className="font-['Cinzel',serif] text-[0.68rem] uppercase tracking-[0.3em] mb-4"
            style={{ color: "#c8a84b" }}
          >
            Stay Connected
          </p>

          <h2
            className="font-['Cinzel_Decorative',serif] font-bold leading-tight mb-5"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.4rem)",
              color: "#e1d5b1",
              textShadow: "0 2px 32px rgba(200,168,75,0.18)",
            }}
          >
            Join the E-List
          </h2>

          {/* Decorative inline rule */}
          <div className="flex items-center justify-center gap-4 mb-7">
            <div className="h-px w-16" style={{ background: "rgba(200,168,75,0.3)" }} />
            <span style={{ color: "#c8a84b", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
              ✦
            </span>
            <div className="h-px w-16" style={{ background: "rgba(200,168,75,0.3)" }} />
          </div>

          <p
            className="font-['Crimson_Pro',serif] text-xl leading-[1.8] max-w-xl mx-auto mb-10"
            style={{ color: "#7a7060" }}
          >
            Be first to know about pre-orders, Kickstarter launches, and exclusive
            backer rewards.
          </p>

          {/* Gold CTA button */}
          <button
            className="font-['Cinzel',serif] text-[0.78rem] uppercase tracking-[0.2em] font-bold px-14 py-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, #b8940a 0%, #e8c96a 45%, #c8a84b 100%)",
              color: "#06080a",
              border: "none",
              boxShadow: "0 4px 28px rgba(200,168,75,0.35)",
            }}
            onClick={() =>
              document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Sign Up Now
          </button>

          <p
            className="mt-5 font-['Cinzel',serif] text-[0.6rem] uppercase tracking-[0.15em]"
            style={{ color: "#3a3020" }}
          >
            {/* No spam. Unsubscribe anytime. */}
          </p>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer
          className="py-10 px-8 flex flex-col items-center gap-5 text-center"
          style={{
            borderTop: "1px solid rgba(200,168,75,0.12)",
            background: "#030508",
          }}
        >
          <div
            className="font-['Cinzel_Decorative',serif] text-lg font-bold tracking-[0.06em]"
            style={{
              color: "#c8a84b",
              textShadow: "0 0 16px rgba(200,168,75,0.25)",
            }}
          >
            Mystwood<span style={{ color: "#7aaa8a" }}>Games</span>
            <sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>™</sup>
          </div>

          <p
            className="font-['Cinzel',serif] text-[0.62rem] uppercase tracking-[0.22em]"
            style={{ color: "#3a3020" }}
          >
            Bridging Genres. Bridging People.
          </p>

          <div className="flex gap-8 flex-wrap justify-center">
            {["Games", "About", "Press Kit", "Contact", "Privacy Policy"].map((l) => (
              <button
                key={l}
                className="font-['Cinzel',serif] text-[0.62rem] uppercase tracking-widest bg-transparent border-0 cursor-pointer transition-colors duration-200 hover:text-[#c8a84b]"
                style={{ color: "#3a3020" }}
              >
                {l}
              </button>
            ))}
          </div>

          <p
            className="font-['Cinzel',serif] text-[0.58rem] uppercase tracking-widest"
            style={{ color: "#201a10" }}
          >
            © {new Date().getFullYear()} Mystwood Games™ — All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function GoldDivider({ ornament = false }: { ornament?: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="gold-rule w-full" />
      {ornament && (
        <span
          className="absolute font-['Cinzel',serif] text-[0.6rem] tracking-[0.4em] px-5"
          style={{ background: "#06080a", color: "#c8a84b" }}
        >
          ✦&nbsp;&nbsp;✦&nbsp;&nbsp;✦
        </span>
      )}
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  heading: string;
  body: string;
  hasBorderRight: boolean;
  highlight: boolean;
}

function FeatureCard({ icon, heading, body, hasBorderRight, highlight }: FeatureCardProps) {
  return (
    <div
      className="group flex flex-col items-center text-center py-16 px-12 cursor-default transition-colors duration-300"
      style={{
        background: highlight ? "rgba(200,168,75,0.04)" : "#06080a",
        borderRight: hasBorderRight ? "1px solid rgba(200,168,75,0.1)" : "none",
        borderBottom: "1px solid rgba(200,168,75,0.1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(200,168,75,0.07)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = highlight
          ? "rgba(200,168,75,0.04)"
          : "#06080a";
      }}
    >
      {/* Icon in a gold ring */}
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mb-6 text-3xl transition-transform duration-300 group-hover:scale-110"
        style={{
          border: "1px solid rgba(200,168,75,0.3)",
          background: "rgba(200,168,75,0.06)",
          boxShadow: "0 0 20px rgba(200,168,75,0.07)",
        }}
      >
        {icon}
      </div>

      {/* Heading */}
      <h3
        className="font-['Cinzel',serif] text-[0.72rem] uppercase tracking-[0.22em] mb-3"
        style={{ color: "#c8a84b" }}
      >
        {heading}
      </h3>

      {/* Thin gold accent line */}
      <div
        className="w-8 mb-5"
        style={{ height: 1, background: "rgba(200,168,75,0.35)" }}
      />

      <p
        className="font-['Crimson_Pro',serif] text-base leading-[1.8]"
        style={{ color: "#6a6050" }}
      >
        {body}
      </p>
    </div>
  );
}