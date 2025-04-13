
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bell, Check, X, ThumbsUp, MessageSquare, User, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  date: string;
  read: boolean;
  user?: {
    name: string;
    avatar: string;
  };
  postId?: string;
}

// Generate mock notifications
const generateMockNotifications = (): Notification[] => {
  const notifications: Notification[] = [];
  
  const mockUsers = [
    { name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Maya Patel', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'Daniel Kim', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { name: 'Sarah Williams', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { name: 'Liu Wei', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
  ];
  
  const mockPosts = ['the-future-of-web-development', 'minimalist-living-guide', 'italian-pasta-secrets', 'exploring-bali'];
  
  // Like notifications
  for (let i = 0; i < 3; i++) {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const postId = mockPosts[Math.floor(Math.random() * mockPosts.length)];
    
    notifications.push({
      id: `like-${i}`,
      type: 'like',
      message: `${user.name} liked your post`,
      date: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(), // Random time within the last week
      read: Math.random() > 0.5,
      user,
      postId
    });
  }
  
  // Comment notifications
  for (let i = 0; i < 3; i++) {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const postId = mockPosts[Math.floor(Math.random() * mockPosts.length)];
    
    notifications.push({
      id: `comment-${i}`,
      type: 'comment',
      message: `${user.name} commented on your post`,
      date: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toISOString(),
      read: Math.random() > 0.7,
      user,
      postId
    });
  }
  
  // Follow notifications
  for (let i = 0; i < 2; i++) {
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    
    notifications.push({
      id: `follow-${i}`,
      type: 'follow',
      message: `${user.name} started following you`,
      date: new Date(Date.now() - Math.floor(Math.random() * 1209600000)).toISOString(), // Random time within the last two weeks
      read: Math.random() > 0.3,
      user
    });
  }
  
  // System notifications
  notifications.push({
    id: 'system-1',
    type: 'system',
    message: 'Welcome to CrimsonBlog! Complete your profile to get started.',
    date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    read: true
  });
  
  notifications.push({
    id: 'system-2',
    type: 'system',
    message: 'Your post has been featured on the homepage!',
    date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    read: false
  });
  
  // Sort by date (newest first)
  return notifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const NotificationsPage = () => {
  const [storedNotifications, setStoredNotifications] = useLocalStorage<Notification[]>('user-notifications', generateMockNotifications());
  const [notifications, setNotifications] = useState<Notification[]>(storedNotifications);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notif => notif.type === filter);
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    setStoredNotifications(updatedNotifications);
    toast.success('All notifications marked as read');
  };
  
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    setStoredNotifications(updatedNotifications);
  };
  
  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    setStoredNotifications(updatedNotifications);
    toast.success('Notification removed');
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    setStoredNotifications([]);
    toast.success('All notifications cleared');
  };
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'like': return <ThumbsUp className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'follow': return <User className="w-4 h-4" />;
      case 'mention': return <Star className="w-4 h-4" />;
      case 'system': return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold font-poppins flex items-center">
                <Bell className="mr-2" /> Notifications
                {unreadCount > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground mt-2 font-poppins">
                Stay updated with your activity
              </p>
            </motion.div>
            
            <div className="flex items-center space-x-2">
              {notifications.length > 0 && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-xs font-poppins"
                  >
                    <Check className="w-3 h-3 mr-1" /> Mark all read
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearAllNotifications}
                    className="text-xs font-poppins"
                  >
                    <X className="w-3 h-3 mr-1" /> Clear all
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className="font-poppins"
              >
                All
              </Button>
              <Button
                variant={filter === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('like')}
                className="font-poppins"
              >
                <ThumbsUp className="w-3 h-3 mr-1" /> Likes
              </Button>
              <Button
                variant={filter === 'comment' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('comment')}
                className="font-poppins"
              >
                <MessageSquare className="w-3 h-3 mr-1" /> Comments
              </Button>
              <Button
                variant={filter === 'follow' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('follow')}
                className="font-poppins"
              >
                <User className="w-3 h-3 mr-1" /> Follows
              </Button>
              <Button
                variant={filter === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('system')}
                className="font-poppins"
              >
                <Bell className="w-3 h-3 mr-1" /> System
              </Button>
            </div>
          </div>
          
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <Bell className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2 font-poppins">No notifications</h2>
              <p className="text-muted-foreground max-w-md mx-auto font-poppins">
                {filter === 'all' 
                  ? "You don't have any notifications yet" 
                  : `You don't have any ${filter} notifications`}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${notification.read ? 'bg-card' : 'bg-primary/5 border-primary/20'} relative flex items-start`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {notification.user ? (
                    <Avatar className="h-10 w-10 mr-4 mt-1">
                      <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className={`font-poppins ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-poppins">
                      {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                    </p>
                    
                    {notification.postId && (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-xs text-primary mt-1 font-poppins"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/post/${notification.postId}`;
                        }}
                      >
                        View post
                      </Button>
                    )}
                  </div>
                  
                  <button
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <X size={16} />
                  </button>
                  
                  {!notification.read && (
                    <div className="absolute top-4 right-12 text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotificationsPage;
