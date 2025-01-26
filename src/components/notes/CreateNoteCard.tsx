import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateNote } from "@/hooks/useNotes";
import { useToast } from "@/components/ui/use-toast";

interface CreateNoteCardProps {
  isCreating: boolean;
  onIsCreatingChange: (value: boolean) => void;
}

export const CreateNoteCard = ({
  isCreating,
  onIsCreatingChange,
}: CreateNoteCardProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const createNote = useCreateNote();

  const handleCreate = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    try {
      await createNote.mutateAsync({
        title,
        content,
      });
      setTitle("");
      setContent("");
      onIsCreatingChange(false);
      toast({
        title: "Note created",
        description: "Your note has been created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!isCreating) {
    return (
      <Card
        className="cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={() => onIsCreatingChange(true)}
      >
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Start typing / paste anything to create a note...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setTitle("");
              setContent("");
              onIsCreatingChange(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={createNote.isPending}>
            Create Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};