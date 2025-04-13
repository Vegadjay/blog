
import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-poppins">
      <motion.div 
        className="max-w-md w-full text-center bg-card p-8 rounded-2xl shadow-lg border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-block"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Frown size={80} className="mx-auto text-primary opacity-80" />
          </motion.div>
        </motion.div>
        
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-bold mb-4 font-poppins text-primary"
          >
            404
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-foreground mb-6 font-poppins"
          >
            Oops! We couldn't find the page you're looking for.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <p className="text-muted-foreground mb-8 font-poppins">
              The page at <span className="font-mono bg-muted px-2 py-1 rounded">{location.pathname}</span> doesn't exist.
            </p>
            
            <Link to="/">
              <Button 
                variant="default" 
                size="lg" 
                className="font-poppins hover-glow group"
              >
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Return to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
