
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">S</div>
        <h2>Smart Tasks</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">MENU</p>

        <ul>
          <li className="nav-item active">
            <span className="nav-icon">▦</span>
            Dashboard
          </li>

          <li className="nav-item">
            <span className="nav-icon">☷</span>
            My Tasks
          </li>

          <li className="nav-item">
            <span className="nav-icon">✓</span>
            Completed
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <span>Task Management System</span>
        <small>Version 1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;
