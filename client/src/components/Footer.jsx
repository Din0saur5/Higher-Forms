import React from "react";

const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12 px-4 md:px-8">
          
          {/* Contact Info and Social Media - Adjusted for Responsiveness */}
          <div className="flex-1 space-y-4 text-center md:text-left flex flex-col items-center md:items-start w-full md:w-auto">
            <h3 className="text-2xl font-bold">HIGHER FORMS</h3>

            <p className="flex items-center text-sm">
              <img
                src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/HFemail.png"
                alt="Email Icon"
                className="w-5 h-5 mr-2"
              />
              <span>sales@higher-forms.com</span>
            </p>

            <p className="flex items-center text-sm">
              <img src="/HFIG.png" alt="Instagram Icon" className="w-5 h-5 mr-2" />
              <a
                href="https://instagram.com/higherforms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @higherforms
              </a>
            </p>

            {/* Smaller Logo - Centered for Mobile */}
            <div className="mt-4 flex justify-center md:justify-start w-full">
              <img src="/HFCC.png" alt="Higher Forms Cannabis Logo" className="w-24 md:w-28" />
            </div>
          </div>

          {/* Contact Form - Adjusted Width for Small Screens */}
          <form className="flex-1 space-y-6 w-full max-w-lg md:max-w-xl">
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

      {/* Footer Section - Centered for Mobile */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto flex flex-col justify-center items-center gap-4 px-4">
          {/* Footer Logo */}
          <img src="/HFlogo.png" alt="Higher Forms Logo" className="w-20" />

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
