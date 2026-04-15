import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/user/get-profile");
      setProfile(data.user);
    } catch (error) {
      console.error("Error fetching profile");
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h3>Welcome, {profile.name}</h3>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>

      <hr />

      {profile.role === "admin" && (
        <div>
          <h2>Admin Panel</h2>
          <p>You can manage all users, roles, and permissions.</p>
        </div>
      )}

      {profile.role === "manager" && (
        <div>
          <h2>Manager Panel</h2>
          <p>You can view and update users (except admins).</p>
        </div>
      )}

      {profile.role === "user" && (
        <div>
          <h2>User Panel</h2>
          <p>You can manage your own profile.</p>
        </div>
      )}
    </div>
  );
}
