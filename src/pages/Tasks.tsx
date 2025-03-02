
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreateTaskCard } from "@/components/tasks/CreateTaskCard";
import { TasksList } from "@/components/tasks/TasksList";

const Tasks = () => {
  const { data: tasks, isLoading } = useTasks();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <AppLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">
              {tasks?.length || 0} tasks
            </p>
          </div>
        </div>
        
        <CreateTaskCard 
          isCreating={isCreating}
          onIsCreatingChange={setIsCreating}
        />
        
        <TasksList 
          tasks={tasks} 
          isLoading={isLoading}
        />
      </div>
    </AppLayout>
  );
};

export default Tasks;
