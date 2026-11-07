
interface TaskSummaryProps {
  title: string;
  value: number;
  description: string;
  onClick: () => void;
  isActive: boolean;
}

function TaskSummary({
  title,
  value,
  description,
  onClick,
  isActive,
}: TaskSummaryProps) {
  const getCardType = () => {
    switch (title) {
      case "Total Tasks":
        return "total";
      case "Pending":
        return "pending";
      case "In Progress":
        return "in-progress";
      case "Completed":
        return "completed";
      default:
        return "default";
    }
  };

  return (
    <button
      type="button"
      className={`task-summary summary-${getCardType()} ${
        isActive ? "summary-active" : ""
      }`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className="summary-header">
        <h3>{title}</h3>
        <span className="summary-indicator"></span>
      </div>

      <p className="summary-value">{value}</p>
      <p className="summary-description">{description}</p>
    </button>
  );
}

export default TaskSummary;
