export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: Comment[];
  featured?: boolean;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

export const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'technology', name: 'Technology' },
  { id: 'design', name: 'Design' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Cooking' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'business', name: 'Business' },
  { id: 'education', name: 'Education' },
  { id: 'health', name: 'Health & Wellness' }
];

const generateComments = (count: number) => {
  const comments: Comment[] = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: `comment-${Math.random().toString(36).substring(2, 11)}`,
      author: {
        name: [
          'Alex Johnson',
          'Jamie Smith',
          'Taylor Wilson',
          'Jordan Brown',
          'Casey Miller',
          'Robin Davis',
          'Quinn Thomas',
          'Morgan Lee',
        ][Math.floor(Math.random() * 8)],
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
      },
      content: [
        'Great article! Thanks for sharing your insights.',
        'I never thought about it this way, very enlightening.',
        'Do you have any additional resources on this topic?',
        'This changed my perspective completely.',
        'I\'ve been looking for this kind of information for a while!',
        'Interesting take on this subject. Not sure if I completely agree, but definitely food for thought.',
        'Well written and very informative. Looking forward to your next post!',
        'I\'ve shared this with my colleagues - such valuable content.',
        'Your writing style makes complex topics so accessible.',
        'I have a question about one of your points. Would you mind elaborating?',
      ][Math.floor(Math.random() * 10)],
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      likes: Math.floor(Math.random() * 50),
    });
  }
  return comments;
};

const generatePost = (
  id: string,
  title: string,
  excerpt: string,
  category: string,
  coverImage: string,
  featured = false
): Post => {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nunc vel tincidunt lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    "Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Nullam quis risus eget urna mollis ornare vel eu leo.",
    "Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Vestibulum id ligula porta felis euismod semper.",
    "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec id elit non mi porta gravida at eget metus.",
    "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum.",
    "Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.",
  ];

  const shuffledParagraphs = [...paragraphs].sort(() => 0.5 - Math.random());
  const content = shuffledParagraphs.slice(0, 5).join("\n\n");

  return {
    id,
    title,
    excerpt,
    content,
    category,
    coverImage,
    date: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(),
    readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    author: {
      name: [
        'David Chen',
        'Maria Rodriguez',
        'Sam Wilson',
        'Elena Kim',
        'James Taylor',
        'Olivia Johnson',
      ][Math.floor(Math.random() * 6)],
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
    },
    likes: Math.floor(Math.random() * 200),
    comments: generateComments(Math.floor(Math.random() * 8) + 1),
    featured,
  };
};

const basePosts = [
  generatePost(
    "the-future-of-web-development",
    "The Future of Web Development: What's Coming in 2025",
    "Exploring the latest trends and technologies shaping the future of web development.",
    "technology",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    true
  ),
  generatePost(
    "ux-design-principles",
    "10 UX Design Principles Every Developer Should Know",
    "Essential user experience concepts to create more intuitive and user-friendly interfaces.",
    "design",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    true
  ),
  generatePost(
    "exploring-bali",
    "A Week in Bali: Hidden Gems and Cultural Experiences",
    "Discover the less-traveled paths and authentic cultural experiences in the heart of Bali.",
    "travel",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "italian-pasta-secrets",
    "The Secrets to Authentic Italian Pasta Making",
    "Learn the traditional techniques and ingredients that make Italian pasta truly special.",
    "food",
    "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "minimalist-living-guide",
    "The Ultimate Guide to Minimalist Living",
    "How embracing minimalism can lead to a more fulfilling and stress-free lifestyle.",
    "lifestyle",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    true
  ),
  generatePost(
    "home-workout-routines",
    "Effective Home Workout Routines Without Equipment",
    "Stay fit and healthy with these equipment-free exercises you can do anywhere.",
    "fitness",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "react-performance-tips",
    "Advanced React Performance Optimization Techniques",
    "Take your React applications to the next level with these performance boosting strategies.",
    "technology",
    "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "typography-in-design",
    "The Impact of Typography in Modern Web Design",
    "How the right font choices can dramatically improve user experience and brand perception.",
    "design",
    "https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "kyoto-travel-guide",
    "Kyoto Travel Guide: Temples, Gardens, and Traditional Culture",
    "Navigate the ancient capital of Japan with insider tips to experience its timeless beauty.",
    "travel",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ),
  generatePost(
    "plant-based-recipes",
    "Delicious Plant-Based Recipes for Beginners",
    "Simple and satisfying vegan meals that anyone can prepare, regardless of cooking experience.",
    "food",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  )
];

const additionalPostTitles = [
  { title: "The Psychology of Color in Marketing", category: "design", image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Building a Sustainable Wardrobe", category: "lifestyle", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Rise of No-Code Development Platforms", category: "technology", image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Exploring the Greek Islands", category: "travel", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Morning Routines of Successful Entrepreneurs", category: "business", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Benefits of Strength Training for All Ages", category: "fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Understanding Blockchain Technology", category: "technology", image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Art of Food Photography", category: "food", image: "https://images.unsplash.com/photo-1547592180-85f173990888?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Responsive Web Design Best Practices", category: "design", image: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Hidden Gems of South America", category: "travel", image: "https://images.unsplash.com/photo-1554254648-2d58a1bc3fd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "How to Grow Your Own Herb Garden", category: "food", image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Digital Minimalism in a Connected World", category: "lifestyle", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Science of HIIT Workouts", category: "fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Future of AI in Everyday Life", category: "technology", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Architectural Photography Tips", category: "design", image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Cultural Etiquette When Traveling Abroad", category: "travel", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Sustainable Eating: Reducing Food Waste", category: "food", image: "https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Creating an Effective Home Office", category: "lifestyle", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Yoga for Better Sleep", category: "fitness", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Evolution of Mobile App Design", category: "design", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Business of Sustainable Fashion", category: "business", image: "https://images.unsplash.com/photo-1520263115673-610416f52ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Modern Approaches to Online Education", category: "education", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Mental Health Benefits of Meditation", category: "health", image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Growing Your Business Through Social Media", category: "business", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Interactive Learning Tools for Children", category: "education", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Building Healthy Eating Habits", category: "health", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Innovative Startup Funding Strategies", category: "business", image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "The Future of Remote Learning", category: "education", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { title: "Balancing Work and Wellness", category: "health", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
];

const additionalPosts = additionalPostTitles.map((post, index) => {
  const id = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const excerpt = `Discover insights and practical advice about ${post.title.toLowerCase()} that can transform your approach.`;
  return generatePost(id, post.title, excerpt, post.category, post.image);
});

const getPostsFromStorage = (): Post[] => {
  if (typeof window === 'undefined') return [...basePosts, ...additionalPosts];
  
  try {
    const storedPosts = localStorage.getItem('blog-posts');
    if (storedPosts) {
      return JSON.parse(storedPosts);
    }
  } catch (error) {
    console.error('Error reading posts from localStorage:', error);
  }
  
  const defaultPosts = [...basePosts, ...additionalPosts];
  try {
    localStorage.setItem('blog-posts', JSON.stringify(defaultPosts));
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
  }
  
  return defaultPosts;
};

export const posts: Post[] = getPostsFromStorage();

export const addNewPost = (post: Omit<Post, 'comments' | 'likes' | 'date' | 'readTime' | 'author'>): Post => {
  const newPost: Post = {
    ...post,
    date: new Date().toISOString(),
    readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
    author: {
      name: 'JAY VEGAD',
      avatar: 'https://avatars.githubusercontent.com/u/112025350',
    },
    likes: 0,
    comments: [],
  };
  
  const updatedPosts = [newPost, ...posts];
  
  try {
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error saving new post to localStorage:', error);
  }
  
  return newPost;
};

export const shuffledPosts = [...posts].sort(() => 0.5 - Math.random());

export const featuredPosts = shuffledPosts.filter(post => post.featured);

export const recentPosts = shuffledPosts
  .filter(post => !post.featured)
  .slice(0, 6);

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getPostsByCategory = (category: string): Post[] => {
  if (category === 'all') return shuffledPosts;
  return shuffledPosts.filter(post => post.category === category);
};

export const getRelatedPosts = (post: Post, count = 3): Post[] => {
  return shuffledPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, count);
};
