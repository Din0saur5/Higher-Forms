import React from "react";

const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Contact Info - Kept Separate but Aligned */}
          <div className="flex-1 space-y-4">
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

            {/* Smaller Logo (Below Contact Info) */}
            <div className="mt-4">
              <img src="/HFCC.png" alt="Higher Forms Cannabis Logo" className="w-20 mx-auto md:mx-0" />
            </div>
          </div>

          {/* Contact Form - Kept Separate but Aligned */}
          <form className="flex-1 space-y-6 w-full max-w-lg">
            {/* First Name & Last Name (Lined up with Contact Info) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-bold">
                  First Name*
                </label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Enter your first name"
                  className="input input-bordered w-full text-lg p-3"
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
                  className="input input-bordered w-full text-lg p-3"
                />
              </div>
            </div>

            {/* Email & Subject (Lined up with Social Media) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full text-lg p-3"
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
                  className="input input-bordered w-full text-lg p-3"
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
                className="textarea textarea-bordered w-full text-lg p-3 h-32"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg p-3">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Footer Logo */}
          <img src="/HFlogo.png" alt="Higher Forms Logo" className="w-16 md:w-20" />

          {/* Footer Text */}
          <p className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
