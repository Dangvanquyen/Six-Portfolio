import Image from "next/image";
import React, { useEffect, useState } from "react";

const skillLabelMap: Record<string, string> = {
    react: "React",
    next: "Next.js",
    node: "Node.js",
    express: "Express",
    mongo: "MongoDB",
    ts: "TypeScript",
    postgres: "PostgreSQL",
    tailwind: "Tailwind",
    javascript: "JavaScript",
    html: "HTML",
    css: "CSS",
};

interface ProjectCardProps {
    title: string;
    description: string;
    thumbnail: string;
    techStack: string[];
    gradient: string;
    onClick?: () => void;
}

export default function ProjectCard({
    title,
    description,
    thumbnail,
    techStack,
    gradient,
    onClick,
}: ProjectCardProps) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
    }, []);

    const lightShadow = {
        boxShadow: `
      rgba(0, 0, 0, 0.5) 0px 15px 25px,
      rgba(0, 0, 0, 0.35) 0px 10px 15px,
      rgba(0, 0, 0, 0.25) 0px 4px 6px
    `,
    };

    const darkShadow = {
        boxShadow: `
      rgba(200, 200, 200, 0.2) 2px 2px 6px,
      rgba(160, 160, 160, 0.15) 0px 6px 10px
    `,
    };

    return (
        <div
            onClick={onClick}
            className="relative cursor-pointer border-[10px] dark:border-slate-900 rounded-xl overflow-hidden group transition-all duration-300"
            style={{
                ...(isDarkMode ? lightShadow : darkShadow),
                background: `radial-gradient(circle at 50% 0%, ${gradient})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />

            {/* Main content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-6 pt-4">
                {/* Text */}
                <div className="text-white w-full md:w-2/3">
                    <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
                    <p className="mt-2 text-sm md:text-base text-white/80">{description}</p>
                </div>

                {/* Tech stack with overlapping icons */}
                <div className="flex flex-wrap justify-center md:justify-end gap-2 transition-all duration-500">
                    {techStack.map((tech, index) => (
                        <span
                            key={`${tech}-${index}`}
                            className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur-sm"
                            style={{ zIndex: techStack.length - index }}
                        >
                            {skillLabelMap[tech] || tech}
                        </span>
                    ))}
                </div>

            </div>

            {/* Thumbnail */}
            <div className="relative bottom-[-50px] w-full flex justify-center items-end z-10 max-h-[180px] sm:max-h-[300px] md:max-h-none">
                <Image
                    src={thumbnail}
                    alt="project"
                    width={400}
                    height={300}
                    className="duration-500 group-hover:-translate-y-4 object-contain rounded-t-2xl w-[80%]"
                />
            </div>
        </div>
    );
}
