import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Download, Twitter, Linkedin, Copy } from 'lucide-react';
import { getPostById, getRelatedPosts } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';
import RelatedPosts from '@/components/RelatedPosts';
import Footer from '@/components/Footer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(postId ? getPostById(postId) : undefined);
  const [relatedPosts, setRelatedPosts] = useState(post ? getRelatedPosts(post) : []);
  const [likes, setLikes] = useLocalStorage<Record<string, boolean>>('post-likes', {});
  const [bookmarks, setBookmarks] = useLocalStorage<Record<string, boolean>>('post-bookmarks', {});
  
  const isLiked = post && likes[post.id] || false;
  const isBookmarked = post && bookmarks[post.id] || false;
  
  useEffect(() => {
    if (!postId) {
      navigate('/');
      return;
    }
    
    const fetchedPost = getPostById(postId);
    if (!fetchedPost) {
      navigate('/404');
      return;
    }
    
    setPost(fetchedPost);
    setRelatedPosts(getRelatedPosts(fetchedPost));
    window.scrollTo(0, 0);
  }, [postId, navigate]);
  
  const toggleLike = () => {
    if (!post) return;
    
    const newLikes = { ...likes };
    newLikes[post.id] = !isLiked;
    setLikes(newLikes);
    
    if (!isLiked) {
      toast.success('Post liked!');
    }
  };
  
  const toggleBookmark = () => {
    if (!post) return;
    
    const newBookmarks = { ...bookmarks };
    newBookmarks[post.id] = !isBookmarked;
    setBookmarks(newBookmarks);
    
    if (!isBookmarked) {
      toast.success('Post bookmarked!');
    } else {
      toast.info('Post removed from bookmarks');
    }
  };
  
  const handleShare = () => {
    // This is now handled with the dropdown menu
  };
  
  const handleShareVia = (platform: string) => {
    if (!post) return;
    
    const shareUrl = window.location.href;
    const shareTitle = post.title;
    const shareText = post.excerpt;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        toast.success('Shared on Twitter!');
        break;
        
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        toast.success('Shared on LinkedIn!');
        break;
        
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
        toast.success('Shared on WhatsApp!');
        break;
        
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
          .then(() => toast.success('Link copied to clipboard!'))
          .catch(() => toast.error('Failed to copy link'));
        break;
        
      default:
        if (navigator.share) {
          navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl,
          })
          .then(() => toast.success('Shared successfully!'))
          .catch((error) => console.error('Error sharing:', error));
        } else {
          navigator.clipboard.writeText(shareUrl)
            .then(() => toast.success('Link copied to clipboard!'))
            .catch(() => toast.error('Failed to copy link'));
        }
    }
  };
  
  const handleDownload = () => {
    if (!post) return;
    
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
  
  const handleCommentAdded = (newComment: any) => {
    if (!post) return;
    
    const updatedPost = {
      ...post,
      comments: [newComment, ...post.comments],
    };
    
    setPost(updatedPost);
  };
  
  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 font-poppins"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold font-poppins mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center text-muted-foreground mb-6 font-poppins">
              <div className="flex items-center mr-6 mb-2">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span>{post.author.name}</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-2">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <Link 
                  to={`/category/${post.category}`}
                  className="text-primary hover:underline"
                >
                  {post.category}
                </Link>
              </div>
            </div>
          </div>
          
          <motion.div
            className="rounded-xl overflow-hidden mb-8 h-96 md:h-[500px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="prose prose-lg dark:prose-invert max-w-none mb-10 font-poppins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-between border-t border-b border-border py-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex space-x-6">
              <button 
                onClick={toggleLike}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors font-poppins"
                aria-label={isLiked ? "Unlike post" : "Like post"}
              >
                <Heart 
                  size={20} 
                  className={`mr-2 ${isLiked ? 'fill-primary text-primary' : ''}`} 
                />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button 
                className="flex items-center text-muted-foreground hover:text-primary transition-colors font-poppins"
                aria-label="View comments"
                onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle size={20} className="mr-2" />
                <span>{post.comments.length}</span>
              </button>
            </div>
            
            <div className="flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button 
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors font-poppins"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Share post"
                  >
                    <Share2 size={20} className="mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Share this post</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleShareVia('twitter')} className="cursor-pointer">
                    <Twitter className="mr-2 h-4 w-4" /> Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShareVia('linkedin')} className="cursor-pointer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShareVia('whatsapp')} className="cursor-pointer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleShareVia('copy')} className="cursor-pointer">
                    <Copy className="mr-2 h-4 w-4" /> Copy link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <motion.button 
                onClick={toggleBookmark}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors font-poppins"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
              >
                <Bookmark 
                  size={20} 
                  className={`mr-2 ${isBookmarked ? 'fill-primary text-primary' : ''}`} 
                />
                <span className="hidden sm:inline">Bookmark</span>
              </motion.button>
              
              <motion.button 
                onClick={handleDownload}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors font-poppins"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download post"
              >
                <Download size={20} className="mr-2" />
                <span className="hidden sm:inline">Download</span>
              </motion.button>
            </div>
          </motion.div>
          
          <div id="comments" className="mb-16">
            <h2 className="text-2xl font-poppins font-bold mb-6">Comments ({post.comments.length})</h2>
            
            <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
            
            <CommentList comments={post.comments} />
          </div>
          
          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostPage;
