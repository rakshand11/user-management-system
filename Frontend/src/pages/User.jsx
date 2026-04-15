import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get(
        `/admin/users?search=${search}&page=${page}&limit=5`,
      );

      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching users");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/admin/delete/${id}`);
      fetchUsers();
    } catch (error) {
      alert("Error deleting user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      <input
        placeholder="Search by name/email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      {currentUser.role === "admin" && (
        <div style={{ marginBottom: "10px" }}>
          <Link to="/create-user">Create New User</Link>
        </div>
      )}

      {users.map((u) => (
        <div
          key={u._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <p>
            <strong>{u.name}</strong>
          </p>
          <p>{u.email}</p>
          <p>Role: {u.role}</p>
          <p>Status: {u.status}</p>

          <Link to={`/edit-user/${u._id}`}>Edit</Link>

          {currentUser.role === "admin" && (
            <button
              onClick={() => deleteUser(u._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {pagination.currentPage || 1}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
