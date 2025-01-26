export interface Note {
  id: string;
  title: string;
  content: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_archived: boolean;
  target_date: string | null;
}