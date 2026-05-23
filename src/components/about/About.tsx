"use client";
import { forwardRef } from "react";
import { mulish } from "@/utils/fonts";
import "@/app/app.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FiCode, FiCpu, FiLayout, FiMail } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

type AboutProp = {
  scrollToContact: () => void;
};

const About = forwardRef<HTMLDivElement, AboutProp>(({ scrollToContact }, ref) => {
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const TextContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(imageBoxRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "a"
    );

    tl.fromTo(TextContainerRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "a"
    );

  }, { scope: containerRef });

  const skillCategories = [
    {
      title: "Core Frontend",
      icon: <FiCode className="text-amber-500" />,
      skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5 / CSS3"]
    },
    {
      title: "Styling & UI",
      icon: <FiLayout className="text-rose-500" />,
      skills: ["Tailwind CSS", "Bootstrap", "GSAP / Animations", "Responsive Design"]
    },
    {
      title: "Backend & CMS",
      icon: <FiCpu className="text-amber-500" />,
      skills: ["Node.js", "Express", "Firebase", "Sanity CMS", "RESTful APIs"]
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-14 md:py-20 w-full bg-white dark:bg-zinc-900 border-y border-zinc-200/50 dark:border-zinc-800/40 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Blur Ambient circles */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-amber-400/5 dark:bg-amber-400/3 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-rose-400/5 dark:bg-rose-400/3 blur-[120px] pointer-events-none -z-10" />

      <div ref={ref} className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Modern Floating Portrait & Interactive Glass Badges */}
        <div ref={imageBoxRef} className="flex-1 flex justify-center w-full relative">
          
          <div className="relative group max-w-[340px] md:max-w-[360px] w-full">
            {/* Elegant Outer Color-Gradient Glow Frame */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400 via-amber-500 to-rose-400 rounded-3xl opacity-20 dark:opacity-30 blur-lg group-hover:opacity-40 transition-opacity duration-700" />
            
            {/* Glass Backdrop Deck */}
            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 rounded-3xl translate-x-4 translate-y-4 -z-10 w-full h-full border border-zinc-300/40 dark:border-zinc-700/30 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
            
            {/* Portrait Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
              <img 
                ref={imageRef} 
                className="z-20 object-cover w-full h-full object-center hover:scale-105 transition-transform duration-700 ease-out" 
                src="/profile.jpg" 
                alt="M Tariq - Creative Web Developer" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600";
                }}
              />

              {/* Gradient Darkening Shade Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
            </div>



            {/* Premium Floating 'Based In' Glass Badge */}
            <div className="absolute -bottom-2 -left-4 glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-30 border border-white/60 dark:border-white/10">
              <span className="text-sm">🇵🇰</span>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Based in Pakistan
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Rich Bio, Categorized Matrix & Stats */}
        <div ref={TextContainerRef} className="flex-[1.2] w-full flex flex-col justify-center">
          {/* Section Heading */}
          <span className="inline-block self-start px-3 py-1 text-xs font-bold tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-400/10 rounded-full mb-4">
            WHO I AM
          </span>
          <h2 className={`${mulish} text-clamp-lg mb-6 tracking-tight text-zinc-950 dark:text-white font-extrabold`}>
            About
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
              {" "}Me
            </span>
          </h2>

          <p className="font-medium text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            I am a highly motivated <span className="text-zinc-950 dark:text-white font-bold">web developer</span> and creative designer. A detail-oriented and innovative programmer passionate about solving complex front-end problems, optimizing website core vitals, and producing sleek, immersive interfaces that perform reliably at scale.
          </p>

          {/* Premium Micro Stats / Key Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 max-w-2xl w-full">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800/30 rounded-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-2xl font-black text-amber-500 mb-1">99%</div>
              <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                Lighthouse Score
              </div>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800/30 rounded-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-2xl font-black text-amber-500 mb-1">15+</div>
              <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                Projects Completed
              </div>
            </div>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800/30 rounded-xl hover:-translate-y-1 transition-all duration-300 col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-amber-500 mb-1">Clean</div>
              <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
                Semantic Code
              </div>
            </div>
          </div>

          {/* Categorized Visual Skills Matrix */}
          <div className="mb-6 w-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block"></span>
              Core Technical Capabilities
            </h3>
            
            <div className="space-y-6 max-w-2xl">
              {skillCategories.map((category, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors"
                >
                  {/* Category Header Badge */}
                  <div className="flex items-center gap-2.5 min-w-[170px] text-zinc-900 dark:text-zinc-200 font-bold text-sm">
                    {category.icon}
                    <span>{category.title}</span>
                  </div>
                  
                  {/* Skills badges split */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-xs font-semibold px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 rounded-md transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-action Contact button */}
          <div>
            <button 
              onClick={scrollToContact} 
              className="glow-btn inline-flex items-center gap-2 px-7 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <FiMail className="text-base" />
              <span>Let&apos;s Build Something Great</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
});

About.displayName = "About";
export default About;