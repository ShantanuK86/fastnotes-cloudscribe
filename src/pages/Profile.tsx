import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { useNotes } from "@/hooks/useNotes";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Profile() {
  const { user } = useAuth();
  const { data: notes } = useNotes();
  const [timeRange, setTimeRange] = useState("7");

  const getDailyStats = () => {
    const days = parseInt(timeRange);
    const stats = [];
    
    for (let i = 0; i < days; i++) {
      const date = subDays(new Date(), i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);
      
      const dayNotes = notes?.filter(note => {
        const noteDate = new Date(note.created_at);
        return noteDate >= dayStart && noteDate <= dayEnd;
      });

      stats.unshift({
        date: format(date, 'MMM dd'),
        tasks: dayNotes?.length || 0
      });
    }
    
    return stats;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile Dashboard</h1>
        <Select
          value={timeRange}
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Notes</h3>
          <p className="text-3xl font-bold">{notes?.length || 0}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Today's Notes</h3>
          <p className="text-3xl font-bold">
            {notes?.filter(note => {
              const today = new Date();
              const noteDate = new Date(note.created_at);
              return format(today, 'yyyy-MM-dd') === format(noteDate, 'yyyy-MM-dd');
            }).length || 0}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Email</h3>
          <p className="text-lg">{user?.email}</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getDailyStats()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}