import { Note } from "@/types";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes?: Note[];
  isLoading: boolean;
}

export const NotesList = ({ notes, isLoading }: NotesListProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!notes?.length) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};