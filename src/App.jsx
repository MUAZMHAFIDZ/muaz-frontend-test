import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuthContext } from "./contexts/AuthContext";
import Profile from "./pages/Profile";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      {/* Rute Login */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      {/* Rute / */}
      <Route
        path="/"
        element={authUser ? <Dashboard /> : <Navigate to="/login" />}
      />
      {/* Rute /profile */}
      <Route
        path="/profile"
        element={authUser ? <Profile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
