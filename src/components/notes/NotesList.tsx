
import { Note } from "@/types";
import { NoteCard } from "./NoteCard";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <ScrollArea className="w-full pb-4">
      <div className="flex flex-col space-y-4 pb-6 px-1">
        {notes.map((note) => (
          <div key={note.id} className="w-full">
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
