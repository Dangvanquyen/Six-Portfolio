"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "vi" | "en";

export const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      skills: "Kỹ năng",
      contact: "Liên hệ",
    },
    home: {
      greeting: "Xin chào, mình là",
      location: "Tam Anh, Đà Nẵng, Việt Nam",
      roles: ["LẬP TRÌNH VIÊN FULL-STACK", "SINH VIÊN CÔNG NGHỆ THÔNG TIN"],
      downloadCV: "Tải CV",
      viewCV: "Xem CV",
      status: "Sẵn sàng nhận cơ hội việc làm",
    },
    cvModal: {
      title: "Hồ sơ năng lực (CV)",
      subtitle: "Đặng Văn Quyền · Full-Stack Developer",
      download: "Tải xuống PDF",
      openTab: "Mở tab mới",
      close: "Đóng",
    },
    experience: {
      badge: "Hành trình phát triển",
      title: "Kinh nghiệm",
      exp1_title: "Full-Stack Developer",
      exp1_org: "Dự án độc lập (Independent Projects)",
      exp1_period: "2024 – Hiện tại",
      exp1_desc: "Xây dựng các ứng dụng Full-Stack với trọng tâm chính vào C# và ASP.NET Core. Có kinh nghiệm phát triển RESTful APIs, authentication, business logic, tính năng e-commerce và hệ thống admin sử dụng ASP.NET Core, Entity Framework Core và SQL Server. Áp dụng OOP, dependency injection, layered architecture và clean code để xây dựng ứng dụng có khả năng bảo trì cao.",
      exp2_title: "IT Student",
      exp2_org: "Software Engineering · HUFLIT",
      exp2_period: "2023 – Hiện tại",
      exp2_desc: "Phát triển các kỹ năng kỹ thuật phần mềm thực tế với trọng tâm vào phát triển C#/.NET. Xây dựng các dự án học thuật và cá nhân liên quan đến lập trình hướng đối tượng (OOP), thiết kế cơ sở dữ liệu, REST APIs và backend development, đồng thời liên tục cải thiện kỹ năng giải quyết vấn đề và kiến trúc phần mềm.",
    },
    projects: {
      badge: "Được tạo với",
      title: "Dự án nổi bật",
      all: "Tất cả",
      viewLive: "Xem Demo",
      viewGithub: "Mã nguồn GitHub",
    },
    skills: {
      title: "Kỹ năng chuyên môn",
      subtitle: "Công nghệ & Công cụ từ hồ sơ năng lực",
    },
    contact: {
      badge: "Liên hệ",
      title: "Liên hệ với mình",
      subtitle: "Hãy cùng hợp tác hoặc trao đổi cơ hội mới 👋",
      namePlaceholder: "Họ và tên của bạn",
      emailPlaceholder: "Địa chỉ Email của bạn",
      messagePlaceholder: "Nội dung tin nhắn...",
      sendBtn: "Gửi tin nhắn",
      sending: "Đang gửi...",
      successMsg: "Gửi tin nhắn thành công! Mình sẽ phản hồi sớm nhất có thể.",
      errorMsg: "Không thể gửi tin nhắn. Vui lòng thử lại sau!",
    },
    footer: {
      rights: "Bản quyền thuộc về Six Developer.",
    },
    ai: {
      welcome: "Xin chào! 👋 Mình là **Six Assistant** - Trợ lý ảo AI của **Đặng Văn Quyền (Six)**.\n\n Mình có thể giải đáp thông tin về **kỹ năng**, **dự án**, **kinh nghiệm** hoặc hỗ trợ bạn **liên hệ / tải CV**. Bạn muốn tìm hiểu điều gì?",
      inputPlaceholder: "Hỏi bất kỳ điều gì về Six...",
      askProject: "🚀 Dự án tiêu biểu",
      askSkills: "💻 Kỹ năng chính",
      askCV: "📄 Tải CV / Resume",
      askContact: "📬 Thông tin liên hệ",
      askAbout: "👋 Giới thiệu bản thân",
    },
  },
  en: {
    nav: {
      home: "Home",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    home: {
      greeting: "Hey, I'm",
      location: "Tam Anh, Da Nang, Viet Nam",
      roles: ["FULL STACK DEVELOPER", "IT STUDENT"],
      downloadCV: "Download CV",
      viewCV: "View CV",
      status: "Available for new opportunities",
    },
    cvModal: {
      title: "Curriculum Vitae (CV)",
      subtitle: "Dang Van Quyen · Full-Stack Developer",
      download: "Download PDF",
      openTab: "Open in new tab",
      close: "Close",
    },
    experience: {
      badge: "My journey",
      title: "Experience",
      exp1_title: "Full-Stack Developer",
      exp1_org: "Independent Projects",
      exp1_period: "2024 – Present",
      exp1_desc: "Building full-stack applications with a primary focus on C# and ASP.NET Core. Experienced in developing RESTful APIs, authentication, business logic, e-commerce features, and admin systems using ASP.NET Core, Entity Framework Core, and SQL Server. Applying OOP, dependency injection, layered architecture, and clean code to build maintainable applications.",
      exp2_title: "IT Student",
      exp2_org: "Software Engineering · HUFLIT",
      exp2_period: "2023 – Present",
      exp2_desc: "Developing practical software engineering skills with a strong focus on C#/.NET development. Building academic and personal projects involving object-oriented programming, database design, REST APIs, and backend development while continuously improving problem-solving and software architecture skills.",
    },
    projects: {
      badge: "Made with",
      title: "Featured Projects",
      all: "All",
      viewLive: "Live Preview",
      viewGithub: "GitHub Repo",
    },
    skills: {
      title: "My Skills",
      subtitle: "Technologies & Tools from my Resume",
    },
    contact: {
      badge: "Contact",
      title: "Contact Me",
      subtitle: "Let's work together or just say hi 👋",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message...",
      sendBtn: "Send Message",
      sending: "Sending...",
      successMsg: "Message sent successfully! I will get back to you soon.",
      errorMsg: "Failed to send message. Please try again!",
    },
    footer: {
      rights: "Six Developer. All rights reserved.",
    },
    ai: {
      welcome: "Hello! 👋 I am **Six Assistant** - the AI assistant of **Dang Van Quyen (Six)**.\n\nI can answer questions regarding his **skills**, **projects**, **experience**, or assist you in **getting in touch / downloading his CV**. How can I help you?",
      inputPlaceholder: "Ask anything about Six...",
      askProject: "🚀 Featured Projects",
      askSkills: "💻 Top Skills",
      askCV: "📄 Download CV",
      askContact: "📬 Contact Info",
      askAbout: "👋 About Six",
    },
  },
};

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.vi;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "vi",
  setLang: () => {},
  t: translations.vi,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("vi");

  useEffect(() => {
    const saved = localStorage.getItem("six_portfolio_lang") as Language;
    if (saved && (saved === "vi" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("six_portfolio_lang", newLang);
  };

  const t = translations[lang] || translations.vi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
