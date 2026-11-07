
import type { Task } from "../types/task";
import { useState } from "react";
import TaskEditForm from "./TaskEditForm";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTask: (
    taskId: number,
    updatedData: Omit<Task, "id" | "status">
  ) => void;
}

function TaskList({
  tasks,
  onToggleStatus,
  onDeleteTask,
  onEditTask,
}: TaskListProps) {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  
  return (
    <section className="task-list">
      <h2>Recent Tasks</h2>

      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          {editingTaskId === task.id ? (
            <TaskEditForm
              task={task}
              onSave={async (taskId, updatedData) => {
                await onEditTask(taskId, updatedData);
                setEditingTaskId(null);
              }}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <>
              <div className="task-item-content">
                <div className="task-item-header">
                  <h3>{task.title}</h3>

                  <div className="task-badges">
                    <span className={`status-badge status-${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>

                    <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                <p className="task-description">{task.description}</p>

                <div className="task-dates">
                  <small>Created: {formatDate(task.created_at)}</small>
                  <small>Last updated: {formatDate(task.updated_at)}</small>
                </div>

                <div className="task-actions">
                  <button onClick={() => onToggleStatus(task.id)}>
                    {task.status === "Completed" ? "Reopen" : "Complete"}
                  </button>

                  <button onClick={() => setEditingTaskId(task.id)}>
                    Edit
                  </button>

                  <button onClick={() => onDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );

}

export default TaskList;
