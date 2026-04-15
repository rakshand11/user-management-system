import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/user/get-profile");
      setUserInfo(data.user);
      setForm({ name: data.user.name, password: "" });
    } catch (error) {
      console.error("Error fetching profile");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.put("/user/update", form);
      setMessage(data.msg);

      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.name = form.name;
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (error) {
      setMessage(error.response?.data?.msg || "Update failed");
    }
  };

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>My Profile</h2>

      {message && <p>{message}</p>}

      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Role:</strong> {userInfo.role}
      </p>

      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="New Password (optional)"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Update Profile
        </button>
      </form>
    </div>
  );
}
