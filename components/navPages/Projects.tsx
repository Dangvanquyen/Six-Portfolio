import { Heart, Sparkles } from "lucide-react";
import React, { useState } from "react";
import ProjectCard from "../ProjectCard";
import ProjectModal from "../ProjectModal";
import { jetbrainsMono } from "@/app/font";
import { useLanguage } from "@/lib/language";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "E-Commerce-Fullstack",
    category: "fullstack",
    description: "Full-stack clothing e-commerce website with React + ASP.NET Core + SQL Server, featuring product management, authentication, shopping cart, orders, reviews, coupons, real-time chat, and an admin dashboard.",
    descriptionVi: "Website thương mại điện tử bán quần áo hoàn chỉnh với React + ASP.NET Core + SQL Server, tích hợp xác thực JWT, giỏ hàng, đặt hàng, mã giảm giá, chat thời gian thực và trang quản trị Admin Dashboard.",
    thumbnail: "/project1.png",
    techStack: ["react", "next", "javascript", "c#", "css", "html"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "https://github.com/Dangvanquyen/E-Commerce-Fullstack",
    live: "https://e-commerce-fullstack-umber.vercel.app/",
  },
  {
    title: "CatShop",
    category: "frontend",
    description: "A modern pet e-commerce website for browsing and purchasing cat products, with product management, user authentication, shopping cart, and order management.",
    descriptionVi: "Website thương mại điện tử chuyên đồ dùng thú cưng cho mèo, quản lý danh mục sản phẩm, xác thực người dùng, giỏ hàng và đặt hàng mượt mà.",
    thumbnail: "/project2.png",
    techStack: ["javascript", "react", "typescript", "tailwind"],
    gradient: "#ff7e5f, #0b1020",
    github: "https://github.com/Dangvanquyen/CatShop",
    live: "https://catshoplr.vercel.app/",
  },
  {
    title: "Nike",
    category: "fullstack",
    description: "A modern Nike-inspired e-commerce website featuring product browsing, search, authentication, shopping cart, and responsive UI built with React.",
    descriptionVi: "Website thời trang thể thao phong cách Nike hiện đại, tìm kiếm & lọc sản phẩm, xác thực người dùng, giỏ hàng và giao diện tương tác thể thao.",
    thumbnail: "/project3.png",
    techStack: ["react", "typescript", "node", "mongo"],
    gradient: "#14f195, rgb(13, 1, 60)",
    github: "https://github.com/Dangvanquyen/NikeFake",
    live: "https://nike-fake.vercel.app/",
  },
  {
    title: "NhaHangDaNang",
    category: "frontend",
    description: "A restaurant website showcasing Da Nang cuisine, menus, restaurant information, and responsive design with a modern and user-friendly interface.",
    descriptionVi: "Website nhà hàng ẩm thực đặc sản Đà Nẵng, giới thiệu thực đơn phong phú, thông tin đặt bàn và thiết kế tối ưu trên mọi thiết bị.",
    thumbnail: "/project4.png",
    techStack: ["next", "react", "typescript", "tailwind"],
    gradient: "#64e, rgb(13, 1, 60)",
    github: "https://github.com/Dangvanquyen/NhaHangDaNang",
    live: "https://nha-hang-da-nang.vercel.app/",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");
  const { t, lang } = useLanguage();

  const filterTabs = [
    { key: "all", label: lang === "vi" ? "Tất cả" : "All" },
    { key: "fullstack", label: "Full-Stack" },
    { key: "frontend", label: "Frontend" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <div id="projects" className={`${jetbrainsMono.className} flex flex-col gap-8 items-center justify-center px-4 pb-20 w-full max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-2 text-[#e8390d]">
          {t.projects.badge} <Heart size={16} />
        </p>
        <h1 className="text-4xl md:text-6xl text-center font-bold">
          {t.projects.title}
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 border border-border p-1.5 rounded-full shadow-sm">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              filter === tab.key
                ? "bg-[#e8390d] text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards with AnimatePresence */}
      <motion.div layout className={`${jetbrainsMono.className} flex flex-col gap-6 w-full`}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard
                {...project}
                description={lang === "vi" && project.descriptionVi ? project.descriptionVi : project.description}
                onClick={() => setSelectedProject({
                  ...project,
                  description: lang === "vi" && project.descriptionVi ? project.descriptionVi : project.description,
                })}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          {...selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
