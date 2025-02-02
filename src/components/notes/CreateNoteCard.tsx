import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateNote } from "@/hooks/useNotes";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();

  useEffect(() => {
    const createWelcomeNote = async () => {
      if (user) {
        const welcomeContent = `# Welcome to Supernotes!\n\nHi ${user.email?.split('@')[0] || 'there'},\n\nWelcome to your first notecard on Supernotes! 🎉\n\nEach card has a separate display/edit view to give you an improved reading and editing experience. Press the Edit button in the top right (or double-tap on the text) to edit me.\n\nAdd whatever you like to a card using Markdown syntax. Some examples include *italic*, **bold** and highlighted text. It starts simply but is powerful once you master it.`;
        
        try {
          await createNote.mutateAsync({
            title: "Welcome to Supernotes!",
            content: welcomeContent,
          });
        } catch (error) {
          console.error("Error creating welcome note:", error);
        }
      }
    };

    // Check if there are no notes yet
    createWelcomeNote();
  }, [user]);

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
          className="text-lg font-semibold"
        />
        <Textarea
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="resize-none"
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