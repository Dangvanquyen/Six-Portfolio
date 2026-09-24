"use client";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { jetbrainsMono } from "@/app/font";
import { useLanguage } from "@/lib/language";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className={`${jetbrainsMono.className} w-full text-muted-foreground border-t border-border py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm`}
    >
      <p className="text-center">
        © {new Date().getFullYear()} {t.footer.rights}
      </p>

      <div className="flex gap-4 items-center">
        <a
          href="https://github.com/Dangvanquyen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
          aria-label="GitHub Profile"
        >
          <FiGithub className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/quy%E1%BB%81n-v%C4%83n-b08ba5406/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
          aria-label="LinkedIn Profile"
        >
          <FiLinkedin className="w-4 h-4" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
          aria-label="Facebook Profile"
        >
          <FaFacebookF className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
          aria-label="Instagram Profile"
        >
          <FaInstagram className="w-4 h-4" />
        </a>
        <a
          href="mailto:dangquyen18122005@gmail.com"
          className="hover:text-foreground transition-colors"
          aria-label="Send Email"
        >
          <FiMail className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
