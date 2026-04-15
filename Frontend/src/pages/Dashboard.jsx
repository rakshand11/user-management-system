import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/user/get-profile").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  if (!user) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
}
