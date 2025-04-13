import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Bookmark, Bell, Plus, User,
  Share, Twitter, Linkedin, MessageCircle, Copy 
} from 'lucide-react';
import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle';
import { categories } from '@/data/posts';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';
import CommandMenu from './CommandMenu';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [notifications, setNotifications] = useLocalStorage<number>('notifications-count', 3);
  const [bookmarks] = useLocalStorage<Record<string, boolean>>('post-bookmarks', {});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const bookmarksCount = Object.values(bookmarks).filter(Boolean).length;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      toast.success(`Searching for "${searchQuery.trim()}"`);
      setSearchQuery('');
      setShowSearch(false);
      setIsOpen(false);
    }
  };

  const clearNotifications = () => {
    setNotifications(0);
    toast.success('All notifications cleared');
  };
  
  const shareWebsite = () => {
    const shareMenuItems = [
      { icon: <Twitter size={16} />, name: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?text=Check out this amazing blog&url=${window.location.href}`, '_blank') },
      { icon: <Linkedin size={16} />, name: 'LinkedIn', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank') },
      { icon: <MessageCircle size={16} />, name: 'WhatsApp', action: () => window.open(`https://wa.me/?text=Check out this amazing blog: ${window.location.href}`, '_blank') },
    ];
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share size={20} className="text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border border-border bg-card/95 backdrop-blur-sm">
          <DropdownMenuLabel className="font-poppins">Share</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {shareMenuItems.map((item, index) => (
            <DropdownMenuItem key={index} onClick={item.action} className="cursor-pointer font-poppins">
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link copied to clipboard!');
            }}
            className="cursor-pointer font-poppins"
          >
            <Copy size={16} className="mr-2" />
            Copy link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <CommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
      
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-card/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img 
                src="/logo2.png" 
                alt="Website logo" 
                className='h-12 w-12 md:h-16 md:w-16 object-contain transition-transform hover:scale-105'
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="nav-item nav-link font-poppins text-base px-2 py-1"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <AnimatePresence>
                {showSearch ? (
                  <motion.form 
                    onSubmit={handleSearch}
                    className="relative"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-muted/60 px-4 py-2 pr-10 rounded-lg text-sm border border-transparent focus:border-primary focus:outline-none transition-all w-full font-poppins"
                      ref={searchInputRef}
                      onBlur={() => {
                        if (!searchQuery) setShowSearch(false);
                      }}
                    />
                    <motion.button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Search size={16} className="text-muted-foreground" />
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                    aria-label="Search"
                    onClick={() => setShowSearch(true)}
                  >
                    <Search size={20} className="text-foreground" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                aria-label="Bookmarks"
                onClick={() => navigate('/bookmarks')}
              >
                <Bookmark size={20} className="text-foreground" />
                {bookmarksCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: 1, duration: 0.5 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {bookmarksCount}
                  </motion.span>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                aria-label="Notifications"
                onClick={() => navigate('/notifications')}
              >
                <Bell size={20} className="text-foreground" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: 1, duration: 0.5 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>
              
              {shareWebsite()}
              
              <Link to="/new-post">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="font-poppins text-base rounded-lg border border-primary/20 hover-glow px-4"
                >
                  <Plus size={18} className="mr-2" /> New Post
                </Button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                aria-label="Profile"
                onClick={() => navigate('/profile')}
              >
                <User size={20} className="text-foreground" />
              </motion.button>
              
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                onClick={() => setCommandMenuOpen(true)}
              >
                <Search size={20} className="text-foreground" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors relative hover-glow"
                aria-label="Bookmarks"
                onClick={() => navigate('/bookmarks')}
              >
                <Bookmark size={20} className="text-foreground" />
                {bookmarksCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: 1, duration: 0.5 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                  >
                    {bookmarksCount}
                  </motion.span>
                )}
              </motion.button>
              
              <ThemeToggle />
              
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-muted transition-colors hover-glow"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X size={24} className="text-foreground" />
                ) : (
                  <Menu size={24} className="text-foreground" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <form onSubmit={handleSearch} className="flex items-center p-2 rounded-lg bg-muted">
                  <Search size={18} className="text-muted-foreground mr-2" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent w-full outline-none text-foreground font-poppins"
                  />
                </form>

                <nav className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={`/category/${category.id}`}
                        className="block py-2 text-foreground hover:text-primary font-poppins"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categories.length * 0.05 }}
                  >
                    <Link
                      to="/new-post"
                      className="block py-2 text-foreground hover:text-primary font-poppins"
                      onClick={() => setIsOpen(false)}
                    >
                      <Plus size={16} className="inline mr-2" /> Create New Post
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categories.length + 1) * 0.05 }}
                  >
                    <Link
                      to="/bookmarks"
                      className="block py-2 text-foreground hover:text-primary font-poppins"
                      onClick={() => setIsOpen(false)}
                    >
                      <Bookmark size={16} className="inline mr-2" /> Bookmarks
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categories.length + 2) * 0.05 }}
                  >
                    <Link
                      to="/notifications"
                      className="block py-2 text-foreground hover:text-primary font-poppins"
                      onClick={() => setIsOpen(false)}
                    >
                      <Bell size={16} className="inline mr-2" /> Notifications
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categories.length + 3) * 0.05 }}
                  >
                    <Link
                      to="/profile"
                      className="block py-2 text-foreground hover:text-primary font-poppins"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={16} className="inline mr-2" /> My Profile
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
