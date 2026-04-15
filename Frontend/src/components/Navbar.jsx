import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  return (
    <div className="navbar">
      <div className="nav-links">
        <Link to="/">Dashboard</Link>

        {(user.role === "admin" || user.role === "manager") && (
          <Link to="/users">Users</Link>
        )}

        {user.role === "admin" && <Link to="/create-user">Create User</Link>}

        <Link to="/profile">Profile</Link>
      </div>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
