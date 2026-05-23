"use client";
import { useRef } from "react";
import { RefObject } from 'react';
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import ContactMe from "@/components/contact-Me/Contact-me";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/services/Services";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const servicesRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref : RefObject<HTMLDivElement>) => {
    if (ref.current) {
      if(ref.current === heroRef.current){
        ref.current.scrollIntoView({ behavior: 'smooth', block: "center" });
      }else{
        ref.current.scrollIntoView({ behavior: 'smooth', block: "start" });
      }
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 min-h-screen w-full relative">
      <Header 
        ref={null}
        scrollToHero = {() => scrollToSection(heroRef)}
        scrollToAbout={() => scrollToSection(aboutRef)}
        scrollToExperience={() => scrollToSection(experienceRef)}
        scrollToServices={() => scrollToSection(servicesRef)}
        scrollToProjects={() => scrollToSection(projectsRef)}
        scrollToContact={() => scrollToSection(contactRef)}
      />
      <div id="home" className="w-full flex justify-center items-center">
        <Hero ref={heroRef}/>
      </div>
      <div id="about">
        <About 
          ref={aboutRef}
          scrollToContact={() => scrollToSection(contactRef)}
        />
      </div>
      <div id="experience">
        <Experience ref={experienceRef} />
      </div>
      <div id="services">
        <Services ref={servicesRef} />
      </div>
      <div id="projects">
        <Projects ref={projectsRef}/>
      </div>
      <div id="contact">
        <ContactMe ref={contactRef}/>
      </div>
    </div>
  );
}
