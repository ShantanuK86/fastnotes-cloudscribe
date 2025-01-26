import { useState } from "react";
import { NotesList } from "@/components/notes/NotesList";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { useNotes } from "@/hooks/useNotes";

const Notes = () => {
  const { notes, isLoading } = useNotes();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Notes</h1>
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
  );
};

export default Notes;