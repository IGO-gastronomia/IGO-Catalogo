import { useState } from "react";
import Stock from "./Stock";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Datos de ejemplo
    const correctUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const correctPassword = import.meta.env.VITE_ADMIN_USERNAME;

    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-100 pt-40">
      {isAuthenticated ? (
        <Stock></Stock>
      ) : (
        <div className="bg-white max-h-72 rounded shadow-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
            >
              Ingresar
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}
