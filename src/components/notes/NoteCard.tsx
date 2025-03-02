
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { MessageSquare, Heart, Share2, PinIcon, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useUpdateNote, useDeleteNote } from "@/hooks/useNotes";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    try {
      await deleteNote.mutateAsync(note.id);
      setShowDeleteDialog(false);
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
  };

  const getTimeDisplay = () => {
    const now = new Date();
    const noteDate = new Date(note.created_at);
    const diffInHours = Math.abs(now.getTime() - noteDate.getTime()) / 36e5;
    
    if (diffInHours < 24) {
      return formatDistanceToNow(noteDate, { addSuffix: true });
    } else {
      return format(noteDate, 'MMM do yyyy');
    }
  };

  if (isEditing) {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-[#1A1F2C] text-white border-[#333333]/30">
        <CardHeader className="space-y-4">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Note title"
            className="text-lg font-semibold bg-[#222222] border-[#444444]"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Note content"
            rows={4}
            className="bg-[#222222] border-[#444444]"
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(note.title);
                setEditedContent(note.content || "");
              }}
              className="text-white border-[#444444] hover:bg-[#333333]"
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
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-[#1A1F2C] text-white border-[#333333]/30">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-xl text-white">{note.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white h-8 w-8"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="prose prose-invert max-w-none">
            {note.content && (
              <div className="text-[#C8C8C9] whitespace-pre-wrap">{note.content}</div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-2 text-xs text-[#8A898C] justify-between">
          <div>
            {getTimeDisplay()}
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-[#8A898C] hover:text-white">
              <Pencil className="h-4 w-4" onClick={() => setIsEditing(true)} />
            </Button>
            {note.is_pinned && (
              <Button variant="ghost" size="icon" className="h-7 w-7 text-primary hover:text-primary/80">
                <PinIcon className="h-4 w-4" onClick={togglePin} />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
