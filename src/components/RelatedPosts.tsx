
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Post } from '@/data/posts';
import { formatDate } from '@/lib/utils';

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-mono font-bold mb-6">Related Posts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="group bg-card rounded-lg border border-border overflow-hidden card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link to={`/post/${post.id}`} className="block">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-mono font-bold mb-2 line-clamp-2">{post.title}</h3>
                
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
