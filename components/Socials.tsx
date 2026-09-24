import React from "react";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const socialLinks = [
  {
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/Dangvanquyen",
  },
  {
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://www.linkedin.com/in/quy%E1%BB%81n-v%C4%83n-b08ba5406/",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    url: "https://x.com/vq18122005",
  },
];

export default function Socials() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.name} Profile`}
            title={item.name}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8390d]/60 hover:text-[#e8390d] hover:shadow-md active:scale-95"
          >
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}
