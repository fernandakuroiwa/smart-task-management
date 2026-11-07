
interface TaskSummaryProps {
  title: string;
  value: number;
  description: string;
}

function TaskSummary({
  title,
  value,
  description,
}: TaskSummaryProps) {
  return (
    <div className="task-summary">
      <h3>{title}</h3>
      <p className="summary-value">{value}</p>
      <p className="summary-description">{description}</p>
    </div>
  );
}

export default TaskSummary;
