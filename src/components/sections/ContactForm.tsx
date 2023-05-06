"use client";
import React, { use, useEffect } from "react";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  /* refs */
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const messageRef = useRef(null);

  const [error, setError] = useState(false);
  const form: any = useRef();
  const sendEmail = (e: any) => {
    e.preventDefault();
    /* set the button state to loading */
    setButtonInner(<FaSpinner className="animate-spin" />);
    setButtonClass("bg-gray-500 hover:bg-gray-600 focus:ring-gray-500");
    if (isValidEmail(email)) {
      emailjs
        .sendForm(
          "service_vxl3v7s",
          "template_pjdr7o8",
          form.current,
          "vZFclbr2kBIwF9zAO"
        )
        .then(
          (result) => {
            /* set button state to sent */
            setButtonInner("Sent!");
            setButtonClass(
              /* draw a tick once */
              "bg-green-500 hover:bg-green-600 focus:ring-green-500 animate-pulse"
            );
            /* set a timeout for returning to default button state */
            setTimeout(() => {
              setButtonInner("Send");
              setButtonClass("bg-indigo-500 hover:bg-indigo-600");
            }, 2000);

            console.log(result.text);
            toast("📩 Your message has been sent!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            form.current.reset();
          },
          (error) => {
            console.log(error.text);
            /* set button state to sent */
            setButtonInner("Try again");
            setButtonClass("bg-red-500 hover:bg-red-600 focus:ring-red-500");
            /* set a timeout for returning to default button state */
            setTimeout(() => {
              setButtonInner("Send");
              setButtonClass("bg-indigo-500 hover:bg-indigo-600");
            }, 2000);

            toast.error("⛈️ Something clearly went wrong...", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            form.current.reset();
          }
        );
    } else {
      setButtonInner("Error");
      setButtonClass("bg-red-500 hover:bg-red-600 focus:ring-red-500");
      /* set a timeout for returning to default button state */
      setTimeout(() => {
        setButtonInner("Send");

        setButtonClass("bg-indigo-500 hover:bg-indigo-600");
      }, 2000);

      toast.error("⛈️ Something clearly went wrong...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setError(!isValidEmail(e.target.value));
    } else {
      setError(false);
    }
    setEmail(e.target.value);
  }
  function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const _mail = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      message: message,
    };
    let _error = !isValidEmail(email);
    setError(_error);
    if (_error) {
      alert("Invalid email adress");
    } else {
      /* send email */
      console.log("🚀 ~ file: Footer.tsx:39 ~ handleSubmit ~ _mail:", _mail);
    }
  }
  /* add variables controlling the state of the button */
  const [buttonInner, setButtonInner] = useState<any>(null);
  const [buttonClass, setButtonClass] = useState("bg-indigo-600");
  useEffect(() => {
    setButtonInner("Send");
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-screen-lg flex flex-col gap-4 p-2">
        <div className="flex flex-row gap-2">
          <div className=" w-[4px] bg-indigo-600"></div>
          <h2 className=" self-start text-2xl lg:text-4xl font-bold">
            Contact Form 📰
          </h2>
        </div>
        <h3 className="text-lg text-slate-600">Let&apos;s get in touch!</h3>
        {/* contact form */}
        <form className="w-full " ref={form} onSubmit={sendEmail}>
          <div className="flex flex-col md:items-center">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                ref={firstNameRef}
                onChange={(e) => setFirstName(e.target.value)}
                name="user_firstname"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                ref={lastNameRef}
                onChange={(e) => setLastName(e.target.value)}
                name="user_lastname"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                E-mail
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                id="grid-password"
                type="email"
                placeholder="your.email@adress.com"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600 h-48 resize-none"
                id="grid-password"
                placeholder="Whatever you want to tell me..."
                ref={messageRef}
                onChange={(e) => setMessage(e.target.value)}
                name="user_message"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                /* change the button appearance depending on the state of the email */
                className={[
                  "shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-6 rounded transition duration-500 ease-in-out ",
                  buttonClass,
                ].join("")}
                type="submit"
                value="Send"
              >
                {buttonInner}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
