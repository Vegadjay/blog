
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Post, posts } from '@/data/posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Bookmark, X } from 'lucide-react';
import { toast } from 'sonner';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useLocalStorage<Record<string, boolean>>('post-bookmarks', {});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Get all bookmarked posts
    const bookmarkedIds = Object.entries(bookmarks)
      .filter(([_, isBookmarked]) => isBookmarked)
      .map(([id]) => id);
    
    const filteredPosts = posts.filter(post => bookmarkedIds.includes(post.id));
    setBookmarkedPosts(filteredPosts);
  }, [bookmarks]);
  
  const removeBookmark = (postId: string) => {
    const newBookmarks = { ...bookmarks };
    newBookmarks[postId] = false;
    setBookmarks(newBookmarks);
    toast.success('Post removed from bookmarks');
  };
  
  const clearAllBookmarks = () => {
    setBookmarks({});
    toast.success('All bookmarks cleared');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold font-poppins flex items-center">
                <Bookmark className="mr-2" /> Your Bookmarks
              </h1>
              <p className="text-muted-foreground mt-2 font-poppins">
                Posts you've saved for later
              </p>
            </motion.div>
            
            {bookmarkedPosts.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-muted-foreground hover:text-primary flex items-center font-poppins"
                onClick={clearAllBookmarks}
              >
                <X className="w-4 h-4 mr-1" /> Clear all
              </motion.button>
            )}
          </div>
          
          {bookmarkedPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Bookmark className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2 font-poppins">No bookmarks yet</h2>
              <p className="text-muted-foreground max-w-md mx-auto font-poppins">
                When you bookmark posts, they'll appear here for easy access.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <PostCard post={post} index={index} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBookmark(post.id);
                    }}
                    className="absolute top-2 right-2 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove bookmark"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookmarksPage;
