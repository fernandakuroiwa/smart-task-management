
interface HeaderProps {
  title: string;
  subtitle: string;
  onNewTaskClick: () => void;
}

function Header({ title, subtitle, onNewTaskClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-info">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button
          className="new-task-button"
          onClick={onNewTaskClick}
        >
          <span>+</span>
          New Task
        </button>

        <div className="user-profile" title="User profile">
          F
        </div>
      </div>
    </header>
  );
}

export default Header;
