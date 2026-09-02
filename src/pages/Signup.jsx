import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {

      const response = await getUsers();

      const existingUser = response.data.find(
        (user) => user.email === email
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      const newUser = {
        name: name,
        email: email,
        password: password
      };

      await createUser(newUser);

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {

      console.error(error);

      setError(
        "Unable to create account. Make sure JSON Server is running."
      );

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card signup-card">

        <div className="auth-logo">
          🍴 FoodieHub
        </div>

        <span className="auth-tag">
          JOIN FOODIEHUB
        </span>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Join us and discover your next favourite meal.
        </p>

        <form onSubmit={handleSignup}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
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
            Create Account →
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;