import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    const { data } = await API.get(`/admin/users?search=${search}`);
    setUsers(data.users);
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/delete/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>Users</h2>

      <input
        placeholder="Search users..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.map((u) => (
        <div className="card" key={u._id}>
          <h3>{u.name}</h3>
          <p>{u.email}</p>
          <p style={{ color: "#6b7280" }}>{u.role}</p>

          <div>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/edit-user/${u._id}`)}
            >
              Edit
            </button>

            {currentUser.role === "admin" && (
              <button
                className="btn btn-danger"
                onClick={() => deleteUser(u._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
