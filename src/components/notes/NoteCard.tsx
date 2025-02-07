import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Heart, Share2, PinIcon, Pencil, Trash2 } from "lucide-react";
import { useUpdateNote, useDeleteNote } from "@/hooks/useNotes";
import { useToast } from "@/hooks/use-toast";

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const { user } = useAuth();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content || "");

  const togglePin = () => {
    updateNote.mutate({
      id: note.id,
      is_pinned: !note.is_pinned,
    });
  };

  const handleEdit = async () => {
    if (!editedTitle.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateNote.mutateAsync({
        id: note.id,
        title: editedTitle,
        content: editedContent,
      });
      setIsEditing(false);
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote.mutateAsync(note.id);
        toast({
          title: "Note deleted",
          description: "Your note has been deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  if (isEditing) {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="space-y-4">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Note title"
            className="text-lg font-semibold"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Note content"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(note.title);
                setEditedContent(note.content || "");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={updateNote.isPending}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-xl">{note.title}</h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-primary"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePin}
              className={note.is_pinned ? "text-primary" : ""}
            >
              <PinIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          ID: {note.id.slice(0, 8)}
        </p>
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
          <span>Created {format(new Date(note.created_at), "MMM d")}</span>
        </div>
      </CardFooter>
    </Card>
  );
};