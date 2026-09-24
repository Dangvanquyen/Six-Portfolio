"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode | string;
  hoverColor?: string; // e.g., "group-hover:text-cyan-300"
}

export default function SkillCard({
  name,
  icon,
  hoverColor = "group-hover:text-[#e8390d]",
}: SkillCardProps) {
  const iconClasses = cn(
    "transition-transform duration-300 group-hover:scale-110",
    hoverColor
  );

  return (
    <div
      className="group relative flex flex-col items-center justify-center w-[82px] h-[82px] sm:w-[90px] sm:h-[90px] rounded-2xl border border-border/70 bg-background/80 dark:bg-zinc-900/60 p-2 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#e8390d]/60 hover:bg-[#e8390d]/5 hover:shadow-md hover:shadow-[#e8390d]/10 active:scale-95 cursor-pointer select-none"
    >
      {typeof icon === "string" ? (
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className={iconClasses}
        />
      ) : (
        <div className={cn("text-2xl sm:text-[26px]", iconClasses)}>{icon}</div>
      )}
      <span className="text-[11px] mt-1.5 font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight truncate max-w-full px-1">
        {name}
      </span>
    </div>
  );
}
