import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [form, setForm] = useState({ name: "", password: "" });

  useEffect(() => {
    API.get("/user/get-profile").then((res) => {
      setForm({ name: res.data.user.name, password: "" });
    });
  }, []);

  const update = async () => {
    await API.put("/user/update", form);
    alert("Profile updated");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>My Profile</h2>

        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-success" onClick={update}>
          Update
        </button>
      </div>
    </div>
  );
}
