
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskSummary from "./components/TaskSummary";
import {
  getTasks,
  createTask,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
  updateTaskStatus,
} from "./services/taskService";
import TaskList from "./components/TaskList";
import type { Task, TaskInput } from "./types/task";
import TaskForm from "./components/TaskForm";
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [apiMessage, setApiMessage] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  function handleNewTaskClick() {
    const form = document.getElementById("task-form");

    form?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    document.getElementById("title")?.focus({
      preventScroll: true,
    });
  }

  const totalTasks = taskList.length;

  const pendingTasks = taskList.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = taskList.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = taskList.filter(
    (task) => task.status === "Completed"
  ).length;

  const filteredTasks = taskList.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  async function addTask(taskData: TaskInput) {
    try {
      const newTask = await createTask(taskData);

      setTaskList((currentTasks) => [...currentTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
      setApiMessage("Could not create task. Please try again.");
    }
  }

  async function toggleTaskStatus(taskId: number) {
    const task = taskList.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    const newStatus =
      task.status === "Completed" ? "Pending" : "Completed";

    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);

      setTaskList((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === taskId ? updatedTask : currentTask
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      setApiMessage("Could not update task status. Please try again.");
    }
  }

  async function deleteTask(taskId: number) {
    try {
      await deleteTaskAPI(taskId);

      setTaskList((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      setApiMessage("Could not delete task. Please try again.");
    }
  }

  async function updateTask(
    taskId: number,
    updatedData: TaskInput
  ) {
    try {
      const updatedTask = await updateTaskAPI(taskId, updatedData);

      setTaskList((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setApiMessage("Could not update task. Please try again.");
      throw error;
    }
  }

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTaskList(data);
        setApiStatus("Connected");
      })
      .catch(() => {
        setApiStatus("Error");
        setApiMessage("Could not connect to backend");
      });
  }, []);

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Header
          title="Dashboard"
          subtitle="Here's an overview of your productivity"
          onNewTaskClick={handleNewTaskClick}
        />
      
        <div className="summary-grid">
          <TaskSummary
            title="Total Tasks"
            value={totalTasks}
            description="All tasks"
            onClick={() => setStatusFilter("All")}
            isActive={statusFilter === "All"}
          />

          <TaskSummary
            title="Pending"
            value={pendingTasks}
            description="Tasks waiting to be started"
            onClick={() => setStatusFilter("Pending")}
            isActive={statusFilter === "Pending"}
          />

          <TaskSummary
            title="In Progress"
            value={inProgressTasks}
            description="Tasks currently underway"
            onClick={() => setStatusFilter("In Progress")}
            isActive={statusFilter === "In Progress"}
          />

          <TaskSummary
            title="Completed"
            value={completedTasks}
            description="Finished tasks"
            onClick={() => setStatusFilter("Completed")}
            isActive={statusFilter === "Completed"}
          />
        </div>

        <TaskForm onAddTask={addTask} />

        <div className="filters-container">
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <TaskList
          tasks={filteredTasks}
          onToggleStatus={toggleTaskStatus}
          onDeleteTask={deleteTask}
          onEditTask={updateTask}
        />
        
        <h2>System Status</h2>

        <p>Backend status: {apiStatus}</p>
        
        <p>{apiMessage}</p>
      </main>
    </div>
  );
}

export default App;
