import { FormEvent, forwardRef, useRef } from "react"
import emailjs from '@emailjs/browser';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsappSquare, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

const ContactMe = forwardRef<HTMLDivElement>((__, ref) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e : FormEvent) => {
    e.preventDefault();
    if(form.current)
    emailjs
      .sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, form.current, {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success('Email has sent Successfully!');
        },
        (error) => {
          toast.error('FAILED...', error.text);
          console.log('FAILED...', error.text)
        },
      );
  };

  return (
    <>
      <div
        ref={ref}
        className="flex h-screen relative bg-gray-100 justify-center items-center overflow-x-hidden"
      >
        <div className="w-[300px] z-20 px-10 absolute right-0 top-20 lg:right-auto lg:top-auto md:right-auto lg:left-80  h-[300px] bg-gray-200 border-b-4  border-orange-500">
          <h1 className="relative left-[-80px] flex top-14 text-3xl font-bold">
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
        <div className="w-[500px] p-20 absolute top-56 lg:top-auto lg:right-52 h-[600px] text-white bg-black mt-[100px]">
          <div>
            <h1 className="mb-6 font-bold text-xl">send Me A Message</h1>
            <form ref={form} onSubmit={sendEmail}>
              <div className="flex  flex-wrap justify-between gap-y-5">
                <div className="w-[48%]  rounded-md h-10   border border-gray-500 ">
                  <input
                    className="w-full bg-transparent p-2 h-full"
                    type="text"
                    placeholder="First Name"
                    name="user_name"
                    required
                  />
                </div>
                <div className="w-[48%]  rounded-md h-10   border border-gray-500 ">
                  <input
                    className="w-full bg-transparent p-2 h-full"
                    type="email"
                    placeholder="Email Address"
                    name="user_email"
                    required
                  />
                </div>
                <div className=" w-full   rounded-md h-10   border border-gray-500">
                  <input
                    className="w-full bg-transparent p-2 h-full"
                    type="text"
                    placeholder="Subject"
                    name="user_subject"
                    required
                  />
                </div>
                <div className="w-full   rounded-md h-44   border border-gray-500">
                  <textarea
                    className="w-full bg-transparent p-2  h-full"
                    placeholder="Message"
                    name="user_message"
                    required
                  />
                </div>
                <button
                  type="submit"
                  value="Send"
                  className="px-4 py-3 font-bold bg-orange-500  rounded-md "
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" hidden absolute z-40 lg:bottom-32 bottom-0 w-screen mt-2 lg:w-60 left-80 lg:flex items-end text-sm">
          <div className="w-2/4">
            <p>Does not send Emails</p>
            <p className="font-bold">Write me on my social network</p>
          </div>
          <div className="flex gap-2 text-white">
            <a href="https://wa.me/923449179576" target="_blank"><button className="p-1 bg-black text-2xl"><FaWhatsappSquare /></button></a>
            <a href="https://www.linkedin.com/in/tariq-syed-788940289/" target="_blank"><button className="p-1 bg-black text-2xl"><FaLinkedin /></button></a>
            <a href="https://www.facebook.com/tariq.syed.393/" target="_blank"><button className="p-1 bg-black text-2xl"><FaFacebookSquare /></button></a>
          </div>
        </div>
      </div>
      <div>
        <div className="p-4 lg:hidden flex justify-center w-screen items-center flex-col gap-2 bg-gray-800 text-white text-sm">
          <div>
            <p className="text-gray-400">Does not send Emails</p>
            <p className="font-bold text-gray-300">
              Write me on my social network
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