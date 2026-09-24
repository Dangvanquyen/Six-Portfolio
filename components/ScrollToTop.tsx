'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUp } from 'lucide-react';

export default function ScrollToTopBtn() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-22 sm:bottom-24 right-5 sm:right-6 z-40 p-3 rounded-full bg-white text-black shadow-lg 
                     dark:bg-zinc-900 dark:text-white dark:shadow-xl 
                     border border-gray-200 dark:border-zinc-700 
                     hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronsUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
