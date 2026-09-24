"use client";

import React from "react";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { jetbrainsMono } from "@/app/font";
import { useLanguage } from "@/lib/language";

export default function Experience() {
  const { t } = useLanguage();

  const experiences = [
    {
      period: t.experience.exp1_period,
      title: t.experience.exp1_title,
      organization: t.experience.exp1_org,
      description: t.experience.exp1_desc,
      icon: BriefcaseBusiness,
    },
    {
      period: t.experience.exp2_period,
      title: t.experience.exp2_title,
      organization: t.experience.exp2_org,
      description: t.experience.exp2_desc,
      icon: GraduationCap,
    },
  ];

  return (
    <section
      id="experience"
      className={`${jetbrainsMono.className} w-full max-w-4xl px-6 py-16 md:py-24`}
    >
      <div className="mb-10 text-center">
        <p className="mb-2 text-[#e8390d]">{t.experience.badge}</p>
        <h2 className="text-4xl font-bold md:text-6xl">{t.experience.title}</h2>
      </div>

      <div className="relative flex flex-col gap-8 before:absolute before:bottom-4 before:left-[19px] before:top-4 before:w-px before:bg-border md:before:left-1/2">
        {experiences.map((experience, idx) => {
          const Icon = experience.icon;

          return (
            <article
              key={idx}
              className="relative grid gap-4 md:grid-cols-2 md:gap-12"
            >
              <div className="flex items-start gap-4 md:justify-end md:text-right">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-[#e8390d] shadow-sm md:order-2">
                  <Icon size={18} />
                </div>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{experience.period}</p>
                  <h3 className="text-xl font-bold text-foreground">{experience.title}</h3>
                  <p className="text-sm font-medium text-[#e8390d]">{experience.organization}</p>
                </div>
              </div>

              <p className="pl-14 leading-7 text-muted-foreground md:pl-0 md:pt-1">
                {experience.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
