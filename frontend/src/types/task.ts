export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  created_at: string;
  updated_at: string;
}