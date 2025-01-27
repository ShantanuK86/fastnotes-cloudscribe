import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useNotes } from "@/hooks/useNotes";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { NotesList } from "@/components/notes/NotesList";

const Notes = () => {
  const { data: notes, isLoading } = useNotes();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');

  const filteredNotes = selectedDate
    ? notes?.filter(note => {
        const noteDate = format(new Date(note.created_at), 'yyyy-MM-dd');
        return noteDate === selectedDate;
      })
    : notes;

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedDate 
                ? format(new Date(selectedDate), 'MMMM d, yyyy')
                : "All Notes"}
            </h1>
            <p className="text-muted-foreground">
              {filteredNotes?.length || 0} notes
            </p>
          </div>
        </div>
        
        <CreateNoteCard />
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <NotesList notes={filteredNotes || []} />
        )}
      </div>
    </AppLayout>
  );
};

export default Notes;