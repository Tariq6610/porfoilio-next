import { forwardRef } from "react"
import { MdDeveloperBoard, MdDevices } from "react-icons/md";
import { SiXdadevelopers } from "react-icons/si";
import { mulish } from "@/utils/fonts";

const Services = forwardRef<HTMLDivElement>((__, ref) => {
    return (
      <div ref={ref} className="mt-10 lg:h-screen flex flex-col justify-center items-center gap-y-12">
          <h1 className={`${mulish} text-clamp-lg`}>Servic<span className="bg-[linear-gradient(to_right,_#fac37b,_transparent)]">es</span></h1>
  
      <div className="flex  relative flex-wrap gap-10 justify-center items-center  border-solid ">
          <div className="card h-[400px] z-10 relative border-4 border-black rounded-sm px-6  pt-24 pb-10 w-72 ">
              <div >
              <div className="text-black relative w-fit h-fit text-4xl mb-2">
                <div className="relative"><MdDeveloperBoard /></div>
              <div className="w-[90%] h-[90%] -z-10 absolute top-[-5px] left-[10px] bg-red-400"></div>
              </div>
                  <h1 className="mb-6 font-bold text-xl">Front-End Development</h1>
              </div>
              <div className="font-bold text-gray-500">I build responsive websites using HTML, CSS, JavaScript, and frameworks like React and Next.js, focusing on user-friendly and visually appealing designs.</div>
              <div className="absolute w-full h-full border-4 transition duration-300 ease-in-out hover:border-red-400 hover:translate-x-4 hover:translate-y-4 top-0 left-0"></div>
          </div>
  
          <div className="card h-[400px] relative border-4 border-black rounded-sm px-6  pt-24 pb-10 w-72 ">
              <div>
              <div className="text-black relative w-fit h-fit text-4xl mb-2">
                <div className="relative"><SiXdadevelopers />   </div>
              <div className="w-[90%] h-[90%] -z-10 absolute top-[-5px] left-[10px] bg-red-400"></div>
              </div>
                  <h1 className="mb-6 font-bold text-xl">Back-End Development</h1>
              </div>
              <div className="font-bold text-gray-500">I develop scalable back-end systems using Node.js, Express, and databases like MongoDB and Firebase, ensuring secure and efficient data handling and API integration.</div>
              <div className="absolute  w-full h-full border-4 transition duration-300 ease-in-out  hover:border-red-400 hover:translate-x-4 hover:translate-y-4 top-0 left-0"></div>
          </div>
  
          <div className="card h-[400px] relative border-4 border-black rounded-sm px-6  pt-24 pb-10 w-72 ">
              <div>
              <div className="text-black relative w-fit h-fit text-4xl mb-2">
                <div className="relative"><MdDevices /></div>
              <div className="w-[90%] h-[90%] -z-10 absolute top-[-5px] left-[10px] bg-red-400"></div>
              </div>
                  <h1 className="mb-6 font-bold text-xl">Full-stack Development</h1>
              </div>
              <div className="font-bold text-gray-500">I create complete web applications using React, Next.js, Node.js, and Express, ensuring seamless integration between front-end and back-end for optimal performance.</div>
              <div className="absolute  w-full h-full border-4 transition duration-300 ease-in-out  hover:border-red-400 hover:translate-x-4 hover:translate-y-4 top-0 left-0"></div>
          </div>
      </div>
      </div>
    )
  }) 


Services.displayName = "Services";
export default Services