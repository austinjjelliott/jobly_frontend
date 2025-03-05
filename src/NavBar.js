import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./NavBar.css";

function NavBar({ token, logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    // Dynamic navbar based on whether user is logged in or not
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      {token ? (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login" onClick={logout}>
            Log Out {currentUser && currentUser.username}
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;
