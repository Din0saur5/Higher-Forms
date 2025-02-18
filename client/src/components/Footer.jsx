import React from "react";
import { motion } from "framer-motion";
import { LuMail } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        className="pt-10 pb-16 bg-black text-white font-roboto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 px-6 md:px-12">
          
          {/* CONTACT INFO & SOCIALS */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <motion.img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_gold_horz.svg"
              className="h-12 mb-4"
              alt="Higher Forms Logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <p className="flex items-center mt-4 text-lg">
              <LuMail className="text-yellow-400 text-xl" />
              <span className="ml-2 text-sm">sales@higher-forms.com</span>
            </p>

            <p className="flex items-center mt-2 text-lg">
              <FaInstagram className="text-yellow-400 text-xl" />
              <a
                href="https://instagram.com/higherforms"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 underline text-sm hover:text-yellow-400 transition"
              >
                @higherforms
              </a>
            </p>
          </div>

          {/* CONTACT FORM */}
          <form className="flex-1 w-full max-w-lg md:max-w-xl space-y-4">
            <p className="text-xl font-bold text-yellow-400">Contact Us</p>

            {/* FIRST & LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-bold mb-1">
                  First Name*
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-bold mb-1">
                  Last Name*
                </label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* EMAIL & SUBJECT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-bold mb-1">
                  Subject*
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold mb-1">
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                className="textarea textarea-bordered w-full text-lg p-3 h-28 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
              ></textarea>
            </div>

            {/* SUBMIT BUTTON (No Extra Space Above) */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full text-lg p-4 bg-yellow-400 text-black font-bold rounded-lg transition hover:bg-yellow-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="bg-black text-white py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto flex flex-col justify-center items-center gap-4 px-6">
          {/* FOOTER LOGO */}
          <motion.img
            src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_white_sml.svg"
            alt="Higher Forms Logo"
            className="w-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* COPYRIGHT TEXT */}
          <p className="text-sm text-center">
            &copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
