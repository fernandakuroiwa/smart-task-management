
interface HeaderProps {
  title: string;
  subtitle: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button>+ New Task</button>
        <div className="user-profile">
          <span>F</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
