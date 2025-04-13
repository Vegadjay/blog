
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/data/posts';
import { formatDate } from '@/lib/utils';

interface FeaturedPostProps {
  post: Post;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden h-96 md:h-[500px] group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link 
            to={`/category/${post.category}`}
            className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-mono mb-4 hover:bg-primary/90 transition-colors"
          >
            {post.category}
          </Link>
        </motion.div>
        
        <motion.h1 
          className="text-2xl md:text-4xl font-bold font-mono text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {post.title}
        </motion.h1>
        
        <motion.p 
          className="text-white/80 mb-6 line-clamp-2 md:max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {post.excerpt}
        </motion.p>
        
        <motion.div 
          className="flex items-center justify-between"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/50 mr-3"
            />
            <div>
              <div className="text-white font-medium">{post.author.name}</div>
              <div className="text-white/70 text-sm">{formatDate(post.date)} • {post.readTime}</div>
            </div>
          </div>
          
          <Link 
            to={`/post/${post.id}`}
            className="flex items-center text-white font-mono group"
          >
            <span className="mr-2 group-hover:mr-3 transition-all">Read More</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost;
