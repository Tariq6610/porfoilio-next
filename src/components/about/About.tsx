import { forwardRef } from "react"
import { mulish } from "@/utils/fonts"
import "@/app/app.css"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

type AboutProp = {
  scrollToContact: () => void;
};

const About = forwardRef<HTMLDivElement, AboutProp>(({scrollToContact}, ref) =>  {

  const imageBoxRef = useRef(null)
  const imageRef = useRef(null)
  const TextContainerRef = useRef(null)
  const containerRef = useRef(null)
  const borderRef = useRef(null)

  useGSAP(()=>{
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: 'body',
          start: "top center", 
          end: "bottom center",
        }
      }
    )
    tl.from(TextContainerRef.current,{
      x: -50,
      opacity: 0,
      duration: 1.1,
    },'a')

    tl.from(imageBoxRef.current,{
      opacity: 0,
      x: 50,
      duration: 0.8,
    },"a")
    tl.from(imageRef.current,{
      opacity: 0,
      x:30,
      duration: 0.4
    })
    tl.to(borderRef.current,{
      borderWidth: 8,
      borderColor: '#fca5a5'
    })
  })

  return (
    <section ref={containerRef}>
      <div ref={ref} className='bg-zinc-200 -z-20 lg:h-screen px-[30px] flex w-screen flex-wrap justify-center overflow-x-hidden'>
          <div ref={imageBoxRef} className='lg:w-[500px] w-screen relative  flex justify-center md:items-start items-end'>
           <div ref={borderRef} className='md:w-72  w-56 mt-52'>
            <img ref={imageRef} className="z-20  relative" src="/profile-2.jpg" alt="" />
           <div className="absolute z-10 right-[100px] md:right-0 md:h-[90%] h-[70%] md:top-[5%] top-[20%] w-[300px] bg-white  box-border border-b-red-300  border-b-8"></div>
           </div>
          </div>
          <div ref={TextContainerRef} className='lg:w-[700px] w-screen  flex  md:items-center '>
           <div className="md:ms-20 px-4 md:px-0 md:w-2/3 mt-8">
          <h1 className={`${mulish} text-clamp-lg`} >About <span className="font-bold bg-[linear-gradient(to_right,_#fac37b,_transparent)]">
             Me
            </span></h1>
          <p className={`paragraph font-lucida relative  md:left-[3rem] w-fit text-xl`}>
            <span></span>
            I M an enthusiastic <span className="font-bold">web developer</span>. A detail-oriented and innovative programmer. Passionate about solving complex problems and creating efficient, scalable code for {/*both*/} <span className="font-bold">front-end</span>{/*and back-end*/} systems. Seeking an opportunity to contribute to a dynamic development team and utilize my expertise
          </p>
          <div className={`skills font-lucida relative md:left-[3rem] w-fit text-xl mt-6`}><span className="text-xl font-bold italic">My skills are : </span><div className={"badge"}>HTML</div> <div className={"badge"}>CSS</div><div className={"badge"}>Bootsratp</div> <div className={"badge"}>Tailwind</div> <div className={"badge"}>JavaScript</div> <div className={"badge"}>TypeScript</div> <div className={"badge"}>React.Js</div> <div className={"badge"}>Next.js</div> <div className={"badge"}>Firebase</div>
          </div>
          <button onClick={scrollToContact} className="px-3 py-2 bg-black hover:bg-orange-500  text-white hover: rounded ms-14 mt-6">Contact Me</button>
           </div>
          </div>
      </div>
    </section>
  )
}
)

// Set displayName property
About.displayName = "About";
export default About