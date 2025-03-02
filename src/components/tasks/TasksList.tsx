
import { Task } from "@/types";
import { TaskCard } from "./TaskCard";

interface TasksListProps {
  tasks?: Task[];
  isLoading: boolean;
}

export const TasksList = ({ tasks, isLoading }: TasksListProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tasks?.length) {
    return <div className="text-center text-muted-foreground py-8">No tasks found</div>;
  }

  // Group tasks by due date
  const tasksByDate: Record<string, Task[]> = {};
  
  tasks.forEach(task => {
    const dueDate = task.due_date ? new Date(task.due_date).toDateString() : 'No Due Date';
    if (!tasksByDate[dueDate]) {
      tasksByDate[dueDate] = [];
    }
    tasksByDate[dueDate].push(task);
  });

  return (
    <div className="space-y-6">
      {Object.entries(tasksByDate).map(([date, dateTasks]) => (
        <div key={date} className="space-y-3">
          <h3 className="font-medium">{date}</h3>
          <div className="space-y-3">
            {dateTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
