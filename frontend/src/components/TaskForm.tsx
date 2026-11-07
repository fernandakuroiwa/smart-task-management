import { useState } from "react";
import type { Task, TaskInput } from "../types/task";

interface TaskFormProps {
  onAddTask: (taskData: TaskInput) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  onAddTask({
    title,
    description,
    priority,
    dueDate,
  });

  setTitle("");
  setDescription("");
  setPriority("Medium");
  setDueDate("");
}


return (
  <section id="task-form" className="task-form-section">
    <h2>Create New Task</h2>

    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Task Title</label>

        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          placeholder="Describe your task"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as Task["priority"])
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due Date</label>

          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit">Add Task</button>
    </form>
  </section>
);
}

export default TaskForm;


