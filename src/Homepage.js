import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Homepage.css";
function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome To Jobly</h1>
      {/* DYNAMIC homepage based on whether logged in or not  */}
      <nav className="Homepage">
        {currentUser ? (
          <>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup">Sign Up</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default Homepage;
//
