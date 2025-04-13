
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User, Mail, Calendar, MapPin, BookOpen,
  Edit, Settings, LogOut, Github, Twitter, Linkedin, Instagram, Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { shuffledPosts } from '@/data/posts';
import PostCard from '@/components/PostCard';

const ProfilePage = () => {
  const userPosts = shuffledPosts.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="h-48 md:h-64 rounded-xl overflow-hidden mb-16 md:mb-24"
              >
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 md:-bottom-20"
              >
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/112025350" alt="JAY VEGAD" />
                  <AvatarFallback>JV</AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Edit Profile Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-4 right-4"
              >
                <Button variant="outline" size="sm" className="bg-background/70 backdrop-blur-sm">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </motion.div>
            </div>

            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold font-poppins mb-2">JAY VEGAD</h1>
              <p className="text-muted-foreground font-poppins mb-4">Web Developer & Designer</p>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Badge variant="outline" className="flex items-center">
                  <User className="h-3 w-3 mr-1" /> @jayVegad
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

              <p className="max-w-xl mx-auto text-sm text-muted-foreground font-poppins mb-6">
                Frontend developer passionate about creating engaging user experiences.
                Loves building with React, Tailwind and exploring new technologies.
                When not coding, you'll find me reading or exploring the outdoors.
              </p>

              <div className="flex justify-center space-x-3 mb-6">
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

              <div className="flex justify-center space-x-4">
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
            </motion.div>

            <Separator className="mb-8" />

            {/* Tabs for Posts, Bookmarks, etc. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
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
                    <Button asChild>
                      <Link to="/bookmarks">View Bookmarks</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="drafts">
                  <div className="text-center py-12">
                    <Edit className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold font-poppins mb-2">No Drafts Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6 font-poppins">
                      Start writing and save drafts to continue later
                    </p>
                    <Button asChild>
                      <Link to="/new-post">Create New Post</Link>
                    </Button>
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
                            <User className="mr-2 h-4 w-4" />
                            Edit Profile
                          </Button>
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
                          <Button variant="outline" className="w-full justify-start text-destructive font-poppins">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
