"use client"
import { useState, forwardRef } from "react";
import { BsMenuButtonWide } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

type HeaderProps = {
  scrollToHero: () => void,
  scrollToAbout: () => void;
  scrollToServices: () => void;
  scrollToProjects: () => void;
  scrollToContact: () => void;
};


const Header = forwardRef<HTMLElement, HeaderProps>(({ 
  scrollToHero, 
  scrollToAbout,
  scrollToServices,
  scrollToProjects,
  scrollToContact},ref) => {
    const [navVisibility, setnavVisibility] = useState(false)

    function visibility(){
      setnavVisibility(!navVisibility)
      console.log("ok");
      
    }
  
    return (
      <>
      <header ref={ref} >
        <div className='flex z-30 fixed  top-0 w-screen bg-slate-200 justify-between px-4 md:px-28 py-4 '>
          <div className='flex justify-center items-center gap-3'>
            <h1 className='w-12 h-12 flex font-bold justify-center items-center rounded-full bg-black text-white'>T</h1>
            <h1 className="font-bold">M Tariq</h1>
            <a href="https://github.com/Tariq6610" target="_blank"><div className="text-2xl"><FaGithub /></div></a>
            </div>
          <div className="flex items-center">
            <ul className='font-bold lg:flex items-center gap-12 hidden '>
              <li className="cursor-pointer hover:bg-slate-300 p-2" onClick={scrollToHero}>Home</li>
              <li className="cursor-pointer hover:bg-slate-300 p-2" onClick={scrollToAbout}>About</li>
              <li className="cursor-pointer hover:bg-slate-300 p-2" onClick={scrollToServices}>Services</li>
              <li className="cursor-pointer hover:bg-slate-300 p-2" onClick={scrollToProjects}>Projects</li>
              <li className="cursor-pointer hover:bg-slate-300 p-2" onClick={scrollToContact}>Contact Me</li>
            </ul>
          </div>
          <div onClick={visibility} className={`w-12 h-12 flex justify-center items-center text-2xl cursor-pointer lg:hidden`}><BsMenuButtonWide /></div>
        </div>
        <div  className={`fixed transition-top ease-in-out duration-500 z-30 w-screen flex flex-col items-center justify-center gap-y-8 bg-[rgba(22,22,22,0.6)] text-white font-bold p-6 backdrop-blur-sm ${navVisibility ? "top-0" : "top-[-500px]"}`}>
        <h1 className='w-12 h-12 flex font-bold justify-center items-center rounded-full bg-black text-white'>T</h1>
          <div>
            <div className='flex font-bold flex-col items-center gap-y-10 text-slate-300'>
              <div className="cursor-pointer" onClick={() => {scrollToHero(); visibility()}}>Home</div>
              <div className="cursor-pointer" onClick={() => {scrollToAbout(); visibility()}}>About</div>
              <div className="cursor-pointer" onClick={() => {scrollToServices(); visibility()}}>Services</div>
              <div className="cursor-pointer" onClick={() => {scrollToProjects(); visibility()}}>Projects</div>
              <div className="cursor-pointer" onClick={() => {scrollToContact(); visibility()}}>Contact Me</div>
              <div onClick={visibility} className=' px-3 py-2 bg-black text-white cursor-pointer absolute top-6 right-4'>X</div>
            </div>
          </div>
        </div>
      </header>
      </>
    )
})

// Set displayName property
Header.displayName = "Header";
export default Header