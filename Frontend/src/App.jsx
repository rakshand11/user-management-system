import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Profile from "./pages/Profile";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-user/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <EditUser />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
