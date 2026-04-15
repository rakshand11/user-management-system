import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/admin/create", form);

      setMessage(data.msg);

      if (data.temporaryPassword) {
        alert(`Temporary Password: ${data.temporaryPassword}`);
      }

      setTimeout(() => {
        navigate("/users");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Error creating user");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Create User</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Password (optional)"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div>
          <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <select
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Create User
        </button>
      </form>
    </div>
  );
}
