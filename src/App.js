import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import NavBar from "./NavBar";
import JoblyRoutes from "./Routes";
import JoblyApi from "./api";
import UserContext from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("jobly-token") || null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          localStorage.setItem("jobly-token", token);
          JoblyApi.token = token;
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error Loading User", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [token]); //Change it everytime the token changes (ie new user)

  async function login(credentials) {
    try {
      const token = await JoblyApi.login(credentials);
      setToken(token);
    } catch (err) {
      console.error("ERROR LOGGING IN", err);
      throw err;
    }
  }
  async function signup(userData) {
    try {
      const token = await JoblyApi.register(userData);
      setToken(token);
    } catch (err) {
      console.error("ERROR SIGNING UP", err);
      throw err;
    }
  }

  async function updateUser(username, userData) {
    try {
      // Make sure the username is passed in the URL path when making the PATCH request
      const res = await JoblyApi.updateUser(username, userData); // Pass username from context
      setCurrentUser(res); // Update the context with the new user data
    } catch (err) {
      console.error("Error updating profile", err);
      throw err;
    }
  }

  async function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("jobly-token");
    localStorage.removeItem(`applied-jobs-${currentUser?.username}`);
    JoblyApi.token = null;
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, token, setToken }}
    >
      <BrowserRouter>
        <NavBar logout={logout} token={token} />
        <JoblyRoutes login={login} signup={signup} updateUser={updateUser} />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

//
