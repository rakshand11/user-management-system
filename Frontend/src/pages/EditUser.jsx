import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await API.get(`/admin/users/${id}`);
      const user = data.user;

      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        password: "",
      });
    } catch (error) {
      console.error("Error fetching user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let endpoint = "";

      if (currentUser.role === "admin") {
        endpoint = `/admin/update/${id}`;
      } else if (currentUser.role === "manager") {
        endpoint = `/admin/manager/update/${id}`;
      }

      const { data } = await API.put(endpoint, form);

      setMessage(data.msg);

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Edit User</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <input
            value={form.email}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {currentUser.role === "admin" && (
          <>
            <div>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </>
        )}

        {currentUser.role === "manager" && (
          <div>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}

        <div>
          <input
            type="password"
            placeholder="New Password (optional)"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Update User
        </button>
      </form>
    </div>
  );
}
