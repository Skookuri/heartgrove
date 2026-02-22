"use client";

import React, { useEffect, useState } from "react";

interface NavBarProps {
    sectionNames: string[]; // Names of the sections for the navbar
    sectionIDs: string[];   // IDs corresponding to those sections
}

const NavBar: React.FC<NavBarProps> = ({ sectionNames, sectionIDs }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // const handleScroll = (sectionID: string) => {
    //     const section = document.getElementById(sectionID);
    //     if (section) {
    //         section.scrollIntoView({ behavior: "smooth" });
    //     }
    // };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: "0px", threshold: 0.6 }
        );

        sectionIDs.forEach((id) => {
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [sectionIDs]);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full p-6 z-50 flex flex-wrap justify-between items-center transition-colors duration-300 text-white 
            ${activeSection === "hero" ? "bg-transparent" : "bg-warmPurp-700"}`}>
            <h2 className="text-2xl text-yt font-semibold">Mystwood Games™</h2>
            <nav className="flex space-x-8">
                <ul className="flex space-x-8">
                    {sectionNames.map((sectionName, index) => (
                        <li key={index}>
                            <button
                                onClick={() => handleScroll(sectionIDs[index])}
                                className="text-yt text-lg font-medium relative group"
                            >
                                {sectionName}
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yt scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;