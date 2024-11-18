"use client"
import { useRef } from "react";
import { RefObject } from 'react';
import About from "@/components/about/About";
import ContactMe from "@/components/contact-Me/Contact-me";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Services from "@/components/services/Services";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef(null);
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
    <>
    <Header 
            ref={null}
            scrollToHero = {() => scrollToSection(heroRef)}
            scrollToAbout={() => scrollToSection(aboutRef)}
            scrollToServices={() => scrollToSection(servicesRef)}
            scrollToProjects={() => scrollToSection(projectsRef)}
            scrollToContact={() => scrollToSection(contactRef)}
    />
    <div className="h-screen w-screen bg-slate-200 overflow-hidden flex justify-center items-center md:items-start">
      <Hero ref={heroRef}/>
    </div>
    <About ref={aboutRef}
     scrollToContact={() => scrollToSection(contactRef)}
    />
    <Services ref={servicesRef} />
    <Projects ref={projectsRef}/>
    <ContactMe ref={contactRef}/>
    </>
  );
}
