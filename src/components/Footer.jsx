import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuMail } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { sendContactEmail } from "../../api"; // Import the function

const Footer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await sendContactEmail(formData);
      setStatus("Email sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("Failed to send email.");
    }
  };

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
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12 px-6 md:px-12">
          {/* LEFT SECTION - Social Media & Contact Info */}
          <div className="flex-1 md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.img
              src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/logos/HF_gold_horz.svg"
              className="h-12 mb-4"
              alt="Higher Forms Logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            <p className="flex items-center mt-4 text-lg justify-center md:justify-start">
              <LuMail className="text-yellow-400 text-xl" />
              <span className="ml-2 text-sm">sales@higher-forms.com</span>
            </p>

            <p className="flex items-center mt-2 text-lg justify-center md:justify-start">
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

          {/* RIGHT SECTION - Contact Form */}
          <form className="flex-1 w-full md:w-2/3 max-w-lg md:max-w-xl space-y-4" onSubmit={handleSubmit}>
            <p className="text-xl font-bold text-yellow-400">Contact Us</p>

            {/* FIRST & LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold mb-1">
                  First Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold mb-1">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  className="input input-bordered w-full text-lg p-3 bg-gray-800 text-white border-gray-600 focus:border-yellow-400 focus:ring-yellow-400"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  value={formData.subject}
                  onChange={handleChange}
                  required
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
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              className="btn btn-primary w-full content-center text-lg p-4 bg-yellow-400 text-black font-bold align-center rounded-lg transition hover:bg-yellow-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </form>

          {status && <p className="text-center mt-4">{status}</p>}
        </div>
      </motion.section>
    </>
  );
};

export default Footer;
