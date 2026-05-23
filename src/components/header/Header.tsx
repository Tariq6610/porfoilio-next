"use client";
import { useState, forwardRef, useEffect } from "react";
import { BsMenuButtonWide, BsXLg } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type HeaderProps = {
  scrollToHero: () => void;
  scrollToAbout: () => void;
  scrollToExperience: () => void;
  scrollToServices: () => void;
  scrollToProjects: () => void;
  scrollToContact: () => void;
};

const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      scrollToHero,
      scrollToAbout,
      scrollToExperience,
      scrollToServices,
      scrollToProjects,
      scrollToContact,
    },
    ref
  ) => {
    const [navVisibility, setnavVisibility] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Initialize theme based on document class list on mount
    useEffect(() => {
      if (typeof window !== "undefined") {
        const isCurrentlyDark = document.documentElement.classList.contains("dark");
        setIsDark(isCurrentlyDark);
      }
    }, []);

    // Toggle Theme Handler
    const toggleTheme = () => {
      const nextDark = !isDark;
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    function visibility() {
      setnavVisibility(!navVisibility);
    }

    const logoRef = useRef(null);
    const routsRef = useRef<HTMLUListElement>(null);

    useGSAP(() => {
      const tl = gsap.timeline();
      tl.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      if (routsRef.current)
        tl.from(
          routsRef.current.children,
          {
            y: -40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
    });

    return (
      <>
        <header ref={ref} className="fixed top-0 left-0 w-full z-50 glass border-b border-zinc-200/50 dark:border-zinc-800/40 transition-all duration-300">
          <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center w-full">
            <div ref={logoRef} className="flex justify-center items-center gap-4">
              <div 
                className="w-10 h-10 flex font-extrabold justify-center items-center rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 text-white shadow-md hover:scale-105 hover:rotate-[360deg] transition-all duration-700 cursor-pointer"
                onClick={scrollToHero}
              >
                T
              </div>
              <h1 className="font-bold text-lg hidden sm:block tracking-wide cursor-pointer hover:opacity-80 transition-opacity" onClick={scrollToHero}>
                M Tariq
              </h1>
              <a 
                href="https://github.com/Tariq6610" 
                target="_blank" 
                rel="noreferrer"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 text-2xl"
              >
                <FaGithub />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <ul ref={routsRef} className="font-semibold lg:flex items-center gap-8 hidden text-zinc-600 dark:text-zinc-300">
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToHero}>Home</li>
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToAbout}>About</li>
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToExperience}>Experience</li>
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToServices}>Services</li>
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToProjects}>Projects</li>
                <li className="cursor-pointer hover:text-amber-500 dark:hover:text-amber-400 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-amber-400 after:to-rose-500 hover:after:w-full after:transition-all after:duration-300 transition-colors" onClick={scrollToContact}>Contact Me</li>
              </ul>

              {/* Theme Toggler */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-amber-400 transition-all duration-300 shadow-sm relative overflow-hidden active:scale-95 group"
                aria-label="Toggle Theme"
              >
                <div className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  {isDark ? (
                    <FiSun className="w-5 h-5 transition-all" />
                  ) : (
                    <FiMoon className="w-5 h-5 transition-all text-zinc-700" />
                  )}
                </div>
              </button>

              {/* Mobile Menu Icon */}
              <div
                onClick={visibility}
                className="w-10 h-10 flex lg:hidden justify-center items-center text-xl cursor-pointer bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full transition-colors active:scale-95 text-zinc-800 dark:text-zinc-200"
              >
                <BsMenuButtonWide />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <div
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-y-8 bg-zinc-950/90 text-white font-bold p-6 backdrop-blur-md transition-all duration-500 ${
              navVisibility ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div
              className="w-12 h-12 flex font-bold justify-center items-center rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 text-white shadow-lg text-lg cursor-pointer hover:rotate-[360deg] transition-all duration-700"
              onClick={() => {
                scrollToHero();
                visibility();
              }}
            >
              T
            </div>
            <div className="flex flex-col items-center gap-y-8 text-xl text-zinc-300">
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToHero(); visibility(); }}>Home</div>
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToAbout(); visibility(); }}>About</div>
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToExperience(); visibility(); }}>Experience</div>
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToServices(); visibility(); }}>Services</div>
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToProjects(); visibility(); }}>Projects</div>
              <div className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => { scrollToContact(); visibility(); }}>Contact Me</div>
            </div>
            <button
              onClick={visibility}
              className="mt-8 w-12 h-12 flex items-center justify-center bg-zinc-800 text-white hover:bg-gradient-to-r hover:from-amber-400 hover:to-rose-500 rounded-full shadow-md cursor-pointer transition-all duration-300"
            >
              <BsXLg />
            </button>
          </div>
        </header>
      </>
    );
  }
);

Header.displayName = "Header";
export default Header;