
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { useNotes } from "@/hooks/useNotes";
import { useCategories } from "@/hooks/useCategories";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateNoteCard } from "@/components/notes/CreateNoteCard";
import { NotesList } from "@/components/notes/NotesList";

const Notes = () => {
  const { data: notes, isLoading } = useNotes();
  const { data: categories } = useCategories();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get('date');
  const selectedCategory = searchParams.get('category');
  const [isCreating, setIsCreating] = useState(false);

  let filteredNotes = notes;

  // Filter by date if selected
  if (selectedDate) {
    filteredNotes = filteredNotes?.filter(note => {
      const noteDate = format(new Date(note.created_at), 'yyyy-MM-dd');
      return noteDate === selectedDate;
    });
  }

  // Filter by category if selected
  if (selectedCategory) {
    filteredNotes = filteredNotes?.filter(note => note.category_id === selectedCategory);
  }

  // Get page title
  let pageTitle = "All Notes";
  if (selectedDate) {
    pageTitle = format(new Date(selectedDate), 'MMMM d, yyyy');
  } else if (selectedCategory) {
    const category = categories?.find(c => c.id === selectedCategory);
    if (category) {
      pageTitle = `${category.name} Notes`;
    }
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{pageTitle}</h1>
            <p className="text-muted-foreground">
              {filteredNotes?.length || 0} notes
            </p>
          </div>
        </div>
        
        <CreateNoteCard 
          isCreating={isCreating}
          onIsCreatingChange={setIsCreating}
        />
        
        <NotesList 
          notes={filteredNotes} 
          isLoading={isLoading}
        />
      </div>
    </AppLayout>
  );
};

export default Notes;
