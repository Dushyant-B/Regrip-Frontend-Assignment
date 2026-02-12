import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/board");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("user", name);
    navigate("/board");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
          Login to Kanban
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
