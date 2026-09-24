"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function LightPullThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDarkMode = () => {
    const currentTheme = resolvedTheme || theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <div className="w-full px-4 flex justify-end sm:fixed sm:top-4 sm:right-4 sm:w-auto sm:px-0 z-50">
      <div className="flex flex-col items-center gap-2 text-xs sm:text-sm text-foreground font-medium select-none">
        <div className="p-6">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 50 }}
            dragElastic={0.2}
            dragSnapToOrigin={true}
            onDragEnd={(_, info) => {
              if (info.offset.y > 15 || info.velocity.y > 50) {
                toggleDarkMode()
              }
            }}
            onClick={toggleDarkMode}
            whileDrag={{ cursor: "grabbing" }}
            className="relative bottom-0 w-8 h-8 rounded-full cursor-grab
              bg-[radial-gradient(circle_at_center,var(--primary),var(--primary-foreground),var(--ring))]
              shadow-[0_0_20px_8px_var(--ring)]"
          >
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] bg-[var(--secondary-foreground)]" />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
        >
          <div className="relative bottom-5 flex flex-col items-center text-center leading-tight tracking-tight">
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
