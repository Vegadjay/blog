
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Comment } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [commentLikes, setCommentLikes] = useLocalStorage<Record<string, boolean>>('comment-likes', {});

  const toggleLike = (commentId: string) => {
    const newLikes = { ...commentLikes };
    newLikes[commentId] = !newLikes[commentId];
    setCommentLikes(newLikes);
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {comments.map((comment, index) => (
        <motion.div
          key={comment.id}
          className="bg-card rounded-lg border border-border p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <div className="flex items-start">
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{comment.author.name}</h4>
                <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
              </div>
              
              <p className="my-2">{comment.content}</p>
              
              <button
                className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
                onClick={() => toggleLike(comment.id)}
              >
                <Heart
                  size={14}
                  className={`mr-1 ${commentLikes[comment.id] ? 'fill-primary text-primary' : ''}`}
                />
                <span>{comment.likes + (commentLikes[comment.id] ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CommentList;
