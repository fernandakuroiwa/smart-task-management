import { useState } from "react";
import type { Task } from "../types/task";

interface TaskEditFormProps {
  task: Task;
  onSave: (
    taskId: number,
    updatedData: Omit<Task, "id" | "status">
  ) => Promise<void>;
  onCancel: () => void;
}

function TaskEditForm({ task, onSave, onCancel }: TaskEditFormProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Task["priority"]>(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSave(task.id, {
      title,
      description,
      priority,
      dueDate,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as Task["priority"])
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
        required
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default TaskEditForm;