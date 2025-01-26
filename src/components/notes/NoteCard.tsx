import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Note } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarIcon, PinIcon, ArchiveIcon } from "lucide-react";
import { useUpdateNote } from "@/hooks/useNotes";

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const { user } = useAuth();
  const updateNote = useUpdateNote();

  const togglePin = () => {
    updateNote.mutate({
      id: note.id,
      is_pinned: !note.is_pinned,
    });
  };

  const toggleArchive = () => {
    updateNote.mutate({
      id: note.id,
      is_archived: !note.is_archived,
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePin}
            className={note.is_pinned ? "text-primary" : ""}
          >
            <PinIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          by {user?.email}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">{note.content}</p>
        {note.target_date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>
              Target: {format(new Date(note.target_date), "PPP")}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="space-y-1">
          <p>Created {format(new Date(note.created_at), "PPP")}</p>
          <p>Last edited {format(new Date(note.updated_at), "PPP")}</p>
          <p className="font-mono text-xs">ID: {note.id.slice(0, 8)}...</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleArchive}
          className={note.is_archived ? "text-destructive" : ""}
        >
          <ArchiveIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};