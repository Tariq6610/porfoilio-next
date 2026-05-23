"use client";
import { forwardRef } from "react";
import { mulish } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FiCode, FiServer, FiLayers } from "react-icons/fi";
import MeshCanvas from "../shared/MeshCanvas";

gsap.registerPlugin(ScrollTrigger);

const Services = forwardRef<HTMLDivElement>((__, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        once: true,
      },
    });

    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(Array.from(containerRef.current.children),
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  const serviceItems = [
    {
      icon: <FiCode />,
      title: "Front-End Development",
      description:
        "Building elegant, fast, responsive web systems using HTML5, CSS3, ES6+ Javascript, and frameworks like React.js and Next.js, with strict emphasis on accessibility and layout performance.",
      glow: "group-hover:bg-amber-400/10 dark:group-hover:bg-amber-400/5",
      borderGlow: "group-hover:border-amber-400/30",
    },
    {
      icon: <FiServer />,
      title: "Back-End Development",
      description:
        "Constructing scalable, safe back-end servers and databases utilizing Node.js, Express, Firebase, and Sanity CMS. Focus is placed on structured data flow and optimized API integrations.",
      glow: "group-hover:bg-rose-500/10 dark:group-hover:bg-rose-500/5",
      borderGlow: "group-hover:border-rose-400/30",
    },
    {
      icon: <FiLayers />,
      title: "Full-Stack Architecture",
      description:
        "Developing complete, responsive full-stack websites with cohesive end-to-end integration between robust database systems, server controllers, and visually pleasing presentation layers.",
      glow: "group-hover:bg-amber-500/10 dark:group-hover:bg-amber-500/5",
      borderGlow: "group-hover:border-amber-400/30",
    },
  ];

  return (
    <div 
      ref={ref} 
      className="py-14 md:py-20 w-full flex flex-col justify-center items-center bg-slate-50 dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden transition-colors duration-300"
    >
      {/* Three.js Interactive Neural Constellation Background */}
      <MeshCanvas />

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-400/5 dark:bg-rose-500/3 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <h2 className={`${mulish} text-clamp-lg text-center mb-10 tracking-tight text-zinc-950 dark:text-white font-extrabold`}>
          Servic
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
            es
          </span>
        </h2>

        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-center"
        >
          {serviceItems.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col justify-between p-8 min-h-[380px] bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-zinc-950/80 hover:-translate-y-2.5 transition-all duration-300 ease-out relative overflow-hidden ${item.borderGlow}`}
            >
              {/* Radial gradient glow in background of hovered card */}
              <div className={`absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${item.glow}`} />

              <div>
                {/* Floating Icon Casing */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm relative z-10">
                  {item.icon}
                </div>

                <h3 className="mb-4 font-bold text-xl tracking-tight text-zinc-900 dark:text-white relative z-10">
                  {item.title}
                </h3>
                
                <p className="font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed text-[0.95rem] relative z-10">
                  {item.description}
                </p>
              </div>

              {/* Decorative Corner accent */}
              <div className="w-12 h-12 absolute bottom-0 right-0 border-r border-b border-transparent group-hover:border-amber-400/40 rounded-br-2xl transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Services.displayName = "Services";
export default Services;