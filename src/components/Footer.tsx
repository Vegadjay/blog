
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Mail, Github, Twitter, Linkedin, Instagram, Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Categories',
      links: [
        { name: 'Technology', href: '/category/technology' },
        { name: 'Design', href: '/category/design' },
        { name: 'Travel', href: '/category/travel' },
        { name: 'Food', href: '/category/food' },
        { name: 'Lifestyle', href: '/category/lifestyle' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Use', href: '#' },
      ],
    },
    {
      title: 'Follow Us',
      links: [
        { name: 'Twitter', href: 'https://x.com/JAY_VEGAD_', icon: <Twitter size={16} className="mr-2" /> },
        { name: 'GitHub', href: 'https://github.com/vegadjay', icon: <Github size={16} className="mr-2" /> },
        { name: 'LinkedIn', href: 'https://linkedin.com/u/vegadjay', icon: <Linkedin size={16} className="mr-2" /> },
        { name: 'Instagram', href: '#', icon: <Instagram size={16} className="mr-2" /> },
      ],
    },
  ];

  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold font-mono">C</span>
              </div>
              <span className="text-xl font-bold font-poppins">CrimsonBlog</span>
            </Link>
            
            <p className="text-muted-foreground mt-4 text-sm font-poppins">
              A modern blog for sharing ideas, stories, and insights on technology, 
              design, travel, and more.
            </p>
            
            <div className="flex space-x-3 mt-6">
              <a 
                href="https://x.com/JAY_VEGAD_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://github.com/vegadjay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://linkedin.com/u/vegadjay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={column.title}>
              <h3 className="text-base font-semibold mb-4 font-poppins">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <a 
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center font-poppins text-sm"
                    >
                      {link.icon && link.icon}
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <form className="max-w-md mx-auto">
            <h4 className="text-lg font-semibold mb-4 text-center font-poppins">Subscribe to our newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-2 rounded-l-lg border border-border bg-card focus:outline-none focus:ring-1 focus:ring-primary font-poppins"
                required
              />
              <Button className="rounded-r-lg font-poppins">
                Subscribe <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p className="font-poppins">
              © {new Date().getFullYear()} CrimsonBlog. All rights reserved.
            </p>
            <p className="mt-2 flex items-center justify-center font-poppins">
              Made with <Heart size={14} className="mx-1 text-primary" /> by 
              <a 
                href="https://github.com/vegadjay" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-primary hover:underline"
              >
                JAY VEGAD
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
