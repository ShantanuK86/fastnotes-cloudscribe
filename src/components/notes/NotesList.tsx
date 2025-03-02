
import { Note } from "@/types";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes?: Note[];
  isLoading: boolean;
}

export const NotesList = ({ notes, isLoading }: NotesListProps) => {
  if (isLoading) {
    return <div className="flex justify-center p-8 text-muted-foreground">Loading notes...</div>;
  }

  if (!notes?.length) {
    return (
      <div className="flex justify-center p-8 text-muted-foreground">
        No notes found. Create your first note!
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
