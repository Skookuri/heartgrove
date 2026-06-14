import { Link } from "wouter";
import { GlobalStyles } from "./GlobalStyles";
import { GOLD, GOLD_GRADIENT, BG, TEXT, FONTS } from "../theme";
import { GoldDivider, SectionEyebrow, CornerOrnaments, InlineGoldRule } from "./ui";
import logo from "/src/images/MW_Logo.png";

export default function ConfirmationPage() {
  // Mailchimp injects *|IF|* merge tags server-side before serving the page,
  // so these template strings are left as-is for Mailchimp to process.
  // When previewing locally they'll render as literal strings — that's expected.
  const alreadySubscribed = "*|IF:IS_EMAIL_SUBSCRIBED|*";
  const elseTag = "*|ELSE:|*";
  const endIfTag = "*|END:IF|*";

  return (
    <>
      <GlobalStyles />

      <div
        className="min-h-screen flex flex-col overflow-x-hidden"
        style={{ background: "#06080a", color: TEXT.cream }}
      >
        {/* ── Top bar ──────────────────────────────────────────────────── */}
        <header
          className="w-full flex items-center justify-center px-8 py-4"
          style={{
            borderBottom: `1px solid ${GOLD.hairline}`,
            background: "rgba(4,5,8,0.98)",
          }}
        >
          <Link href="/">
            <img
              src={logo}
              alt="Mystwood Games"
              className="h-20 cursor-pointer"
            />
          </Link>
        </header>

        <GoldDivider />

        {/* ── Main confirmation card ────────────────────────────────────── */}
        <section
          className="relative flex-1 flex flex-col items-center justify-center py-28 px-6 text-center overflow-hidden"
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
              opacity: 0.022,
              color: GOLD.primary,
            }}
          >
            ✦
          </span>

          {/* Seal / icon */}
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full mb-8 text-4xl"
            style={{
              border: `1px solid ${GOLD.muted}`,
              background: "rgba(231,170,81,0.06)",
              boxShadow: `0 0 40px rgba(231,170,81,0.12)`,
            }}
          >
            ✦
          </div>

          <SectionEyebrow text="Mystwood Games™ · E-List" />

          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(1.4rem, 3.5vw, 2.6rem)",
              color: TEXT.cream,
              textShadow: "0 2px 24px rgba(231,170,81,0.2)",
            }}
          >
            Subscription Confirmed
          </h1>

          <InlineGoldRule />

          {/* ── Mailchimp conditional copy ─────────────────────────────── */}
          {/*
            Mailchimp processes *|IF|* tags before delivering the page.
            Both branches are included; Mailchimp strips the inactive one.
          */}
          <div
            className="max-w-md mx-auto mb-10 text-xl leading-[1.9]"
            style={{ fontFamily: FONTS.body, color: TEXT.muted }}
          >
            {alreadySubscribed}
            <p>
              You're already subscribed — your profile has been updated.{" "}
              <span style={{ color: TEXT.cream }}>Thank you!</span>
            </p>
            {elseTag}
            <p>
              Thank you for subscribing!{" "}
              <span style={{ color: TEXT.cream }}>
                Look out for news and updates
              </span>{" "}
              as we bring Heartgrove to life.
            </p>
            {endIfTag}
          </div>

          {/* ── Action links ──────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Primary — back to site */}
            <a
              href="https://www.mystwoodgames.com/"
              className="uppercase tracking-[0.2em] font-bold px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
              style={{
                fontFamily: FONTS.heading,
                fontSize: "0.78rem",
                background: GOLD_GRADIENT,
                color: "#06080a",
                border: "none",
                boxShadow: "0 4px 28px rgba(231,170,81,0.3)",
                display: "inline-block",
              }}
            >
              Continue to Website
            </a>

            {/* Secondary — manage prefs */}
            <a
              href="https://mystwoodgames.us11.list-manage.com/profile/?u=999a3167de86a820884b66831&id=8f313026ee&e=*|UNIQID|*"
              className="uppercase tracking-[0.18em] px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
              style={{
                fontFamily: FONTS.heading,
                fontSize: "0.68rem",
                border: `1px solid ${GOLD.muted}`,
                color: GOLD.light,
                background: "transparent",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = GOLD.faint;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD.primary;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = GOLD.muted;
              }}
            >
              Manage Preferences
            </a>
          </div>
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