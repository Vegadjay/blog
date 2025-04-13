
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPostsByCategory } from '@/data/posts';
import Navbar from '@/components/Navbar';
import CategorySelector from '@/components/CategorySelector';
import PostCard from '@/components/PostCard';
import Footer from '@/components/Footer';

const CategoryPage = () => {
  const { categoryId = 'all' } = useParams<{ categoryId?: string }>();
  const [posts, setPosts] = useState(getPostsByCategory(categoryId));
  
  // Update posts when category changes
  useEffect(() => {
    setPosts(getPostsByCategory(categoryId));
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold font-mono mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoryId === 'all' ? 'All Posts' : categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
          </motion.h1>
          
          <div className="mb-10">
            <CategorySelector />
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={categoryId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <h3 className="text-xl font-mono font-bold mb-2">No posts found</h3>
                    <p className="text-muted-foreground">
                      There are no posts in this category yet. Check back later!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
