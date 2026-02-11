import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        {/* Left */}
        <p className="text-base-content/70 text-center md:text-left">
          © {new Date().getFullYear()} Sudoverse. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-5">
          
          <a
            href="https://github.com/sudo-verse/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-primary transition duration-200"
          >
            <Github size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/devashish-verse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-primary transition duration-200"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="mailto:ashishkrgupta.hajipur@gmail.com"
            className="text-base-content/70 hover:text-primary transition duration-200"
          >
            <Mail size={20} />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
