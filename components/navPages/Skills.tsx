"use client";

import { FaDatabase, FaDocker, FaGitAlt, FaGithub, FaReact } from "react-icons/fa6";
import { RiCss3Fill, RiHtml5Fill } from "react-icons/ri";
import {
  SiDotnet,
  SiJsonwebtokens,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiVite,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVisualStudio, TbSql } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io5";
import SkillCard from "../SkillCard";
import { jetbrainsMono } from "@/app/font";
import { useLanguage } from "@/lib/language";

const skillCategories = [
  {
    category: "Languages",
    skills: [
      { name: "C#", icon: <TbBrandCSharp />, hoverColor: "group-hover:text-purple-500" },
      { name: "JavaScript", icon: <IoLogoJavascript />, hoverColor: "group-hover:text-yellow-400" },
      { name: "SQL", icon: <TbSql />, hoverColor: "group-hover:text-blue-500" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: <FaReact />, hoverColor: "group-hover:text-cyan-300" },
      { name: "Vite", icon: <SiVite />, hoverColor: "group-hover:text-purple-400" },
      { name: "HTML 5", icon: <RiHtml5Fill />, hoverColor: "group-hover:text-orange-500" },
      { name: "CSS 3", icon: <RiCss3Fill />, hoverColor: "group-hover:text-blue-500" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "ASP.NET Core", icon: <SiDotnet />, hoverColor: "group-hover:text-purple-600" },
      { name: "Node.js", icon: <SiNodedotjs />, hoverColor: "group-hover:text-green-600" },
      { name: "EF Core", icon: <FaDatabase />, hoverColor: "group-hover:text-indigo-400" },
      { name: "JWT", icon: <SiJsonwebtokens />, hoverColor: "group-hover:text-pink-500" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "SQL Server", icon: <TbSql />, hoverColor: "group-hover:text-[#e8390d]" },
      { name: "MongoDB", icon: <SiMongodb />, hoverColor: "group-hover:text-green-500" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt />, hoverColor: "group-hover:text-orange-600" },
      { name: "GitHub", icon: <FaGithub />, hoverColor: "group-hover:text-slate-300" },
      { name: "Docker", icon: <FaDocker />, hoverColor: "group-hover:text-blue-400" },
      { name: "Visual Studio", icon: <TbBrandVisualStudio />, hoverColor: "group-hover:text-purple-500" },
      { name: "Postman", icon: <SiPostman />, hoverColor: "group-hover:text-orange-500" },
    ],
  },
];

export default function SkillsSection() {
  const { t, lang } = useLanguage();

  const categoryNames: Record<string, { vi: string; en: string }> = {
    Languages: { vi: "Ngôn ngữ lập trình", en: "Languages" },
    Frontend: { vi: "Giao diện (Frontend)", en: "Frontend" },
    Backend: { vi: "Phía máy chủ (Backend)", en: "Backend" },
    Database: { vi: "Cơ sở dữ liệu (Database)", en: "Database" },
    Tools: { vi: "Công cụ & Môi trường", en: "Tools & DevOps" },
  };

  return (
    <section id="skills" className={`${jetbrainsMono.className} w-full max-w-4xl flex flex-col gap-8 py-14 px-4 sm:px-6`}>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t.skills.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t.skills.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-7">
        {skillCategories.map((group) => (
          <div key={group.category} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8390d]" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e8390d]">
                {categoryNames[group.category] ? categoryNames[group.category][lang as "vi" | "en"] : group.category}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
              {group.skills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
