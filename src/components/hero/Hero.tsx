"use client";
import { forwardRef, useRef } from "react";
import "@/app/app.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import { FiArrowRight } from "react-icons/fi";

const Hero = forwardRef<HTMLDivElement>((__, ref) => {
  gsap.registerPlugin(ScrollTrigger);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Signature Segment Refs
  const pathMRef = useRef<SVGPathElement>(null);
  const pathTariqRef = useRef<SVGPathElement>(null);
  const pathDotRef = useRef<SVGCircleElement>(null);
  const penTipRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    // 1. Initial State for Text & Image elements
    gsap.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      imageContainerRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.4 }
    );

    // 2. Setup Signature Stroke Paths
    const pathM = pathMRef.current;
    const pathTariq = pathTariqRef.current;
    const penTip = penTipRef.current;

    if (!pathM || !pathTariq || !penTip) return;

    const lengthM = pathM.getTotalLength();
    const lengthTariq = pathTariq.getTotalLength();

    // Set strokes initially
    gsap.set(pathM, { strokeDasharray: lengthM, strokeDashoffset: lengthM });
    gsap.set(pathTariq, { strokeDasharray: lengthTariq, strokeDashoffset: lengthTariq });
    gsap.set(penTip, { opacity: 0 });
    if (pathDotRef.current) gsap.set(pathDotRef.current, { opacity: 0 });

    // GSAP Cursive Signature Timeline
    const tl = gsap.timeline({ delay: 0.8 });

    // Position pen tip to start of Path M
    const startPtM = pathM.getPointAtLength(0);
    gsap.set(penTip, { cx: startPtM.x, cy: startPtM.y, opacity: 1 });

    // A. Draw "M"
    const progressM = { value: 0 };
    tl.to(progressM, {
      value: 1,
      duration: 1.1,
      ease: "power1.inInOut",
      onUpdate: () => {
        const pt = pathM.getPointAtLength(progressM.value * lengthM);
        gsap.set(penTip, { cx: pt.x, cy: pt.y });
        pathM.style.strokeDashoffset = String(lengthM * (1 - progressM.value));
      },
    });

    // Move pen tip to start of Path Tariq
    tl.to(penTip, {
      duration: 0.2,
      opacity: 0,
      onComplete: () => {
        const startPtTariq = pathTariq.getPointAtLength(0);
        gsap.set(penTip, { cx: startPtTariq.x, cy: startPtTariq.y, opacity: 1 });
      },
    });

    // B. Draw "Tariq"
    const progressTariq = { value: 0 };
    tl.to(progressTariq, {
      value: 1,
      duration: 1.8,
      ease: "power1.inInOut",
      onUpdate: () => {
        const pt = pathTariq.getPointAtLength(progressTariq.value * lengthTariq);
        gsap.set(penTip, { cx: pt.x, cy: pt.y });
        pathTariq.style.strokeDashoffset = String(lengthTariq * (1 - progressTariq.value));
      },
    });

    // C. Draw Dot on "i"
    tl.to(penTip, {
      duration: 0.2,
      cx: 194,
      cy: 48,
      opacity: 1,
      ease: "power2.out",
    });

    tl.to(pathDotRef.current, {
      duration: 0.1,
      opacity: 1,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
    });

    // Fade out pen tip
    tl.to(penTip, {
      duration: 0.4,
      opacity: 0,
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex justify-center items-center py-16 md:py-24 overflow-hidden bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
    >
      {/* Three.js Particle Background Overlay */}
      <HeroCanvas />

      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />

      {/* Glow Ambient Circles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/10 dark:bg-amber-400/5 blur-[80px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-rose-400/10 dark:bg-rose-500/5 blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />

      <div ref={ref} className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left: Bio / Text details */}
        <div ref={textRef} className="flex-1 max-w-xl text-center lg:text-left">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-400/10 rounded-full mb-6">
            HELLO WORLD, I AM
          </span>

          {/* Pen Writing Cursive Signature */}
          <div className="flex justify-center lg:justify-start items-center mb-6 relative group select-none">
            <svg
              width="360"
              height="110"
              viewBox="0 0 360 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-zinc-950 dark:text-zinc-50 drop-shadow-sm filter"
            >
              {/* Cursive M */}
              <path
                ref={pathMRef}
                d="M 25 80 C 25 50, 35 30, 45 30 C 55 30, 60 65, 55 85 C 50 100, 60 95, 70 70 C 78 50, 85 35, 92 35 C 98 35, 102 50, 100 70 C 98 85, 94 90, 90 90"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Cursive Tariq with continuous letters */}
              <path
                ref={pathTariqRef}
                d="M 120 32 C 130 28, 155 28, 165 35 C 170 38, 150 42, 140 42 C 130 42, 132 35, 135 50 C 138 65, 134 92, 128 95 C 124 97, 120 90, 125 80 M 145 80 C 152 80, 158 70, 158 65 C 158 58, 150 58, 146 65 C 142 72, 148 80, 156 80 C 164 80, 170 62, 172 60 C 174 58, 178 62, 176 68 C 174 74, 172 80, 182 80 C 192 80, 194 62, 194 60 C 194 58, 195 72, 194 76 M 194 76 C 194 76, 202 80, 208 80 C 214 80, 216 68, 216 64 C 216 58, 206 58, 204 66 C 202 74, 208 80, 214 80 C 220 80, 222 70, 222 95 C 222 110, 228 108, 240 96 C 252 84, 270 82, 290 82"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dot on standard i */}
              <circle
                ref={pathDotRef}
                cx="194"
                cy="48"
                r="3"
                className="fill-zinc-950 dark:fill-zinc-50"
              />
              {/* Pen Tip glowing dot following the writing path */}
              <circle
                ref={penTipRef}
                cx="0"
                cy="0"
                r="6"
                className="fill-amber-400 dark:fill-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 bg-clip-text text-transparent leading-none">
            Creative Frontend Developer
          </h2>

          <p className="font-medium text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            With solid expertise in modern web architectures and visual design, I construct scalable and highly interactive digital spaces that optimize performance and captivate users.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="glow-btn inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              View My Work
              <FiArrowRight />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center px-6 py-3 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-800 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 font-semibold rounded-lg transition-all duration-300 shadow-sm"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* Right: Glassmorphic Profile Photo Grid */}
        <div ref={imageContainerRef} className="flex-1 flex justify-center lg:justify-end">
          <div className="relative group animate-float">
            {/* Outer Decorative Gradient Frames */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-rose-400 rounded-2xl blur-xl opacity-20 dark:opacity-30 group-hover:opacity-40 transition-all duration-500 scale-105" />
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-amber-500 rounded-2xl opacity-30 dark:opacity-40 group-hover:opacity-60 blur-[1px] transition-all duration-500" />
            
            {/* Main Photo Casing */}
            <div className="relative md:w-80 w-64 aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-2xl hover:scale-[1.01] transition-transform duration-300 z-10">
              <img
                ref={imageRef}
                className="object-cover w-full h-full object-center hover:scale-105 transition-transform duration-700"
                src="/profile-2.jpg"
                alt="M Tariq Profile Photo"
                onError={(e) => {
                  // Fallback if local image doesn't exist
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                }}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
});

// Set displayName property
Hero.displayName = "Hero";
export default Hero;