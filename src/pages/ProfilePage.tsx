import React from 'react';
import {
  User, Mail, Calendar, MapPin, BookOpen,
  Edit, Settings, LogOut, Github, Twitter, Linkedin, Instagram, Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const Avatar = ({ className, children }) => <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>;
const Button = ({ children, variant = "default", size = "default", className = "", onClick, asChild, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm"
  };
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
    });
  }
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className, activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ value, children, className, activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50'
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, className, activeTab }) => (
  <div className={`${activeTab === value ? 'block' : 'hidden'} mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
    {children}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Separator = ({ orientation = "horizontal", className = "" }) => (
  <div className={`shrink-0 bg-border ${orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"} ${className}`} />
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground"
  };
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Mock PostCard component
const PostCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
  >
    <h3 className="font-semibold mb-2">{post.title}</h3>
    <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <span>{post.date}</span>
      <span>{post.readTime} min read</span>
    </div>
  </motion.div>
);

// Mock data
const userPosts = [
  { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React development", date: "Dec 15", readTime: 5 },
  { id: 2, title: "Advanced TypeScript Tips", excerpt: "Level up your TypeScript skills", date: "Dec 10", readTime: 8 },
  { id: 3, title: "CSS Grid Mastery", excerpt: "Master CSS Grid layouts", date: "Dec 5", readTime: 6 },
  { id: 4, title: "Node.js Best Practices", excerpt: "Write better Node.js applications", date: "Nov 28", readTime: 10 },
  { id: 5, title: "React Performance", excerpt: "Optimize your React apps", date: "Nov 20", readTime: 7 },
  { id: 6, title: "Modern JavaScript", excerpt: "ES2024 features overview", date: "Nov 15", readTime: 9 }
];

const toast = {
  success: (message) => console.log('Success:', message)
};

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground mt-10">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Banner and Profile Section */}
          <div className="relative">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="h-48 md:h-64 rounded-xl overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Profile Image - Positioned to overlap banner */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-8 -bottom-16 z-10"
            >
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <img 
                  src="https://jayvegad.xyz/main/main-logo.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </Avatar>
            </motion.div>
          </div>

          {/* Profile Info - Proper spacing from banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold font-poppins mb-2">Jay Vegad</h1>
                <p className="text-muted-foreground font-poppins mb-4">Web Developer & Designer</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="outline" className="flex items-center">
                <User className="h-3 w-3 mr-1" /> @jayvegad
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <Mail className="h-3 w-3 mr-1" /> hello@jayvegad.com
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" /> India
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" /> Joined April 2023
              </Badge>
            </div>

            <p className="max-w-2xl text-sm text-muted-foreground font-poppins mb-6">
              Frontend developer passionate about creating engaging user experiences.
              Loves building with React, Tailwind and exploring new technologies.
              When not coding, you'll find me reading or exploring the outdoors.
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex space-x-3">
                <a
                  href="https://github.com/vegadjay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/JAY_VEGAD_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/u/vegadjay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              <div className="flex space-x-6">
                <div className="text-center">
                  <p className="text-xl font-bold font-poppins">42</p>
                  <p className="text-xs text-muted-foreground font-poppins">Posts</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-xl font-bold font-poppins">1.2k</p>
                  <p className="text-xs text-muted-foreground font-poppins">Followers</p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <p className="text-xl font-bold font-poppins">357</p>
                  <p className="text-xs text-muted-foreground font-poppins">Following</p>
                </div>
              </div>
            </div>
          </motion.div>

          <Separator className="mb-8" />

          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8 w-full">
                <TabsTrigger value="posts" className="font-poppins">Posts</TabsTrigger>
                <TabsTrigger value="bookmarks" className="font-poppins">Bookmarks</TabsTrigger>
                <TabsTrigger value="drafts" className="font-poppins">Drafts</TabsTrigger>
                <TabsTrigger value="settings" className="font-poppins">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userPosts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button>Load More</Button>
                </div>
              </TabsContent>

              <TabsContent value="bookmarks">
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold font-poppins mb-2">Your Bookmarks</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6 font-poppins">
                    View all your saved posts in one place
                  </p>
                  <Button>View Bookmarks</Button>
                </div>
              </TabsContent>

              <TabsContent value="drafts">
                <div className="text-center py-12">
                  <Edit className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold font-poppins mb-2">No Drafts Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6 font-poppins">
                    Start writing and save drafts to continue later
                  </p>
                  <Button>Create New Post</Button>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins">Account Settings</CardTitle>
                    <CardDescription className="font-poppins">
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium font-poppins">Personal Information</h3>
                        <Button variant="outline" className="w-full justify-start font-poppins">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start font-poppins">
                          <Settings className="mr-2 h-4 w-4" />
                          Site Preferences
                        </Button>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium font-poppins">Account Management</h3>
                        <Button variant="outline" className="w-full justify-start text-red-600 font-poppins">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                        <Button variant="outline" className="w-full justify-start font-poppins">
                          <Download className="mr-2 h-4 w-4" />
                          Download Your Data
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full font-poppins"
                      onClick={() => toast.success('Settings saved successfully')}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
