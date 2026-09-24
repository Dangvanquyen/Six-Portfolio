import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { poppins } from "./font";
import { Navbar } from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTopBtn from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { Cursor } from "@/components/ui/Cursor";
import { Toaster } from "sonner";
import Chatbot from "@/components/Chatbot";
import { LanguageToggle } from "@/components/LanguageToggle";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://six-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Đặng Văn Quyền (Six) | Full-Stack Developer Portfolio",
    template: "%s | Đặng Văn Quyền (Six)",
  },
  description:
    "Portfolio của Đặng Văn Quyền (Six) - Full-Stack Developer chuyên về React, Next.js, C#, ASP.NET Core, Node.js, SQL Server. Khám phá các dự án nổi bật, kỹ năng và kinh nghiệm thực tế.",
  keywords: [
    "Đặng Văn Quyền",
    "Dang Van Quyen",
    "Six Developer",
    "Six Portfolio",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "ASP.NET Core",
    "C# Developer",
    "Web Developer Da Nang",
    "Lập trình viên Đà Nẵng",
    "Portfolio Developer",
  ],
  authors: [{ name: "Đặng Văn Quyền", url: "https://github.com/Dangvanquyen" }],
  creator: "Đặng Văn Quyền (Six)",
  icons: {
    icon: "/Six.jpg",
    apple: "/Six.jpg",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteUrl,
    title: "Đặng Văn Quyền (Six) | Full-Stack Developer",
    description:
      "Khám phá các dự án thực tế, kỹ năng lập trình Full-Stack (React, Next.js, C#, ASP.NET Core) và hành trình phát triển của Đặng Văn Quyền.",
    siteName: "Six Developer Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Đặng Văn Quyền (Six) - Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đặng Văn Quyền (Six) | Full-Stack Developer",
    description:
      "Portfolio của Đặng Văn Quyền (Six) - Full-Stack Developer chuyên về React, Next.js, C#, ASP.NET Core.",
    creator: "@vq18122005",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          {/* Cursor & Effects */}
          <Cursor />
          <LightPullThemeSwitcher />
          
          {/* Top-Left Controls */}
          <div className="fixed top-4 left-4 sm:top-5 sm:left-6 z-50 flex items-center gap-2 pointer-events-auto">
            <LanguageToggle />
          </div>

          <Preloader />
          <ScrollProgress />
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" />
          <ScrollToTopBtn />
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
