"use client";
import { forwardRef } from "react";
import { mulish } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FiBriefcase, FiMapPin, FiCheckCircle } from "react-icons/fi";
import WaveCanvas from "../shared/WaveCanvas";

gsap.registerPlugin(ScrollTrigger);

const Experience = forwardRef<HTMLDivElement>((__, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.fromTo(containerRef.current.querySelector(".experience-title"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    if (cardsRef.current) {
      tl.fromTo(Array.from(cardsRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }
  }, { scope: containerRef });

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "SilqueTech",
      period: "Present",
      location: "Remote / Hybrid",
      description: "Leading the architectural development of robust full-stack applications, real-time enterprise platforms, and secure API backends. Championing web performance optimization, fluid user experiences, microservice infrastructure, and Python-based Django services.",
      keyProjects: [
        {
          name: "Restaurant Management System (SilqueRM / RMS)",
          details: "Developed a comprehensive, high-scale full-stack Next.js application featuring event-driven real-time updates via custom Server-Sent Events (SSE) registry patterns. Structured optimized Server Actions, real-time sync hooks, and database schemas, resolving mobile POS latency and powering interactive live seat map dashboards."
        },
        {
          name: "Enterprise Backend REST Services",
          details: "Designed and engineered secure, highly scalable REST APIs and backend microservices using Python, Django, and Django REST Framework (DRF) to support multi-platform data synchronization, secure checkout routes, and analytics logging."
        },
        {
          name: "Corporate Portfolio Website",
          details: "Designed and implemented SilqueTech's premium client-facing portfolio platform. Developed rich layouts and optimized Next.js frameworks with ultra-smooth GSAP animations, increasing user engagement metrics."
        }
      ],
      techs: ["React.js", "Next.js", "TypeScript", "Python", "Django", "Django REST Framework", "Node.js", "Express", "Server-Sent Events", "Tailwind CSS", "Prisma"]
    }
  ];

  return (
    <section 
      ref={ref} 
      className="py-14 md:py-20 w-full bg-white dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden transition-colors duration-300"
    >
      {/* Three.js Interactive 3D Wave Landscape Background */}
      <WaveCanvas />

      {/* Decorative Glow Background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-amber-400/5 dark:bg-amber-500/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full bg-rose-400/5 dark:bg-rose-500/3 blur-[120px] pointer-events-none -z-10" />

      <div ref={containerRef} className="container mx-auto px-6 md:px-12">
        {/* Title */}
        <div className="experience-title flex flex-col items-center text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-400/10 rounded-full mb-4">
            MY JOURNEY
          </span>
          <h2 className={`${mulish} text-clamp-lg tracking-tight text-zinc-950 dark:text-white font-extrabold`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div ref={cardsRef} className="w-full flex flex-col gap-10">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="group bg-zinc-50 dark:bg-zinc-800/20 border border-zinc-200/60 dark:border-zinc-800/40 rounded-2xl p-8 lg:p-10 hover:shadow-xl dark:hover:shadow-zinc-950/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top border ambient line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Role details and Tech stack */}
                <div className="lg:col-span-5 flex flex-col justify-start">
                  <div>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400 font-extrabold rounded-full w-max text-xs mb-4 uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                      <FiBriefcase className="text-rose-500 text-xl lg:text-2xl flex-shrink-0" />
                      {exp.role}
                    </h3>
                    <div className="text-xl font-bold text-amber-500 dark:text-amber-400 mt-2">
                      {exp.company}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-2">
                      <FiMapPin className="text-rose-500" />
                      {exp.location}
                    </div>
                    <p className="font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed text-base mt-6">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                      Technologies Utilized
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.techs.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-xs font-semibold px-3 py-1 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 rounded-md transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Key Project Contributions */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                    Key Project Contributions
                  </h4>
                  
                  <div className="flex flex-col gap-6">
                    {exp.keyProjects.map((proj, pIdx) => (
                      <div 
                        key={pIdx}
                        className="p-6 bg-white dark:bg-zinc-900/60 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-amber-500/20 dark:hover:border-amber-500/10 transition-colors shadow-sm"
                      >
                        <h5 className="font-bold text-zinc-900 dark:text-white mb-2.5 flex items-start gap-2.5 text-base md:text-lg">
                          <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0 text-lg" />
                          <span>{proj.name}</span>
                        </h5>
                        <p className="text-[0.94rem] font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed pl-7">
                          {proj.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";
export default Experience;
