import { useEffect, useState } from "react";
import { Link } from "wouter";
import { GOLD, FONTS } from "../theme";

interface NavLink {
  label: string;
  id: string;
}

interface NavBarProps {
  links: NavLink[];
  logoSrc: string;
  shopHref?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  links,
  logoSrc,
  shopHref = "/shop",
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, [links]);

  function scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const isAtHero = activeSection === "hero" || activeSection === null;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-3 transition-all duration-500"
      style={{
        background: isAtHero
          ? "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)"
          : "rgba(4,5,8,0.96)",
        backdropFilter: "blur(8px)",
        borderBottom: isAtHero
          ? "0px solid transparent"
          : `1px solid ${GOLD.hairline}`,
      }}
    >
      {/* Logo */}
      <img
        src={logoSrc}
        alt="Mystwood Games logo"
        className="h-16 cursor-pointer"
        onClick={() => scrollTo("hero")}
      />

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10">
        {links.map(({ label, id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative bg-transparent border-0 cursor-pointer transition-colors duration-200 uppercase tracking-[0.18em]"
              style={{
                fontFamily: FONTS.heading,
                fontSize: "0.72rem",
                color: isActive ? GOLD.light : GOLD.primary,
              }}
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 origin-left"
                style={{
                  width: isActive ? "100%" : "0%",
                  background: `linear-gradient(90deg, ${GOLD.primary}, ${GOLD.light})`,
                }}
              />
            </button>
          );
        })}

        {/* Shop CTA */}
        <Link href={shopHref}>
          <ShopButton />
        </Link>
      </nav>

      {/* Mobile: E-List shortcut */}
      <button
        className="md:hidden uppercase tracking-widest px-4 py-2 cursor-pointer transition-all duration-200"
        style={{
          fontFamily: FONTS.heading,
          fontSize: "0.65rem",
          border: `1px solid ${GOLD.muted}`,
          color: GOLD.light,
          background: "transparent",
        }}
        onClick={() => scrollTo("elist")}
      >
        E-List
      </button>
    </header>
  );
};

/** Extracted so hover state is self-contained */
function ShopButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="uppercase tracking-[0.18em] px-6 py-2 cursor-pointer transition-all duration-200"
      style={{
        fontFamily: FONTS.heading,
        fontSize: "0.68rem",
        border: `1px solid ${hovered ? GOLD.primary : GOLD.muted}`,
        color: GOLD.light,
        background: hovered ? GOLD.faint : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Shop
    </button>
  );
}

export default NavBar;
