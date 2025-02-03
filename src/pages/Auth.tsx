import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, Facebook } from "lucide-react";
import { AppBar } from "@/components/layout/AppBar";
import AnimatedGallery from "@/components/auth/AnimatedGallery";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Success!",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signIn(email, password);
        navigate("/");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-gradient-to-br from-background to-background/80 p-4">
        <div className="flex w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-xl">
          {/* Left side - Form */}
          <div className="w-full space-y-8 px-8 py-12 md:w-1/2 md:px-12">
            <div className="text-center">
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
                Welcome
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isSignUp
                  ? "Create your account to get started"
                  : "We are glad to see you back with us"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {isSignUp ? "Sign up" : "Next"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">
                    Login with Others
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="relative w-full justify-center gap-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Login with Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="relative w-full justify-center gap-2"
                >
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                  Login with Facebook
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="link"
                  type="button"
                  className="text-sm"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right side - Animated Gallery */}
          <div className="hidden w-1/2 md:block">
            <AnimatedGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
