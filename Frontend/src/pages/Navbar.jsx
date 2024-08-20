import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <span className="item">
        <Link to="/">Home</Link>
      </span>
      <span className="item">
        <Link to="/create-recipe">Create recipe</Link>
      </span>
      <span className="item">
        <Link to="/saved-recipe">Saved recipe</Link>
      </span>
      <span className="item">
        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </span>
    </div>
  );
}

export default Navbar;
