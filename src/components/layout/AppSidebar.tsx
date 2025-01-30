import { Calendar as CalendarIcon, Home, MessageSquare, Calendar, Code, BookOpen, Coffee, Heart, Archive, User, Settings, LogOut, ChevronLeft } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mainItems = [
  { title: "Home", icon: Home, count: "3298" },
  { title: "Thoughts", icon: MessageSquare, count: "8" },
  { title: "Tasks", icon: Calendar, count: "46" },
];

const collections = [
  { title: "Calls & Catchups", icon: MessageSquare, count: "30" },
  { title: "Code", icon: Code, count: "22" },
  { title: "Events", icon: Calendar, count: "13" },
  { title: "Food & Drink", icon: Coffee, count: "7" },
  { title: "Interest", icon: Heart, count: "32" },
  { title: "Personal", icon: BookOpen, count: "44" },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateSelect = (date?: Date) => {
    setDate(date);
    if (date) {
      navigate(`/notes?date=${format(date, 'yyyy-MM-dd')}`);
    }
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="scrollbar-none">
        <div className="flex justify-end px-2 py-2">
          <SidebarTrigger />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
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
          <div className="px-2">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
              showOutsideDays={false}
              fixedWeeks
            />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Collections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {collections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
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
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex flex-col gap-2 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/profile')}
                  className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                >
                  <User className="h-4 w-4" />
                  <span className="ml-2 group-data-[collapsible=icon]:hidden">{user?.email}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/settings')}
                  className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                >
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => signOut()}
                  className="w-full justify-start group-data-[collapsible=icon]:justify-center"
                >
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
    </Sidebar>
  );
}
