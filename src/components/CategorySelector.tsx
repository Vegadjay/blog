
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { categories } from '@/data/posts';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySelector: React.FC = () => {
  const { categoryId = 'all' } = useParams<{ categoryId?: string }>();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 hidden md:block"
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-md bg-card hover:bg-muted" 
          onClick={scrollLeft}
        >
          <ChevronLeft size={18} />
        </Button>
      </motion.div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-3 py-3 px-1 -mx-1 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="snap-start flex-shrink-0"
          >
            <Link to={`/category/${category.id}`}>
              <motion.button
                className={`px-5 py-2.5 rounded-full border text-sm font-poppins transition-all duration-300 shadow-sm ${
                  categoryId === category.id
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-transparent text-foreground border-border hover:border-primary hover:shadow'
                }`}
                whileHover={{ y: -3, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 hidden md:block"
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full shadow-md bg-card hover:bg-muted" 
          onClick={scrollRight}
        >
          <ChevronRight size={18} />
        </Button>
      </motion.div>
    </div>
  );
};

export default CategorySelector;
