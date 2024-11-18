"use client"
import { FormEvent, forwardRef, useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsappSquare, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const ContactMe = forwardRef<HTMLDivElement>((__, ref) => {
  const form = useRef<HTMLFormElement>(null);

  const TextContainerRef = useRef(null)
  const formContainerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const socialsRef = useRef(null)

  useGSAP(()=>{
    const tl = gsap.timeline(
      {
        scrollTrigger: {
          trigger: formContainerRef.current,
          scroller: 'body',
          start: "top center", 
          end: "bottom center",
        }
      }
    )
    tl.from(formContainerRef.current,{
      x: -30,
      opacity: 0,
      duration: 1.1,
    },'a')

    tl.from(TextContainerRef.current,{
      opacity: 0,
      x: 30,
      duration: 0.8,
    },"a")
    
    tl.from(socialsRef.current,{
      opacity: 0,
      x: 30,
      duration: 0.8,
    },'a')

  })

  const sendEmail = (e : FormEvent) => {
    e.preventDefault();
    if(form.current){
      setLoading(true)
      setUser({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    emailjs
      .sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, form.current, {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success('Email has sent Successfully!');
          setLoading(false)
        },
        (error) => {
          toast.error('FAILED...', error.text);
          console.log('FAILED...', error.text);
          setLoading(false);
        },
      );
      }
  };

  return (
    <>
      <div
        ref={ref}
        className="flex h-screen bg-gray-100 relative  justify-center items-center overflow-x-hidden">
        <div ref={formContainerRef} className="max-w-[500px] md:p-20 sm:p-10 p-7 absolute top-56 lg:top-auto lg:right-52 h-[600px] text-white bg-black mt-[100px]">
          <div>
            <h1 className="mb-6 font-bold text-xl">send Me A Message</h1>
            <form ref={form} onSubmit={sendEmail}>
              <div className="flex  flex-wrap justify-between gap-y-5">
                <div className="w-[48%]  rounded-md h-10   border border-gray-500 ">
                  <input
                    value={user.name}
                    onChange={(e) => setUser((prev)=> ({...prev,name: e.target.value}))}
                    className="w-full bg-transparent p-2 h-full"
                    type="text"
                    placeholder="First Name"
                    name="user_name"
                    required
                  />
                </div>
                <div className="w-[48%]  rounded-md h-10   border border-gray-500 ">
                  <input
                    value={user.email}
                    onChange={(e)=> setUser((prev)=>({...prev, email:e.target.value}))}
                    className="w-full bg-transparent p-2 h-full"
                    type="email"
                    placeholder="Email Address"
                    name="user_email"
                    required
                  />
                </div>
                <div className=" w-full   rounded-md h-10   border border-gray-500">
                  <input
                    value={user.subject}
                    onChange={(e)=> setUser((prev)=>({...prev,subject:e.target.value}))}
                    className="w-full bg-transparent p-2 h-full"
                    type="text"
                    placeholder="Subject"
                    name="user_subject"
                    required
                  />
                </div>
                <div className="w-full   rounded-md h-44   border border-gray-500">
                  <textarea
                    value={user.message}
                    onChange={(e)=>setUser((prev)=>({...prev,message:e.target.value}))}
                    className="w-full bg-transparent p-2  h-full"
                    placeholder="Message"
                    name="user_message"
                    required
                  />
                </div>
                {loading ? 
                  <div
                   className="px-4 py-3 font-bold bg-orange-500  rounded-md "
                  >Sending..</div> :
                <button
                  type="submit"
                  value="Send"
                  className="px-4 py-3 font-bold bg-orange-500  rounded-md "
                >
                  Send Message
                </button> 
              }
              </div>
            </form>
          </div>
          <div ref={TextContainerRef} className="max-w-[300px] text-black z-20 px-10 absolute lg:top-20 lg:-left-60  h-[300px] bg-gray-200 border-b-4  border-orange-500 md:-top-60 -top-72 right-0">
          <h1 className="relative left-[-50px] sm:left-[-80px] flex top-14 text-3xl font-bold">
            Contact{" "}
            <span className="font-bold bg-[linear-gradient(to_right,_#fac37b,_transparent)]">
              Me
            </span>
          </h1>
          <div
            style={{ fontFamily: "'Lucida Sans', sans-serif" }}
            className="relative text-sm top-16 "
          >
            <div>
              <p className="mb-4 ">
                i will read all emails. Send me any message you want and i will
                get back to you.
              </p>
              <p>
                i need your <span className="font-bold">Name</span> and{" "}
                <span className="font-bold">Email Address</span>, but you will
                not receive anything other than your reply
              </p>
            </div>
          </div>
        </div>
        <div ref={socialsRef} className=" hidden absolute z-40 text-black w-screen mt-2 lg:w-60 bottom-20 -left-60 lg:flex items-end text-sm">
          <div className="w-2/4">
            <p>Does not send Emails</p>
            <p className="font-bold">Write me on my social networks</p>
          </div>
          <div className="flex gap-2 text-white">
            <a href="https://wa.me/923449179576" target="_blank"><button className="p-1 bg-black text-2xl"><FaWhatsappSquare /></button></a>
            <a href="https://www.linkedin.com/in/tariq-syed-788940289/" target="_blank"><button className="p-1 bg-black text-2xl"><FaLinkedin /></button></a>
            <a href="https://www.facebook.com/tariq.syed.393/" target="_blank"><button className="p-1 bg-black text-2xl"><FaFacebookSquare /></button></a>
          </div>
        </div>
        </div>

      </div>
      <div>
        <div className="p-4 lg:hidden flex justify-center w-screen items-center flex-col gap-2 bg-gray-800 text-white text-sm">
          <div>
            <p className="text-gray-400">Does not send Emails</p>
            <p className="font-bold text-gray-300">
              Write me on my social networks
            </p>
          </div>
          <div className="flex gap-2 text-white">
            <button className="p-1 bg-black text-2xl"><FaWhatsappSquare /></button>
            <button className="p-1 bg-black text-2xl"><FaLinkedin /></button>
            <button className="p-1 bg-black text-2xl"><FaFacebookSquare /></button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}) 

// Set displayName property
ContactMe.displayName = "ContactMe";
export default ContactMe