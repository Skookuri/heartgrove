import logo from "/src/images/MW_Logo.png";
import hgBg from "/src/images/alone-martina-stipan.jpg";
// import spaceAntsBg from "/src/images/espacio.jpg";
// import bobBg from "/src/images/ferre.jpg";

import { GlobalStyles } from "./GlobalStyles";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow";
import { SlideData } from "./Slide";
import { GoldDivider } from "./ui";
import { TaglineBand } from "./TaglineBand";
import { FeaturesGrid, FeatureCardData } from "./FeatureCard";
import { EListSection } from "./EListSection";
import { Footer } from "./Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS: { label: string; id: string }[] = [
    { label: "Our Game", id: "hero" },
    { label: "E-List", id: "elist" },
    // { label: "Features", id:"features"},
    // { label: "Blog", id: "blog"},
    // { label: "About", id: "about"}
];

const HERO_SLIDES: SlideData[] = [
    {
        bgImg: hgBg,
        title: "Revival of Heartgrove™",
        desc: "Rebuild the world as 6 Animal Clans & Uncover the Saboteurs.",
        cta: "Join E-List",
        onCtaClick: () =>
            document.getElementById("elist")?.scrollIntoView({ behavior: "smooth" }),
    },
    // {
    //     bgImg: bobBg,
    //     title: "Business of Business",
    //     desc: "Hoard the biggest money stash as ferret corporate owners balancing stakeholder value with customer satisfaction.",
    //     cta: "Join E-List",
    //     onCtaClick: () =>
    //         document.getElementById("elist")?.scrollIntoView({ behavior: "smooth" }),
    // },
    // {
    //     bgImg: spaceAntsBg,
    //     title: "Space Ants!",
    //     desc: "Tiny creatures, infinite cosmos.",
    //     cta: "Join E-List",
    //     onCtaClick: () =>
    //         document.getElementById("elist")?.scrollIntoView({ behavior: "smooth" }),
    // },
];

const FEATURES: FeatureCardData[] = [
    {
        icon: "🌿",
        heading: "Cooperative Rebuilding",
        body: "Gather resources and trade to rebuild Heartgrove.",
    },
    {
        icon: "🎭",
        heading: "Hidden Roles",
        body: "Expose the saboteurs before it's too late.",
    },
    {
        icon: "🐾",
        heading: "Magical Factions",
        body: "Play as unique animal clans with powerful abilities.",
    },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Homepage() {
    return (
    <>
        <GlobalStyles />

        <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: "#06080a", color: "#e1d5b1" }}>
        <NavBar links={NAV_LINKS} logoSrc={logo} shopHref="/shop" />

        <section id="hero">
            <Slideshow slides={HERO_SLIDES} autoplayInterval={5500} />
        </section>

        <GoldDivider ornament />

        <TaglineBand
            eyebrow="Mystwood Games™"
            heading="Bridging Genres. Bridging People."
            body="Fun, genre-bridging asymmetrical tabletop games designed to encourage high interplayer interaction and strategic thinking."
            watermark="M"
        />

        <GoldDivider />

        <FeaturesGrid features={FEATURES} />

        <GoldDivider ornament />

        <EListSection />

        <Footer />
        </div>
    </>
    );
}
