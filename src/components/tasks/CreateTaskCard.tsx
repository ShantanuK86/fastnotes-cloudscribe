
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateTask } from "@/hooks/useTasks";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CreateTaskCardProps {
  isCreating: boolean;
  onIsCreatingChange: (value: boolean) => void;
}

export const CreateTaskCard = ({
  isCreating,
  onIsCreatingChange,
}: CreateTaskCardProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const { toast } = useToast();
  const createTask = useCreateTask();

  const determinePriority = (title: string, description: string, date?: Date): "low" | "medium" | "high" => {
    const combinedText = (title + " " + description).toLowerCase();
    
    // Check for urgent keywords
    if (combinedText.includes("urgent") || 
        combinedText.includes("asap") ||
        combinedText.includes("immediately") ||
        combinedText.includes("critical")) {
      return "high";
    }
    
    // Check if due date is today or tomorrow
    if (date) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const dateOnly = new Date(date.setHours(0, 0, 0, 0));
      const todayOnly = new Date(today.setHours(0, 0, 0, 0));
      const tomorrowOnly = new Date(tomorrow.setHours(0, 0, 0, 0));
      
      if (dateOnly.getTime() === todayOnly.getTime()) {
        return "high";
      } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
        return "medium";
      }
    }
    
    // Default to low priority if due date is further in the future
    return "low";
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your task",
        variant: "destructive",
      });
      return;
    }

    try {
      // Auto-determine priority if user hasn't explicitly chosen
      const suggestedPriority = determinePriority(title, description, dueDate);
      
      await createTask.mutateAsync({
        title,
        description,
        due_date: dueDate ? dueDate.toISOString() : null,
        is_completed: false,
        priority: priority || suggestedPriority
      });
      
      setTitle("");
      setDescription("");
      setDueDate(undefined);
      setPriority("medium");
      onIsCreatingChange(false);
      
      toast({
        title: "Task created",
        description: "Your task has been created successfully",
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
            Create a new task...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold"
        />
        
        <Textarea
          placeholder="Task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="resize-none"
        />
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate ? format(dueDate, "PPP") : <span>Pick a due date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-medium">Priority</h4>
          <RadioGroup 
            value={priority} 
            onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="text-muted-foreground">Low</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-muted-foreground">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="text-muted-foreground">High</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setTitle("");
              setDescription("");
              setDueDate(undefined);
              setPriority("medium");
              onIsCreatingChange(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={createTask.isPending}>
            Create Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
