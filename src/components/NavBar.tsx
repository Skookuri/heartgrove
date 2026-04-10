import React, { useEffect, useState } from "react";
import { Link } from "wouter";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  id: string;
}

interface NavBarProps {
  links: NavLink[];       // scroll-to nav items
  logoSrc: string;        // imported image path
  shopHref?: string;      // wouter route for the Shop button, defaults to "/shop"
}

// ─── Component ────────────────────────────────────────────────────────────────

const NavBar: React.FC<NavBarProps> = ({ links, logoSrc, shopHref = "/shop" }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Track which section is currently visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Also observe hero so nav goes transparent when at top
    const hero = document.getElementById("hero");
    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, [links]);

  function scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  // Nav is transparent only while hero is the active section
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
          ? "1px solid transparent"
          : "1px solid rgba(200,168,75,0.12)",
      }}
    >
      {/* Logo */}
      <img src={logoSrc} alt="Mystwood Games logo" className="h-16 cursor-pointer" onClick={() => scrollTo("hero")} />

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-10">
        {links.map(({ label, id }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative font-['Cinzel',serif] text-[0.72rem] uppercase tracking-[0.18em] bg-transparent border-0 cursor-pointer transition-colors duration-200"
              style={{ color: isActive ? "#e8c96a" : "#c8a84b" }}
            >
              {label}
              {/* Animated underline — visible when active */}
              <span
                className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 origin-left"
                style={{
                  width: isActive ? "100%" : "0%",
                  background:
                    "linear-gradient(90deg, #c8a84b, #e8c96a)",
                }}
              />
            </button>
          );
        })}

        {/* Shop CTA — styled as a gold-bordered button */}
        <Link href={shopHref}>
          <button
            className="font-['Cinzel',serif] text-[0.68rem] uppercase tracking-[0.18em] px-6 py-2 cursor-pointer transition-all duration-200"
            style={{
              border: "1px solid rgba(200,168,75,0.5)",
              color: "#e8c96a",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(200,168,75,0.1)";
              e.currentTarget.style.borderColor = "#e8c96a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(200,168,75,0.5)";
            }}
          >
            Shop
          </button>
        </Link>
      </nav>

      {/* Mobile CTA */}
      <button
        className="md:hidden font-['Cinzel',serif] text-[0.65rem] uppercase tracking-widest px-4 py-2 cursor-pointer transition-all duration-200"
        style={{
          border: "1px solid rgba(200,168,75,0.5)",
          color: "#e8c96a",
          background: "transparent",
        }}
        onClick={() => scrollTo("waitlist")}
      >
        E-List
      </button>
    </header>
  );
};

export default NavBar;