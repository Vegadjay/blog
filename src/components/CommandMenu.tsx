
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator
} from '@/components/ui/command';
import { Search, FileText, Hash, BookmarkIcon, Bell } from 'lucide-react';
import { categories, shuffledPosts } from '@/data/posts';
import { toast } from 'sonner';

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandMenu = ({ open, setOpen }: CommandMenuProps) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(shuffledPosts.slice(0, 5));
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault();
        setOpen(!open);
      }
      
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);
  
  const handleSearch = (value: string) => {
    if (!value) {
      setSearchResults(shuffledPosts.slice(0, 5));
      return;
    }
    
    const filtered = shuffledPosts.filter(post => 
      post.title.toLowerCase().includes(value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(value.toLowerCase()) ||
      post.category.toLowerCase().includes(value.toLowerCase())
    );
    
    setSearchResults(filtered.slice(0, 5));
  };
  
  const navigateToPost = (postId: string) => {
    setOpen(false);
    navigate(`/post/${postId}`);
    toast.success('Opening post');
  };
  
  const navigateToCategory = (categoryId: string) => {
    setOpen(false);
    navigate(`/category/${categoryId}`);
    toast.success(`Browsing ${categoryId} category`);
  };
  
  const navigateToBookmarks = () => {
    setOpen(false);
    navigate('/bookmarks');
    toast.success('Opening your bookmarks');
  };
  
  const navigateToNotifications = () => {
    setOpen(false);
    navigate('/notifications');
    toast.success('Opening notifications');
  };
  
  const navigateToNewPost = () => {
    setOpen(false);
    navigate('/new-post');
    toast.success('Create a new post');
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-popover shadow-md animate-command-menu-open">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Search posts, categories..." 
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              onValueChange={handleSearch}
            />
          </div>

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Quick Navigation">
              <CommandItem onSelect={() => navigateToBookmarks()} className="cursor-pointer">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                <span>Your Bookmarks</span>
              </CommandItem>
              <CommandItem onSelect={() => navigateToNotifications()} className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </CommandItem>
              <CommandItem onSelect={() => navigateToNewPost()} className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Create New Post</span>
              </CommandItem>
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Categories">
              {categories.map((category) => (
                <CommandItem 
                  key={category.id}
                  onSelect={() => navigateToCategory(category.id)}
                  className="cursor-pointer"
                >
                  <Hash className="mr-2 h-4 w-4" />
                  <span>{category.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Posts">
              {searchResults.map((post) => (
                <CommandItem 
                  key={post.id}
                  onSelect={() => navigateToPost(post.id)}
                  className="cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </CommandDialog>
  );
};

export default CommandMenu;
