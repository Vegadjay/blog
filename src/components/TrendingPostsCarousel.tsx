
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { Post } from '@/data/posts';

interface TrendingPostsCarouselProps {
  posts: Post[];
}

const TrendingPostsCarousel: React.FC<TrendingPostsCarouselProps> = ({ posts }) => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <TrendingUp size={20} className="text-primary mr-2" />
          <h2 className="text-2xl font-bold font-poppins">Trending Posts</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/category/all?sort=trending" 
            className="text-muted-foreground hover:text-primary flex items-center group transition-colors font-poppins"
          >
            <span className="mr-1">View all</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {posts.map((post, index) => (
            <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link to={`/post/${post.id}`} className="block h-full">
                  <div className="bg-card rounded-xl overflow-hidden shadow-md h-full flex flex-col card-hover border border-border">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs font-poppins rounded-full px-2 py-1 flex items-center">
                        <TrendingUp size={12} className="mr-1" />
                        Trending
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <div className="mb-2">
                          <span className="text-xs font-poppins text-primary uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 font-poppins">{post.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 font-poppins">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                        <div className="flex items-center">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name} 
                            className="w-8 h-8 rounded-full object-cover border border-border mr-2"
                          />
                          <span className="text-xs text-muted-foreground font-poppins">{formatDate(post.date)}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-poppins">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-4 bg-card border border-border hover:bg-primary hover:text-white transition-colors" />
          <CarouselNext className="-right-4 bg-card border border-border hover:bg-primary hover:text-white transition-colors" />
        </div>
      </Carousel>
    </div>
  );
};

export default TrendingPostsCarousel;
