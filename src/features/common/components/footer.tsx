import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Gatherly. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:underline text-gray-300">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline text-gray-300">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline text-gray-300">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
