
import { useEffect, useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { motion, useAnimation } from "framer-motion";
import { AppBar } from "@/components/layout/AppBar";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { NotesList } from "@/components/notes/NotesList";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const controls = useAnimation();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');
  const { data: notes, isLoading } = useNotes();
  const [isCreating, setIsCreating] = useState(false);

  const filteredNotes = selectedDate
    ? notes?.filter(note => {
        const noteDate = format(new Date(note.created_at), 'yyyy-MM-dd');
        return noteDate === selectedDate;
      })
    : notes;

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    });
  }, [controls]);

  if (user) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-8">
            {selectedDate 
              ? format(new Date(selectedDate), 'MMMM d, yyyy')
              : "Welcome back!"}
          </h1>
          <div className="space-y-8">
            <CreateNoteCard 
              isCreating={isCreating}
              onIsCreatingChange={setIsCreating}
            />
            <NotesList 
              notes={filteredNotes} 
              isLoading={isLoading}
            />
          </div>
        </div>
      </AppLayout>
    );
  }

  useEffect(() => {
    // Add smooth scrolling behavior
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (link) {
        e.preventDefault();
        const id = link.getAttribute('href')?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen bg-background"
    >
      <AppBar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </motion.div>
  );
};

export default Index;
