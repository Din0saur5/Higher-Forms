import React from "react";

const Footer = () => {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Contact Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">HIGHER FORMS</h3>
            <p className="flex items-center mb-2">
              <img src="https://mlxvwhdswsfgelvuxicb.supabase.co/storage/v1/object/public/web-assets/Small/HFemail.png" alt="Email Icon" className="w-6 h-6 mr-2" />
              <span>sales@higher-forms.com</span>
            </p>
            <p className="flex items-center">
              <img src="/HFIG.png" alt="Instagram Icon" className="w-6 h-6 mr-2" />
              <a
                href="https://instagram.com/higherforms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                @higherforms
              </a>
            </p>
            <div className="mt-6">
              <img
                src="/HFCC.png"
                alt="Higher Forms Cannabis Logo"
                className="max-w-sm"
              />
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex-1 space-y-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-bold">
                First Name*
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="Enter your first name"
                className="input input-bordered w-full"
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
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
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
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold">
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Enter your message"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="footer-logo">
            <img
              src="/HFlogo.png"
              alt="Higher Forms Logo"
              className="footer-logo-img w-20"
            />
          </div>
          <div className="footer-info text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Higher Forms. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
