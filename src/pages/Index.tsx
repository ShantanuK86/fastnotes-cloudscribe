import { useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { motion, useAnimation } from "framer-motion";
import { AppBar } from "@/components/layout/AppBar";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { NotesList } from "@/components/notes/NotesList";
import { useNotes } from "@/hooks/useNotes";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="min-h-screen bg-background"
    >
      <AppBar />
      <Hero />
      <Features />
    </motion.div>
  );
};

export default Index;