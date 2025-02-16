import React from "react";
import { LuMail } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="pt-4 pb-10 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-12 px-4 md:px-8">
          
          {/* Contact Info and Social Media - Adjusted for Responsiveness */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full md:w-auto">
            <img src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_gold_horz.svg" className="h-12"/>

            <p className="flex mt-10  text-xl">
            <LuMail />
              <span className="text-sm mx-2">sales@higher-forms.com</span>
            </p>

            <p className="flex mt-4 items-center text-xl">
            <FaInstagram /> <span className="mx-1"></span>
              <a
                href="https://instagram.com/higherforms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sm"
              >@higherforms
              </a>
            </p>


           {/* Footer Section - Centered for Mobile */}
      <footer className="bg-black text-white py-12 max-md:hidden">
        <div className="container ml-24 flex flex-col justify-center items-center gap-4 px-4">
          {/* Footer Logo */}
          <img src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_white_sml.svg" alt="Higher Forms Logo" className="w-20" />

          {/* Footer Text */}
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.
          </p>
        </div>
      </footer>
         
          </div>

          {/* Contact Form - Adjusted Width for Small Screens */}
          <form className="flex-1  space-y-6 w-full max-w-lg md:max-w-xl">
          <p className="bold text-xl" >Contact Us:</p>
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-bold">
                  First Name*
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered w-full text-lg p-4"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-bold">
                  Last Name*
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Enter your last name"
                  className="input input-bordered w-full text-lg p-4"
                />
              </div>
            </div>

            {/* Email & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full text-lg p-4"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold">
                  Subject*
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Enter subject"
                  className="input input-bordered w-full text-lg p-4"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold">
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                className="textarea textarea-bordered w-full text-lg p-4 h-32"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg p-4">
              Submit
            </button>
          </form>
        </div>
      </section>
      <footer className="bg-black text-white py-12 md:hidden">
        <div className="container mx-auto flex flex-col justify-center items-center gap-4 px-4">
          {/* Footer Logo */}
          <img src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_white_sml.svg" alt="Higher Forms Logo" className="w-20" />

          {/* Footer Text */}
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.
          </p>
        </div>
      </footer>
     
    </>
  );
};

export default Footer;
