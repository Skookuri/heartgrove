import { Link, useLocation } from "wouter";
import { GlobalStyles } from "./GlobalStyles";
import { GOLD, GOLD_GRADIENT, BG, TEXT, FONTS } from "../theme";
import {
    GoldDivider,
    SectionEyebrow,
    SectionHeading,
    CornerOrnaments,
} from "./ui";
import logo from "/src/images/MW_Logo.png";
import peacock from "/src/images/peacock_transparent.png"

// ─── Product data ─────────────────────────────────────────────────────────────
interface Product {
    image: string;
    name: string;
    subtitle?: string;
    description: string;
    players?: string;
    // playtime: string;
    // tags: string;
    // weight: string;
}

const PRODUCTS: Product[] = [
    {
        image: peacock,
        name: "Revival of Heartgrove™",
        subtitle: "",
        players: "3–6",
        description:
            "Rebuild the world as 6 animal clans & uncover the saboteurs.",
        // playtime: "100",
        // tags: [Social Deduction, Resource Management, Asymmetrical],
        // weight: "Medium",
    },

    // {
    //     image: peacock,
    //     name: "Revival of Heartgrove™",
    //     subtitle: "",
    //     players: "3–6",
    //     description:
    //         "Rebuild the world as 6 animal clans & uncover the saboteurs.",
    //     // playtime: "100",
    //     // tags: [Social Deduction, Resource Management, Asymmetrical],
    //     // weight: "Medium",
    // },

    //     {
    //     image: peacock,
    //     name: "Revival of Heartgrove™",
    //     subtitle: "",
    //     players: "3–6",
    //     description:
    //         "Rebuild the world as 6 animal clans & uncover the saboteurs.",
    //     // playtime: "100",
    //     // tags: [Social Deduction, Resource Management, Asymmetrical],
    //     // weight: "Medium",
    // },
];

{/* Product card */}
function ProductCard({ product }: { product: Product }) {
return ( 
    <div
    className="flex flex-col overflow-hidden w-64"
    style={{
        border: `1px solid ${GOLD.muted}`,
        background: "rgba(231,170,81,0.04)",
        boxShadow: "0 8px 60px rgba(231,170,81,0.1)",
    }}
    >
        {/* Product Image */}
        <div
            className="w-full flex items-center justify-center"
            style={{
                height: 200,
                background:
                    "radial-gradient(ellipse at 50% 60%, #1a0e00 0%, #06080a 100%)",
                borderBottom: `1px solid ${GOLD.hairline}`,
            }}
        >
            <img src={product.image} alt={product.name} className="w-full object-top"
                style={{
                    display: "block",
                    objectFit: "cover",
                    height: "100%",
                    filter: "drop-shadow(0 0 24px rgba(231,170,81,0.2))",
                }}/>
        </div>

        {/* Product info */}
        <div className="p-5">
            <h3 className="font-bold tracking-[0.1em] mb-1"
                style={{
                    fontFamily: FONTS.display,
                    fontSize: "clamp(1rem, 3vw, 1.4rem)",
                    color: TEXT.cream,
                }}
            >
            {product.name}
            </h3>
            <p
                className="text-xs tracking-[0.25em] mb-5"
                style={{
                    fontFamily: FONTS.heading,
                    color: GOLD.primary,
                }}
            >
            {product.players ? ` ${product.players} Players` : ""}
            </p>
            <p className="text-base leading-[1.8] mb-5"
            style={{
                fontFamily: FONTS.body,
                color: TEXT.muted,
            }}
            >
            {product.description}
            </p>

            {/* "Buy" / Coming Soon button */}
            <button
                disabled
                className="w-full uppercase tracking-[0.2em] py-3 font-bold cursor-not-allowed"
                style={{
                fontFamily: FONTS.heading,
                fontSize: "0.82rem",
                background: GOLD_GRADIENT,
                color: "#06080a",
                border: "none",
                boxShadow: "0 4px 28px rgba(231,170,81,0.25)",
                opacity: 0.75,
                }}
            >
                Coming Soon
            </button>

            <p
                className="mt-4 uppercase tracking-[0.18em] text-center"
                style={{
                fontFamily: FONTS.heading,
                fontSize: "0.6rem",
                color: TEXT.dim,
                }}
            >
                Available via Kickstarter · Date TBA
            </p>
        </div>
    </div>
)
}

export default function ShopPage() {
  const [, navigate] = useLocation();

  function goToEList() {
    navigate("/");
    setTimeout(() => {
      document.getElementById("elist")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <>
      <GlobalStyles />

      <div
        className="min-h-screen flex flex-col overflow-x-hidden"
        style={{ background: "#06080a", color: TEXT.cream }}
      >
        {/* ── Minimal nav bar ──────────────────────────────────────────── */}
        <header
          className="w-full flex items-center justify-between px-8 py-3"
          style={{
            background: "rgba(4,5,8,0.96)",
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${GOLD.hairline}`,
          }}
        >
          <Link href="/">
            <img
              src={logo}
              alt="Mystwood Games logo"
              className="h-16 cursor-pointer"
            />
          </Link>

          <Link href="/">
            <button
              className="uppercase tracking-[0.18em] px-6 py-2 cursor-pointer transition-all duration-200"
              style={{
                fontFamily: FONTS.heading,
                fontSize: "0.68rem",
                border: `1px solid ${GOLD.muted}`,
                color: GOLD.light,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = GOLD.faint;
                e.currentTarget.style.borderColor = GOLD.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = GOLD.muted;
              }}
            >
              ← Back Home
            </button>
          </Link>
        </header>

        <GoldDivider />

        {/* ── Coming Soon hero ─────────────────────────────────────────── */}
        <section
          className="relative flex-1 flex flex-col items-center justify-center py-28 px-8 text-center overflow-hidden"
          style={{ background: BG.radialWarm }}
        >
          <CornerOrnaments />

          {/* Faint watermark */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none leading-none"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(160px, 26vw, 380px)",
              opacity: 0.025,
              color: GOLD.primary,
            }}
          >
            🌿
          </span>

          <SectionEyebrow text="Mystwood Games™ Shop" />

          <SectionHeading>Coming Soon</SectionHeading>

          {/* Inline rule */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16" style={{ background: GOLD.muted }} />
            <span style={{ color: GOLD.primary, fontSize: "0.7rem", letterSpacing: "0.2em" }}>✦</span>
            <div className="h-px w-16" style={{ background: GOLD.muted }} />
          </div>

        <div className="flex flex-wrap gap-3 items-start">
        {PRODUCTS.map((p) => (
            <ProductCard key={p.name} product={p} />
        ))}
        </div>

          

          {/* CTA to E-List */}
          <p
            className="text-lg mb-6"
            style={{
              fontFamily: FONTS.body,
              color: TEXT.muted,
            }}
          >
            Want to know the moment it drops?
          </p>

          <button
            onClick={goToEList}
            className="uppercase tracking-[0.2em] px-12 py-4 font-bold cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: FONTS.heading,
              fontSize: "0.78rem",
              border: `1px solid ${GOLD.muted}`,
              color: GOLD.light,
              background: "transparent",
              boxShadow: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD.faint;
              e.currentTarget.style.borderColor = GOLD.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = GOLD.muted;
            }}
          >
            Join the E-List
          </button>
        </section>

        <GoldDivider ornament />

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer
          className="py-8 px-8 flex flex-col items-center gap-4 text-center"
          style={{
            borderTop: `1px solid ${GOLD.hairline}`,
            background: "#030508",
          }}
        >
          <div
            className="text-lg font-bold tracking-[0.06em]"
            style={{
              fontFamily: FONTS.display,
              color: GOLD.primary,
            }}
          >
            Mystwood<span style={{ color: "#7aaa8a" }}>Games</span>
            <sup style={{ fontSize: "0.5em", verticalAlign: "super" }}>™</sup>
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
      </div>
    </>
  );
}