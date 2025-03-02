
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Note } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "./useCategories";
import { useToast } from "@/components/ui/use-toast";

export const useNotes = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("notes")
        .select("*, categories(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as (Note & { categories: { name: string, icon: string } | null })[];
    },
    enabled: !!user,
  });
};

export const useCategorizeNote = () => {
  const queryClient = useQueryClient();
  const { data: categories } = useCategories();
  const { toast } = useToast();

  const predictCategory = async (title: string, content: string | null) => {
    if (!categories || categories.length === 0) return null;
    
    try {
      // Simple rule-based categorization
      const combinedText = `${title} ${content || ''}`.toLowerCase();
      
      // Define keywords for each category
      const categoryKeywords: Record<string, string[]> = {
        'Calls & Catchups': ['call', 'meet', 'meeting', 'zoom', 'chat', 'talk', 'discussion', 'conversation'],
        'Code': ['code', 'programming', 'javascript', 'typescript', 'react', 'function', 'algorithm', 'bug'],
        'Events': ['event', 'party', 'celebration', 'concert', 'festival', 'conference', 'seminar', 'workshop'],
        'Food & Drink': ['food', 'eat', 'drink', 'restaurant', 'recipe', 'cook', 'meal', 'lunch', 'dinner', 'breakfast'],
        'Interest': ['hobby', 'interest', 'book', 'movie', 'show', 'music', 'song', 'podcast', 'blog'],
        'Personal': ['personal', 'family', 'friend', 'health', 'self', 'reminder', 'goal']
      };
      
      // Check matches for each category
      const categoryScores = Object.entries(categoryKeywords).map(([categoryName, keywords]) => {
        const matchScore = keywords.reduce((score, keyword) => {
          if (combinedText.includes(keyword)) return score + 1;
          return score;
        }, 0);
        return { categoryName, matchScore };
      });
      
      // Sort by match score
      categoryScores.sort((a, b) => b.matchScore - a.matchScore);
      
      // If best match has at least one keyword hit, use it
      if (categoryScores[0].matchScore > 0) {
        const category = categories.find(c => c.name === categoryScores[0].categoryName);
        return category?.id || null;
      }
      
      // Default to 'Personal' if no matches
      const defaultCategory = categories.find(c => c.name === 'Personal');
      return defaultCategory?.id || null;
    } catch (error) {
      console.error("Error predicting category:", error);
      return null;
    }
  };

  return {
    predictCategory
  };
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { predictCategory } = useCategorizeNote();

  return useMutation({
    mutationFn: async (note: Pick<Note, "title" | "content">) => {
      if (!user) throw new Error("User not authenticated");

      // Predict category based on note content
      const category_id = await predictCategory(note.title, note.content);

      const { data, error } = await supabase
        .from("notes")
        .insert([{ ...note, user_id: user.id, category_id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const { predictCategory } = useCategorizeNote();

  return useMutation({
    mutationFn: async (note: Partial<Note> & { id: string }) => {
      // If title or content is being updated, recategorize
      let updatedNote = { ...note };
      
      if (note.title || note.content) {
        // Need to fetch the full note to recategorize
        const { data: existingNote } = await supabase
          .from("notes")
          .select("*")
          .eq("id", note.id)
          .single();
          
        if (existingNote) {
          const title = note.title || existingNote.title;
          const content = note.content !== undefined ? note.content : existingNote.content;
          const category_id = await predictCategory(title, content);
          
          if (category_id) {
            updatedNote.category_id = category_id;
          }
        }
      }
      
      const { data, error } = await supabase
        .from("notes")
        .update(updatedNote)
        .eq("id", note.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: string) => {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", noteId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
