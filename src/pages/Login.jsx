import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ThemeToggle from "../components/button/ThemeToggle";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = login(username, password);

    if (res.status === "success") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 md:px-0 dark:bg-gray-900 flex flex-col">
      <header className="p-4 flex justify-end">
        <ThemeToggle />
      </header>

      <main className="flex-grow flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
}
