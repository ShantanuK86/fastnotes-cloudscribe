
import { Calendar as CalendarIcon, Home, MessageSquare, Calendar, Code, BookOpen, Coffee, Heart, Archive, User, Settings, LogOut } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNotes } from "@/hooks/useNotes";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";
import { Note } from "@/types";
import { Notebook } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

// Define icons mapper for dynamic rendering
const iconMap: Record<string, any> = {
  'MessageSquare': MessageSquare,
  'Code': Code,
  'Calendar': Calendar,
  'Coffee': Coffee,
  'Heart': Heart,
  'BookOpen': BookOpen
};

const formatNoteDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM do yyyy');
};

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: notes } = useNotes();
  const { data: categories } = useCategories();
  const { data: tasks } = useTasks();
  const { state } = useSidebar();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/'); // Redirect to landing page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDateSelect = (date?: Date) => {
    setDate(date);
    if (date) {
      navigate(`/notes?date=${format(date, 'yyyy-MM-dd')}`);
    }
  };

  // Calculate notes by category count
  const notesByCategory = notes?.reduce((acc: {
    [key: string]: Note[];
  }, note) => {
    const categoryId = note.category_id;
    const category = categories?.find(c => c.id === categoryId);
    const categoryName = category?.name || 'Uncategorized';
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(note);
    return acc;
  }, {});

  // Build main menu items
  const mainItems = [
    {
      title: "Home",
      icon: Home,
      count: notes?.length.toString() || "0",
      path: "/"
    }, 
    {
      title: "Tasks",
      icon: Calendar,
      count: tasks?.length.toString() || "0",
      path: "/tasks"
    }
  ];

  return <Sidebar variant="floating" collapsible="icon" className="w-[20rem] bg-opacity-50 backdrop-blur-sm">
      <SidebarContent className="scrollbar-none">
        <div className="px-4 py-4">
          <div className={`flex items-center ${state === "expanded" ? "justify-between" : "justify-center"}`}>
            <div className="flex items-center gap-2">
              <Notebook className="h-5 w-5" />
              {state === "expanded" && <span className="font-bold">FastNotes</span>}
            </div>
            {state === "expanded" && <ThemeToggle />}
          </div>
        </div>

        <div className="flex justify-end px-2 py-2">
          <SidebarTrigger />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="px-2 group-data-[collapsible=icon]:hidden">
            <div className="w-full overflow-hidden rounded-md bg-background p-2">
              <div className="transform origin-top-left">
                <CalendarComponent mode="single" selected={date} onSelect={handleDateSelect} className="bg-background" showOutsideDays={false} fixedWeeks />
              </div>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories?.map(category => {
                const IconComponent = iconMap[category.icon] || MessageSquare;
                const count = notesByCategory?.[category.name]?.length || 0;
                
                return (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton 
                      tooltip={category.name}
                      onClick={() => navigate(`/notes?category=${category.id}`)}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {count}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2 p-2 border-t px-0 py-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4" />
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">Profile</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
                  <Settings className="h-4 w-4" />
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">Sign out</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Sign out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SidebarFooter>
    </Sidebar>;
}
