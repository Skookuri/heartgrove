"use client";
import { Link } from "wouter";
// import bgImg1 from "/src/images/openfield.png";
import bgImg from "/src/images/alone-martina-stipan.jpg";
// import { useEffect, useRef } from "react";
import NavBar from "./NavBar";

export default function Homepage() {
    const sectionNames = ["HOME", "INFO", "FEATURES"];
    const sectionIDs = ["hero", "info", "features"];

    // const handleScroll = (sectionID: string) => {
    //     const section = document.getElementById(sectionID);
    //     if (section) {
    //         section.scrollIntoView({ behavior: "smooth" });
    //     }
    // };
    return (
        <>
            <NavBar sectionNames={sectionNames} sectionIDs={sectionIDs} />
            <div className="flex flex-col">
                {/* Hero Section */}
                <section id="hero" className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${bgImg})` }}>
                    <div className="bg-black/50 p-8 rounded-2xl text-center text-white">
                        <h1 className="text-4xl font-cinzel font-regular mb-4">Revival of Heartgrove™</h1>
                        <p className="mb-6 text-lg">
                        Rebuild the world. Uncover the aliens.
                        </p>
                        <Link href="/shop">
                        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 transition rounded-xl font-semibold">
                            Shop Now
                        </button>
                        </Link>
                    </div>
                </section>

                {/* Tagline Section */}
                <section id="info" className="py-16 px-6 text-center bg-neutral-100">
                    <h2 className="text-2xl font-semibold mb-4">A Game of Rebirth & Betrayal</h2>
                    <p className="max-w-2xl mx-auto text-gray-700">
                        Heartgrove™ is a cooperative social-deduction strategy game where awakened
                        animal clans work to restore a fallen world while hidden aliens
                        sabotage from within.
                    </p>
                </section>

                {/* Features */}
                <section id="features" className="grid md:grid-cols-3 gap-8 py-16 px-6 bg-white text-center">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Cooperative Rebuilding</h3>
                        <p>Gather resources and restore the Heartgrove.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Hidden Roles</h3>
                        <p>Expose alien mimics before it’s too late.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Magical Factions</h3>
                        <p>Play as unique predator clans with powerful abilities.</p>
                    </div>
                </section>
            </div>
        </>
    );
}