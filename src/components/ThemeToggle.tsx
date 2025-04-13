
import React, { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center overflow-hidden border border-border hover-glow"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 360 : 0,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 0.5, 
          type: 'spring',
          stiffness: 200
        }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="text-foreground" />
        ) : (
          <Sun size={20} className="text-foreground" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
