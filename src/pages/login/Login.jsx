import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!username || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await newRequest.post("/auth/login",{username,password});
      localStorage.setItem("currentUser",JSON.stringify(res.data))
      navigate("/") // Redirect to home page after successful login
      console.log(res.data);
      setError(null); // Clear the error if login is successful
      // Handle success (e.g., redirect to another page or update UI)
    } catch (err) {
      setError(err.response.data);
      
    }
  };

  return (
    <div className="login-wrapper">

    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          />

        {error && <div className="error">{error}</div>} {/* Display error if any */}

        <button type="submit">Login</button>
        
      </form>
    </div>
          </div>
  );
}

export default Login;
