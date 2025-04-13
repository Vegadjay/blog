
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Download } from 'lucide-react';
import { Post } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
  index?: number;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, index = 0, featured = false }) => {
  const [likes, setLikes] = useLocalStorage<Record<string, boolean>>('post-likes', {});
  const [bookmarks, setBookmarks] = useLocalStorage<Record<string, boolean>>('post-bookmarks', {});
  
  const isLiked = likes[post.id] || false;
  const isBookmarked = bookmarks[post.id] || false;

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newLikes = { ...likes };
    newLikes[post.id] = !isLiked;
    setLikes(newLikes);
    
    if (!isLiked) {
      toast.success('Post liked!');
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newBookmarks = { ...bookmarks };
    newBookmarks[post.id] = !isBookmarked;
    setBookmarks(newBookmarks);
    
    if (!isBookmarked) {
      toast.success('Post bookmarked!');
    } else {
      toast.info('Post removed from bookmarks');
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.origin + '/post/' + post.id,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.origin + '/post/' + post.id)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a text file with the post content
    const element = document.createElement('a');
    const file = new Blob([
      `# ${post.title}\n\n` +
      `By ${post.author.name} on ${formatDate(post.date)}\n\n` +
      post.content
    ], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = `${post.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Post downloaded as text file!');
  };

  return (
    <motion.article
      className={`group overflow-hidden ${
        featured 
          ? 'col-span-full md:col-span-2 md:row-span-2 bg-card rounded-xl shadow-md border border-border' 
          : 'bg-card rounded-xl shadow-sm border border-border'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link to={`/post/${post.id}`} className="block h-full">
        <div className={featured ? 'md:flex h-full' : ''}>
          <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'h-48'}`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-poppins">
              {post.category}
            </div>
          </div>
          
          <div className={`p-5 ${featured ? 'md:w-1/2 md:p-6 flex flex-col justify-between' : ''}`}>
            <div>
              <div className="flex items-center mb-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                  <span className="font-poppins">{post.author.name}</span>
                </div>
                <span className="mx-2">•</span>
                <span className="font-poppins">{formatDate(post.date)}</span>
                <span className="mx-2">•</span>
                <span className="font-poppins">{post.readTime}</span>
              </div>
              
              <h2 className={`font-poppins font-bold ${featured ? 'text-2xl mb-4' : 'text-lg mb-2'}`}>
                {post.title}
              </h2>
              
              <p className="text-muted-foreground line-clamp-2 mb-4 font-poppins">
                {post.excerpt}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex space-x-4">
                <button 
                  onClick={toggleLike}
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Like post"
                >
                  <Heart 
                    size={16} 
                    className={`mr-1 ${isLiked ? 'fill-primary text-primary' : ''}`} 
                  />
                  <span className="font-poppins">{post.likes + (isLiked ? 1 : 0)}</span>
                </button>
                
                <button 
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View comments"
                >
                  <MessageCircle size={16} className="mr-1" />
                  <span className="font-poppins">{post.comments.length}</span>
                </button>
              </div>
              
              <div className="flex space-x-2">
                <motion.button 
                  onClick={handleShare}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Share post"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={16} className="text-muted-foreground" />
                </motion.button>
                
                <motion.button 
                  onClick={toggleBookmark}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bookmark 
                    size={16} 
                    className={`${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                  />
                </motion.button>
                
                <motion.button 
                  onClick={handleDownload}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Download post"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download size={16} className="text-muted-foreground" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
