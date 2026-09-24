"use client";

import { useEffect, useState } from "react";
import { Home, Briefcase, Wrench, Contact, GraduationCap } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useLanguage } from "@/lib/language";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.home, url: "#home", icon: Home },
    { name: t.nav.experience, url: "#experience", icon: GraduationCap },
    { name: t.nav.projects, url: "#projects", icon: Briefcase },
    { name: t.nav.skills, url: "#skills", icon: Wrench },
    { name: t.nav.contact, url: "#contact", icon: Contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const el = document.getElementById(item.url.replace("#", ""));
        if (!el) return null;
        return {
          id: item.url.replace("#", ""),
          offset: el.offsetTop,
          height: el.offsetHeight,
        };
      }).filter(Boolean) as { id: string; offset: number; height: number }[];

      const scrollY = window.scrollY + 100; // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollY >= sections[i].offset) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavBar
      items={navItems.map(item => ({
        ...item,
        isActive: activeSection === item.url.replace("#", ""),
      }))}
    />
  );
}
