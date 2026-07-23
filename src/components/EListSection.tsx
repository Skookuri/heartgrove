
import {
    GoldButton,
    SectionEyebrow,
    SectionHeading,
    InlineGoldRule,
    // CornerOrnaments,
} from "./ui";
import { GOLD, BG, TEXT, FONTS } from "../theme";

export function EListSection() {
    return (
    <section id="elist" className="relative py-28 px-8 text-center overflow-hidden" style={{ background: BG.radialTop }}>
        {/* <CornerOrnaments /> */}

        <SectionEyebrow text="Stay Connected" />
        <SectionHeading>Join the E-List</SectionHeading>
        <InlineGoldRule />

        <p className="text-xl leading-[1.8] max-w-xl mx-auto mb-10" style={{fontFamily: FONTS.body, color: TEXT.muted,}}>
            Be among the first to enter the world of Revival of Heartgrove.
            E-list members who back a physical copy tier during our first
            Kickstarter campaign will unlock exclusive awards.
        </p>

        {/* Vanilla/Mailchimp Form */}
        {/* <form
            action="https://mystwoodgames.us11.list-manage.com/subscribe/post?u=999a3167de86a820884b66831&amp;id=8f313026ee&amp;f_id=004ae3e1f0"
            method="post"
            target="_blank"
            className="max-w-xs mx-auto text-xl"
        >
            <input type="text" name="FNAME" placeholder="Name..." required
                className="w-full mb-4 bg-transparent border-b-2 placeholder-[#7a6845]"
                style={{
                    borderColor: GOLD.primary,
                    fontFamily: FONTS.body,
                    color: TEXT.cream,
                    outline: "none",
                }}
            />

            <input
                type="email"
                name="EMAIL"
                placeholder="Email..."
                required
                className="w-full mb-6 bg-transparent border-b-2 placeholder-[#7a6845]"
                style={{
                borderColor: GOLD.primary,
                fontFamily: FONTS.body,
                color: TEXT.cream,
                outline: "none",
                }}
            />

            <input
                //Mailchimp anti-spam
                type="text"
                name="b_999a3167de86a820884b66831_8f313026ee"
                tabIndex={-1}
                defaultValue=""
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
            />

            <GoldButton type="submit">Sign Up Now</GoldButton>
        </form> */}

        {/* Brevo Form */}
        <form
            id="sib-form"
            method="POST"
            action="https://e9739e79.sibforms.com/serve/MUIFAI99xLjCfFoOQRlAejY9rSB7boDfp-Y6K_vYUO9UAefsgQuN2nXA7Y5IbQS09YhP7gjdDKMZ9v8gczvoeHy56Mf48o7EIORVIuMe0o9bl4uslbgmsFl4mHlGL2hKnUgJy6MC_n2BNTZgnnshEE5U1-Keur-nTmIrvBwG13_YRtylhZXY2595IcUhzpyK7xW8L7O7VwvZVKY8VQ=="
            data-type="subscription"
            className="max-w-xs mx-auto text-xl"
            >
            <input
                type="text"
                id="FIRSTNAME"
                name="FIRSTNAME"
                placeholder="Name..."
                autoComplete="off"
                required
                className="w-full mb-4 bg-transparent border-b-2 placeholder-[#7a6845]"
                style={{
                borderColor: GOLD.primary,
                fontFamily: FONTS.body,
                color: TEXT.cream,
                outline: "none",
                }}
            />

            <input
                type="email"
                id="EMAIL"
                name="EMAIL"
                placeholder="Email..."
                autoComplete="off"
                required
                className="w-full mb-6 bg-transparent border-b-2 placeholder-[#7a6845]"
                style={{
                borderColor: GOLD.primary,
                fontFamily: FONTS.body,
                color: TEXT.cream,
                outline: "none",
                }}
            />

            {/* Required hidden fields */}
            <input
                type="text"
                name="email_address_check"
                defaultValue=""
                style={{ display: "none" }}
                tabIndex={-1}
            />

            <input
                type="hidden"
                name="locale"
                value="en"
            />

            {/* GDPR Thing */}
            {/* 
                <p
                className="text-xs mt-4 mb-3 text-left"
                style={{
                    color: TEXT.cream,
                    opacity: 0.8,
                    fontFamily: FONTS.body,
                }}
                >
                We use Brevo as our marketing platform. By submitting this form,
                you agree that the personal information you provide will be
                transferred to Brevo for processing in accordance with{" "}
                <a
                    href="https://www.brevo.com/en/legal/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Brevo's Privacy Policy
                </a>.
                </p>
            <div className="flex items-start gap-3 mb-6">
                <input
                    type="checkbox"
                    id="GDPR_CONSENT"
                    name="GDPR_CONSENT"
                    value="1"
                    required
                    className="mt-1"
                />

                
                <label
                    htmlFor="GDPR_CONSENT"
                    className="leading-relaxed"
                    style={{
                    color: TEXT.cream,
                    fontFamily: FONTS.body,
                    }}
                >
                    I agree to receive Mystwood Games' newsletters and accept the privacy
                    statement.
                </label>
            </div> */}

            <GoldButton type="submit">
                Sign Up Now
            </GoldButton>
            </form>
    </section>
    );
}
