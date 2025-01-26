import { useState } from "react";
import { NotesList } from "@/components/notes/NotesList";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { useNotes } from "@/hooks/useNotes";
import { AppLayout } from "@/components/layout/AppLayout";
import { format } from "date-fns";

const Notes = () => {
  const { data: notes, isLoading } = useNotes();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Today</h1>
              <p className="text-muted-foreground mt-2">
                Good {getTimeOfDay()}, here's everything from {format(new Date(), "do MMMM")}
              </p>
            </div>
            <p className="text-muted-foreground">
              {notes?.length || 0} {notes?.length === 1 ? "note" : "notes"}
            </p>
          </div>

          <CreateNoteCard
            isCreating={isCreating}
            onIsCreatingChange={setIsCreating}
          />

          {!isCreating && <NotesList notes={notes} isLoading={isLoading} />}
        </div>
      </div>
    </AppLayout>
  );
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

export default Notes;