
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Notebook } from "lucide-react";

export const AppBar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
      navigate("/auth");
    } else {
      navigate("/auth");
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/?section=' + sectionId);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                to="/"
                className="flex items-center space-x-2"
              >
                <Notebook className="h-5 w-5" />
                <span className="font-bold">Fastnotes</span>
              </Link>
            </NavigationMenuItem>
            {!user && (
              <>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection('features')}
                    className="text-sm"
                  >
                    Features
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection('pricing')}
                    className="text-sm"
                  >
                    Pricing
                  </Button>
                </NavigationMenuItem>
              </>
            )}
            {user && (
              <NavigationMenuItem>
                <Link
                  to="/notes"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  My Notes
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {user && (
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            className="text-base"
            onClick={handleAuthAction}
          >
            {user ? "Sign out" : "Log in"}
          </Button>
        </div>
      </div>
    </header>
  );
};
