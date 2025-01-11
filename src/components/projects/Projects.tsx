import { forwardRef } from "react"
import { mulish } from "@/utils/fonts"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const Projects = forwardRef<HTMLDivElement>((__, ref) => {

  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(()=>{
      const tl = gsap.timeline(
          {
              scrollTrigger:{
                  trigger: containerRef.current
              }
          }
      )

      tl.from(containerRef.current,{
          opacity:0,
          duration: 1,
          delay: 0.5
      })
      if(containerRef.current)
      tl.from(containerRef.current.children,{
          y:-40,
          stagger: 0.2,
          duration: 1
          
      })
  })

    return (
      <div
        ref={ref}
        className="mt-10 flex flex-col justify-center items-center gap-y-12 "
      >
        <h1 className={`${mulish} text-clamp-lg`}>
          Proje
          <span className="bg-[linear-gradient(to_right,_#fac37b,_transparent)]">
            cts
          </span>
        </h1>

        <div ref={containerRef} className="flex w-full md:flex-wrap overflow-x-scroll md:overflow-hidden md:gap-10 gap-5 md:justify-center items-center border-solid ">
          <a href="https://foodapp-mini-hackaton.vercel.app/" target="_blank">
              <div className="card h-[490px] hover:bg-slate-200 rounded-sm  p-4  pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/foodApp.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">FoodApp</h1>
                <div className="font-bold text-gray-500">
                  This project is a mini hackathon submission for a Food delivery
                  web application. It is a simple, responsive web app designed to
                  display a menu and interact with Firebase for data storage and
                  retrieval.
                </div>
              </div>
          </a>

          <a href="https://lms-cfiw-70qiro9w1-tariq-syeds-projects.vercel.app/" target="_blank">
              <div className="card card h-[490px] rounded-sm  hover:bg-slate-200 p-4  pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/lms.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">
                  Learning Management System
                </h1>
                <div className="font-bold text-gray-500">
                  This Learning Management System (LMS) provides a seamless platform
                  for both admins and users to manage and access educational
                  content.
                </div>
              </div>
          </a>

          <a href="https://quiz-ciozvsjx9-tariq-syeds-projects.vercel.app/" target="_blank">
              <div className="card card h-[490px] rounded-sm hover:bg-slate-200 p-4 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/QuizApp.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Quiz App</h1>
                <div className="font-bold text-gray-500">
                  This Quiz App offers an engaging and time-bound quiz experience
                  for users. The app allows users to attempt quizzes within a
                  specific time limit and view their results once the quiz is
                  completed.
                </div>
              </div>
          </a>

          <a href="https://react-assignment-2-5kpg6odmw-tariq-syeds-projects.vercel.app/" target="_blank">
              <div className="card card h-[490px] p-4 rounded-sm hover:bg-slate-200  pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/Recepes.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Food Recepes App</h1>
                <div className="font-bold text-gray-500">
                  This Food Recipe App provides users with a vast collection of
                  recipes from around the world, fetching data via an API for a
                  dynamic and constantly updated experience.
                </div>
              </div>
          </a>

          <a href="https://tariq6610.github.io/News_API_Application/" target="_blank">
              <div className="card p-4 rounded-sm card h-[490px] hover:bg-slate-200 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/News.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">News App</h1>
                <div className="font-bold text-gray-500">
                  This News App delivers the latest headlines and breaking
                  news from around the world, fetching data dynamically via an API
                  to provide real-time updates.
                </div>
              </div>
          </a>

          <a href="https://resume-builder-hackathon-v2bc-upto-milestone-5-d314aqgu6.vercel.app/" target="_blank">
              <div className="card p-4 rounded-sm card h-[490px] hover:bg-slate-200 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/Resume-Builder.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Resume Builder App</h1>
                <div className="font-bold text-gray-500">
                This Resume Builder allows users to easily create, customize, and share their professional resumes. With a simple and intuitive interface, users can build a tailored resume, share it and download it in various formats.
                </div>
              </div>
          </a>

          <a href="https://react-todo-ncdex8xyw-tariq-syeds-projects.vercel.app/" target="_blank">
              <div className="card p-4 rounded-sm card h-[490px] hover:bg-slate-200 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/Todo.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Todo App</h1>
                <div className="font-bold text-gray-500">
                This To-Do Application allows users to create, manage, and track their tasks efficiently. Whether it is for daily chores, work tasks, or personal projects, this app provides a simple, organized way to stay on top of your to-do list.
                </div>
              </div>
          </a>

          <a href="https://governor-website-93skgsmyh-tariq-syeds-projects.vercel.app/" target="_blank">
              <div className="card p-4 rounded-sm card h-[490px] hover:bg-slate-200 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/Governor.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Governor website Clone</h1>
                <div className="font-bold text-gray-500">
                This Governor Website Clone replicates the structure and design of a government portal, featuring page routing in Next.js for fast, seamless navigation and dynamic content management
                </div>
              </div>
          </a>

          <a href="https://tariq6610.github.io/Ramzan_countDown/" target="_blank">
              <div className="card p-4 rounded-sm card h-[490px] hover:bg-slate-200 pb-10 w-72 ">
                <div>
                  <img className="h-48" src="/projects/Ramadan.png" alt="" />
                </div>
                <h1 className="mb-2 mt-3 font-bold text-xl">Ramadan Countdown App</h1>
                <div className="font-bold text-gray-500">
                The Ramadan Countdown App provides users with an accurate countdown to the next Ramadan, displaying the exact number of days, hours, minutes, and seconds remaining.
                </div>
              </div>
          </a>

        </div>
      </div>
    );
  }) 

  // Set displayName property
  Projects.displayName = "Projects";
export default Projects