import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
     
const navLinkClass = ({ isActive }) =>
  `relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
    isActive
      ? "bg-linear-to-br from-(--primary) to-(--primary-dark) text-black shadow-lg shadow-(--primary)/20"
      : "text-(--muted) hover:bg-(--panel-hover) hover:text-(--text)"
  }`;

const AppShell = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-(--border) bg-(--bg)/80 backdrop-blur-xl">
        <div className="app-container flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size={50} />
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/explore" className={navLinkClass}>
              Explore
            </NavLink>
            <NavLink to="/saved" className={navLinkClass}>
              Saved
            </NavLink>
            <NavLink to="/snippets/new" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New
              </span>
            </NavLink>
          </nav>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-(--primary) to-(--primary-dark) text-sm font-bold text-black shadow-lg shadow-(--primary)/20">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
