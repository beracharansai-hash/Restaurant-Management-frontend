import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {

      const response = await getUsers();

      const user = response.data.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (user) {

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(user)
        );

        navigate("/");

      } else {

        setError("Invalid email or password.");

      }

    } catch (error) {

      setError(
        "Unable to connect to server. Please start JSON Server."
      );

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          🍴 FoodieHub
        </div>

        <span className="auth-tag">
          WELCOME BACK
        </span>

        <h1>Login to your account</h1>

        <p className="auth-subtitle">
          Sign in and continue exploring delicious food.
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
          >
            Login →
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Create one
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;