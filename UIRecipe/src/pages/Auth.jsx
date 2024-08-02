import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
      });
      alert("REGISTERED SUCCESSFULLY !");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={HandleSubmit}>
        <h1>Register form</h1>
        <div className="formGroup">
          <label>Username : </label>
          <input
            required
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Password : </label>
          <input
            required
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <form onSubmit={HandleSubmit}>
        <h1>Login form</h1>
        <div className="formGroup">
          <label>Username : </label>
          <input
            required
            type="text"
            id="username1"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Password : </label>
          <input
            required
            type="password"
            id="password1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login </button>
      </form>
    </div>
  );
};

export default Auth;
