"use client";
import { forwardRef } from "react";
import { mulish } from "@/utils/fonts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FiExternalLink } from "react-icons/fi";
import FlowCanvas from "../shared/FlowCanvas";

gsap.registerPlugin(ScrollTrigger);

const Projects = forwardRef<HTMLDivElement>((__, ref) => {
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

  const projectList = [
    {
      title: "FoodApp",
      description: "A responsive, feature-rich food delivery application featuring modern menu listings, cart handling, and Firebase real-time database storage and retrieval.",
      image: "/projects/foodApp.png",
      link: "https://foodapp-mini-hackaton.vercel.app/",
      tags: ["React", "Firebase", "CSS Modules", "Realtime DB"],
    },
    {
      title: "Learning Management System",
      description: "A complete education portal providing comprehensive administration consoles and interactive student portals to register and study courses seamlessly.",
      image: "/projects/lms.png",
      link: "https://lms-cfiw-70qiro9w1-tariq-syeds-projects.vercel.app/",
      tags: ["Next.js", "Tailwind CSS", "LMS", "State Management"],
    },
    {
      title: "Quiz App",
      description: "An engaging web application providing highly responsive, time-sensitive quizzes with immediate results, historical scores, and question reviews.",
      image: "/projects/QuizApp.png",
      link: "https://quiz-ciozvsjx9-tariq-syeds-projects.vercel.app/",
      tags: ["HTML5", "CSS3", "JavaScript", "Interactions"],
    },
    {
      title: "Food Recipes App",
      description: "A dynamic recipe finder fetching recipes globally via structured REST APIs. Includes detailed nutritional information and instruction sheets.",
      image: "/projects/Recepes.png",
      link: "https://react-assignment-2-5kpg6odmw-tariq-syeds-projects.vercel.app/",
      tags: ["React.js", "Web API", "CSS Grid", "Filter Queries"],
    },
    {
      title: "News App",
      description: "A real-time global news explorer fetching fresh media publications and categorizing columns via external API endpoints.",
      image: "/projects/News.png",
      link: "https://tariq6610.github.io/News_API_Application/",
      tags: ["HTML5", "CSS3", "News API", "Async JS"],
    },
    {
      title: "Resume Builder App",
      description: "A responsive resume builder enabling visitors to design, live preview, and download custom, industry-standard professional resume formats.",
      image: "/projects/Resume-Builder.png",
      link: "https://resume-builder-hackathon-v2bc-upto-milestone-5-d314aqgu6.vercel.app/",
      tags: ["HTML5", "CSS3", "TypeScript", "PDF Generator"],
    },
    {
      title: "Todo App",
      description: "An optimized personal dashboard to catalog tasks, configure priorities, and maintain status logs.",
      image: "/projects/Todo.png",
      link: "https://react-todo-ncdex8xyw-tariq-syeds-projects.vercel.app/",
      tags: ["React.js", "Local Storage", "Todo Hooks"],
    },
    {
      title: "Governor Website Clone",
      description: "A fast, fully responsive design clone of the governor official website, demonstrating Next.js multi-page routing.",
      image: "/projects/Governor.png",
      link: "https://governor-website-93skgsmyh-tariq-syeds-projects.vercel.app/",
      tags: ["Next.js", "Tailwind CSS", "Responsive UI"],
    },
    {
      title: "Personal Library Manager",
      description: "A powerful personal database application to organize, track, and catalog personal reading collections.",
      image: "/projects/library-manager.png",
      link: "https://tariqpersonallibrarymanager.streamlit.app/",
      tags: ["Python", "Streamlit", "Pandas", "Analytics"],
    },
    {
      title: "Password Meter",
      description: "An automated password generator and evaluator assessing password metrics and recommending upgrades.",
      image: "/projects/password-meter.png",
      link: "https://tariq-password-generator-and-checker-0.streamlit.app/",
      tags: ["Python", "Streamlit", "Security Algorithm"],
    },
  ];

  return (
    <div
      ref={ref}
      className="py-14 md:py-20 w-full flex flex-col justify-center items-center bg-white dark:bg-zinc-900 border-b border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden transition-colors duration-300"
    >
      {/* Three.js Flow Canvas effect */}
      <FlowCanvas />

      {/* Visual background accents */}
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-400/5 dark:bg-amber-400/3 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className={`${mulish} text-clamp-lg text-center mb-10 tracking-tight text-zinc-950 dark:text-white font-extrabold`}>
          Proje
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
            cts
          </span>
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full justify-center"
        >
          {projectList.map((project, idx) => (
            <a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col h-full bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-zinc-950/80 hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              {/* Image zoom container */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <img
                  className="object-cover w-full h-full object-top group-hover:scale-105 transition-transform duration-500"
                  src={project.image}
                  alt={`${project.title} Preview Image`}
                  onError={(e) => {
                    // Fallback to visual pattern placeholder
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400";
                  }}
                />
                {/* External link overlay */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-3xl">
                  <div className="p-3 bg-zinc-900/80 rounded-full border border-white/20 scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FiExternalLink />
                  </div>
                </div>
              </div>

              {/* Text Casing */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.tags.slice(0, 2).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-500 dark:text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white tracking-tight mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/40 flex items-center gap-1.5 text-xs font-bold text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300">
                  <span>View Project</span>
                  <FiExternalLink />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

Projects.displayName = "Projects";
export default Projects;