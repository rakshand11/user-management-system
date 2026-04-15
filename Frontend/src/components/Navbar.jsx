import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Dashboard
      </Link>

      {(user.role === "admin" || user.role === "manager") && (
        <Link to="/users" style={{ marginRight: "10px" }}>
          Users
        </Link>
      )}

      {user.role === "admin" && (
        <Link to="/create-user" style={{ marginRight: "10px" }}>
          Create User
        </Link>
      )}

      <Link to="/profile" style={{ marginRight: "10px" }}>
        Profile
      </Link>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}
