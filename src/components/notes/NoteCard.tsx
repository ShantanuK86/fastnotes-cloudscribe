import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Note } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Heart, Share2, PinIcon } from "lucide-react";
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

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-xl">{note.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePin}
            className={note.is_pinned ? "text-primary" : ""}
          >
            <PinIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{note.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>Updated {format(new Date(note.updated_at), "MMM d")}</span>
        </div>
      </CardFooter>
    </Card>
  );
};