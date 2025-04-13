
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Camera, Upload, X, CornerRightDown, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Toggle } from '@/components/ui/toggle';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories, addNewPost } from '@/data/posts';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCoverImage(result);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Please enter a title for your post');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Please enter content for your post');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category for your post');
      return;
    }
    
    if (!coverImage) {
      toast.error('Please upload a cover image for your post');
      return;
    }
    
    // Start publishing
    setIsPublishing(true);
    
    // Generate a URL-friendly ID based on the title
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    try {
      // Create a new post object
      const newPost = addNewPost({
        id,
        title,
        excerpt: excerpt || `${content.substring(0, 120)}...`,
        content,
        category,
        coverImage,
        featured: isFeatured
      });
      
      // Show success toast after short delay
      setTimeout(() => {
        toast.success('Post published successfully!');
        setIsPublishing(false);
        navigate(`/post/${newPost.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post. Please try again.');
      setIsPublishing(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-poppins mb-2">Create New Post</h1>
              <p className="text-muted-foreground font-poppins">Share your thoughts, ideas, and stories with the world</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item} className="mb-6">
                  <label className="block text-foreground font-medium mb-2 font-poppins">Post Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a compelling title"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all font-poppins"
                    required
                  />
                </motion.div>
                
                <motion.div variants={item} className="mb-6">
                  <label className="block text-foreground font-medium mb-2 font-poppins">Short Excerpt</label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description for your post (appears in cards)"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all font-poppins"
                  />
                </motion.div>
                
                <motion.div variants={item} className="mb-6">
                  <label className="block text-foreground font-medium mb-2 font-poppins">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((cat) => (
                      <Toggle
                        key={cat.id}
                        pressed={category === cat.id}
                        onPressedChange={() => setCategory(cat.id)}
                        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary border border-border font-poppins"
                      >
                        <Hash size={14} className="mr-1" /> {cat.name}
                      </Toggle>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="mb-6">
                  <label className="block text-foreground font-medium mb-2 font-poppins">Cover Image</label>
                  {!coverImage ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Camera size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4 font-poppins">Drag and drop an image, or click to browse</p>
                      <Button type="button" variant="outline" className="relative font-poppins">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload size={16} className="mr-2" /> Choose Image
                      </Button>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden">
                      <img src={coverImage} alt="Cover" className="w-full h-64 object-cover" />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-background/80 p-2 rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </motion.div>
                
                <motion.div variants={item} className="mb-6">
                  <label className="block text-foreground font-medium mb-2 font-poppins">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:ring-2 focus:ring-primary focus:border-primary transition-all min-h-[300px] font-poppins"
                    required
                  />
                  <div className="text-right mt-2">
                    <span className="text-sm text-muted-foreground font-poppins">
                      {content.length} characters
                    </span>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={isFeatured}
                      onCheckedChange={setIsFeatured}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium cursor-pointer font-poppins"
                    >
                      Feature this post
                    </label>
                  </div>
                  
                  <HoverCard>
                    <HoverCardTrigger>
                      <CornerRightDown size={16} className="text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="font-poppins text-sm">
                      Featured posts appear more prominently on the homepage and may receive more views.
                    </HoverCardContent>
                  </HoverCard>
                </motion.div>
                
                <motion.div variants={item} className="flex justify-end mt-8 space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="font-poppins border-border"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isPublishing}
                    className="font-poppins hover-glow"
                  >
                    {isPublishing ? 'Publishing...' : 'Publish Post'}
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewPost;
