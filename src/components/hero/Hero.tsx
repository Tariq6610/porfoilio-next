import { forwardRef } from "react";
import { mulish } from "@/utils/fonts";
import "@/app/app.css"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const Hero = forwardRef<HTMLDivElement>((__,ref) => {

gsap.registerPlugin(ScrollTrigger)

const containerRef = useRef(null)
const textRef = useRef(null)
const imageContainerRef = useRef(null)
const imageRef = useRef(null)
const svgRef = useRef<SVGPathElement | null>(null)

  useGSAP(()=>{
    const pathLength = svgRef.current?.getTotalLength();
    if (svgRef.current) {
      // Initialize strokeDasharray and strokeDashoffset
      gsap.set(svgRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    }

    const tl = gsap.timeline(
      {
        scrollTrigger:{
          trigger: containerRef.current,
        }
      }
    )
    tl.from(textRef.current,{
      xPercent : -30,
      delay: 1,
      duration: 1.3,
      opacity: 0,
    }, "a")

    tl.from(imageContainerRef.current,{
      xPercent : 30,
      delay: 1,
      duration: 1.3,
      opacity: 0,
      transition: ""
    },"a")

    tl.to(imageRef.current, {
      x: -24,
      y: -24,
    })

    tl.to(
      svgRef.current,
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
      },

    );
    
  })


  return (
    <section ref={containerRef}>
      <div ref={ref} className=" flex relative w-screen justify-center items-center md:mt-40 flex-wrap gap-x-28 gap-y-9 ">
        <div ref={textRef} className="w-96 px-4 md:p-0 order-2 sm:order-1 relative">
          <h1 className={`${mulish} text-clamp-lg w-fit mb-8 mt-4`}>M Tariq</h1>
          <p className={`paragraph font-lucida relative md:left-[3rem] w-fit text-xl`}>
            <span className="font-bold bg-[linear-gradient(to_right,_#fac37b,_transparent)]">
              Frontend Developer
            </span>
            , with knowledge in web development and design, i offer the best
            projects resulting in qualitywork
          </p>
          <div className="relative hidden md:block rotate-45 left-60 top-32">
            <svg
            
             
              width="53"
              height="81"
              viewBox="0 0 53 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={svgRef}
                d="M51.0477 1.17087C40.4513 17.1607 29.0523 32.4971 19.0372 48.8629C13.2804 58.2703 -3.92008 86.412 2.91504 77.7563C14.1498 63.5292 23.3468 47.4314 33.901 32.6695C37.9902 26.9499 42.2523 21.395 46.5698 15.8481C48.2313 13.7136 49.8214 12.2153 47.4714 15.8092C36.9829 31.8496 25.4188 47.1543 14.8614 63.1553C13.7348 64.8628 10.6583 70.0727 12.1285 68.6502C17.5175 63.4362 22.0878 57.1433 26.7655 51.3269C32.3983 44.3228 37.6555 36.9359 43.6299 30.2146C45.776 27.8003 48.0708 24.232 50.6916 22.3437C55.3294 19.0022 45.7662 32.6808 42.8159 37.5768C37.9058 45.7249 32.2719 53.4829 27.191 61.523"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div ref={imageContainerRef} className=" order-1 sm:order-2 relative ">
          <div ref={imageRef} className="md:w-72 w-56 z-10 relative bottom-0 right-0 order-1 sm:order-2">
            <img className="object-cover w-screen" src="/profile.jpg" alt="" />
          </div>
          <div className="md:w-72 w-56 md:h-[384px] h-[298.66px] bg-gray-200 top-0 bottom-0 absolute border-4 border-black"></div>
          <div className="absolute">
      
          </div>
        </div>
      </div>
    </section>
  );
})

// Set displayName property
Hero.displayName = "Hero";
export default Hero