import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, TrendingUp, Clock, Flame } from 'lucide-react';
import { featuredPosts, recentPosts, shuffledPosts } from '@/data/posts';
import Navbar from '@/components/Navbar';
import FeaturedPost from '@/components/FeaturedPost';
import PostCard from '@/components/PostCard';
import CategorySelector from '@/components/CategorySelector';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import TrendingPostsCarousel from '@/components/TrendingPostsCarousel';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

const Index = () => {
  // Use the first featured post for the hero section, or fall back to the first post
  const heroPost = featuredPosts[0] || shuffledPosts[0];
  
  // Get the remaining featured posts
  const remainingFeatured = featuredPosts.slice(1, 4);
  
  // Get trending posts (we'll use a selection of shuffled posts)
  const trendingPosts = shuffledPosts.slice(0, 6);
  
  // State for post filter
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(recentPosts);

  // Track if we've shown the localStorage toast
  const [hasShownStorageToast, setHasShownStorageToast] = useLocalStorage('has-shown-storage-toast', false);
  const [hasShownShortcutToast, setHasShownShortcutToast] = useLocalStorage('shortcut-toast-shown', false);
  
  // Filter posts when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredPosts(recentPosts);
    } else if (activeFilter === 'trending') {
      setFilteredPosts(trendingPosts);
    } else if (activeFilter === 'featured') {
      setFilteredPosts([...featuredPosts]);
    }
  }, [activeFilter]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Show localStorage toast if not shown before
    if (!hasShownStorageToast) {
      setTimeout(() => {
        toast.info(
          "Your preferences, bookmarks, and notifications are stored in your browser's local storage.",
          {
            duration: 6000,
            position: 'bottom-center',
          }
        );
        setHasShownStorageToast(true);
      }, 1500);
    }

    // Show keyboard shortcut toast if not shown before
    if (!hasShownShortcutToast) {
      setTimeout(() => {
        toast.message(
          "Press Ctrl+K (or ⌘+K) to open command menu for quick navigation",
          {
            duration: 8000,
            position: 'bottom-center',
            icon: '⌨️',
            action: {
              label: 'Try it',
              onClick: () => setCommandMenuOpen(true)
            }
          }
        );
        setHasShownShortcutToast(true);
      }, 3000);
    }
  }, [hasShownStorageToast, setHasShownStorageToast, hasShownShortcutToast, setHasShownShortcutToast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        {heroPost && (
          <section className="container mx-auto px-4 mb-8 md:mb-16 mt-4 md:mt-0">
            <FeaturedPost post={heroPost} />
          </section>
        )}
        
        {/* Create New Post Banner */}
        <section className="container mx-auto px-4 mb-8 md:mb-12">
          <motion.div 
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold font-poppins mb-1 md:mb-2">Share Your Story</h3>
              <p className="text-muted-foreground text-sm md:text-base font-poppins">Have something interesting to share? Create a new post now!</p>
            </div>
            
            <Link to="/new-post">
              <Button className="font-poppins hover-glow border border-primary/20 w-full md:w-auto">
                <Plus size={18} className="mr-2" /> Create New Post
              </Button>
            </Link>
          </motion.div>
        </section>
        
        {/* Categories */}
        <section className="container mx-auto px-4 mb-8 md:mb-12">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <motion.h2 
              className="text-xl md:text-2xl font-bold font-poppins"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Browse by Category
            </motion.h2>
          </div>
          
          <CategorySelector />
        </section>
        
        {/* Trending Posts Carousel */}
        <section className="container mx-auto px-4 mb-8 md:mb-12">
          <TrendingPostsCarousel posts={trendingPosts} />
        </section>
        
        {/* Featured Posts Grid */}
        {remainingFeatured.length > 0 && (
          <section className="container mx-auto px-4 mb-8 md:mb-16">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <motion.h2 
                className="text-xl md:text-2xl font-bold font-poppins"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Featured Posts
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  to="/category/all" 
                  className="text-muted-foreground hover:text-primary flex items-center group transition-colors font-poppins"
                >
                  <span className="mr-1">View all</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {remainingFeatured.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </section>
        )}
        
        {/* Recent Posts with Filter */}
        <section className="container mx-auto px-4 mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-3 md:space-y-0">
            <motion.h2 
              className="text-xl md:text-2xl font-bold font-poppins"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Recent Posts
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-2 overflow-x-auto scrollbar-none pb-2"
            >
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('all')}
                className="font-poppins"
              >
                <Clock size={14} className="mr-1" /> All
              </Button>
              <Button 
                variant={activeFilter === 'trending' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('trending')}
                className="font-poppins"
              >
                <TrendingUp size={14} className="mr-1" /> Trending
              </Button>
              <Button 
                variant={activeFilter === 'featured' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveFilter('featured')}
                className="font-poppins"
              >
                <Flame size={14} className="mr-1" /> Featured
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/category/all">
              <Button variant="outline" className="font-poppins">
                View All Posts <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </section>
        
        {/* Newsletter */}
        <section className="container mx-auto px-4 mb-8 md:mb-16">
          <motion.div 
            className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ boxShadow: "0 0 15px rgba(220, 20, 60, 0.2)" }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-3xl font-bold font-poppins mb-3 md:mb-4">
                Stay updated with our newsletter
              </h2>
              
              <p className="text-muted-foreground mb-6 md:mb-8 font-poppins text-sm md:text-base">
                Get the latest articles, resources, and updates directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all font-poppins"
                  required
                />
                
                <motion.button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-poppins hover:bg-primary/90 transition-colors border border-primary/20 hover-glow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
              
              <p className="text-xs text-muted-foreground mt-4 font-poppins">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
