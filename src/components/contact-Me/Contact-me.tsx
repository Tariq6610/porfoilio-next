"use client";
import { FormEvent, forwardRef, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mulish } from "@/utils/fonts";
import ContactCanvas from "../shared/ContactCanvas";

gsap.registerPlugin(ScrollTrigger);

const ContactMe = forwardRef<HTMLDivElement>((__, ref) => {
  const form = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    tl.fromTo(infoRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "a"
    );

    tl.fromTo(formBoxRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "a"
    );
  }, { scope: containerRef });

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (form.current) {
      setLoading(true);
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          {
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
          }
        )
        .then(
          () => {
            toast.success("Message Sent Successfully!");
            setUser({
              name: "",
              email: "",
              subject: "",
              message: "",
            });
            setLoading(false);
          },
          (error) => {
            toast.error("Failed to send message: " + error.text);
            console.error("FAILED...", error.text);
            setLoading(false);
          }
        );
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-14 md:py-20 w-full bg-slate-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300"
    >
      {/* Three.js Interactive Magnetic Swirling Gravity Well Canvas */}
      <ContactCanvas />

      {/* Decorative Blur Ambient circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-rose-400/5 dark:bg-rose-500/3 blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-400/5 dark:bg-amber-400/3 blur-[100px] pointer-events-none -z-10" />

      <div ref={ref} className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-stretch">
          
          {/* Left Column: Contact details & info */}
          <div ref={infoRef} className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className={`${mulish} text-clamp-lg mb-6 tracking-tight text-zinc-950 dark:text-white font-extrabold`}>
                Contact{" "}
                <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 bg-clip-text text-transparent">
                  Me
                </span>
              </h2>

              <p className="font-medium text-zinc-500 dark:text-zinc-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                I am interested in taking up challenging web opportunities, complex projects, and remote freelance positions. Send me a message and I will reply within 24 hours.
              </p>

              <div className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400 font-medium">
                <p>
                  Required information includes your <span className="text-zinc-950 dark:text-white font-semibold">Name</span> and{" "}
                  <span className="text-zinc-950 dark:text-white font-semibold">Email Address</span> so that I can reach back to you. No spam, guaranteed.
                </p>
              </div>
            </div>

            {/* Social network circles */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
                Or Connect with me directly:
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/923449179576"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-200/60 text-zinc-800 hover:bg-[#25D366] hover:text-white dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#25D366] dark:hover:text-white hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-xl shadow-sm"
                  aria-label="WhatsApp Link"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://www.linkedin.com/in/tariq-syed-788940289/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-200/60 text-zinc-800 hover:bg-[#0077B5] hover:text-white dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#0077B5] dark:hover:text-white hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg shadow-sm"
                  aria-label="LinkedIn Link"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.facebook.com/tariq.syed.393/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-200/60 text-zinc-800 hover:bg-[#1877F2] hover:text-white dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#1877F2] dark:hover:text-white hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg shadow-sm"
                  aria-label="Facebook Link"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Message Form Box */}
          <div ref={formBoxRef} className="flex-1 w-full max-w-xl mx-auto">
            <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-xl dark:shadow-zinc-950/40 relative overflow-hidden">
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                Send Me A Message
              </h3>

              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 flex flex-col">
                    <input
                      value={user.name}
                      onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 text-zinc-800 dark:text-zinc-200 transition-colors"
                      type="text"
                      placeholder="First Name"
                      name="user_name"
                      required
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <input
                      value={user.email}
                      onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 text-zinc-800 dark:text-zinc-200 transition-colors"
                      type="email"
                      placeholder="Email Address"
                      name="user_email"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <input
                    value={user.subject}
                    onChange={(e) => setUser((prev) => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 text-zinc-800 dark:text-zinc-200 transition-colors"
                    type="text"
                    placeholder="Subject"
                    name="user_subject"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <textarea
                    value={user.message}
                    onChange={(e) => setUser((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-lg px-4 py-3 text-sm min-h-[160px] focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 text-zinc-800 dark:text-zinc-200 transition-colors resize-none"
                    placeholder="Message Details..."
                    name="user_message"
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="glow-btn inline-flex justify-center items-center px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full disabled:opacity-75 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
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
    </section>
  );
});

ContactMe.displayName = "ContactMe";
export default ContactMe;