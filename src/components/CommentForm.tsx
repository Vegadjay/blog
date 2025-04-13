
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CommentFormProps {
  postId: string;
  onCommentAdded: (comment: any) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const newComment = {
        id: `comment-${Math.random().toString(36).substring(2, 11)}`,
        author: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
        },
        content: comment,
        date: new Date().toISOString(),
        likes: 0,
      };
      
      onCommentAdded(newComment);
      setComment('');
      setIsSubmitting(false);
      toast.success('Comment added');
    }, 500);
  };

  return (
    <motion.div
      className="bg-card rounded-lg border border-border p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-mono font-bold mb-4">Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            rows={4}
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
        </div>
        <motion.button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg font-mono hover:bg-primary/90 transition-colors flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
          ) : null}
          Submit Comment
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CommentForm;
