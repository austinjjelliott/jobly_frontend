import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoutes";

function JoblyRoutes({ signup, login, updateUser }) {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Simple Welcome Message */}
      <Route
        path="/companies"
        element={<PrivateRoute element={<CompanyList />} />}
      />
      {/* List all Companies */}
      <Route
        path="/companies/:handle"
        element={<PrivateRoute element={<CompanyDetail />} />}
      />
      {/* List company details */}
      <Route
        path="/jobs"
        element={<PrivateRoute element={<JobList />} />}
      />{" "}
      {/* list all JOBs */}
      <Route path="/login" element={<LoginForm login={login} />} />{" "}
      {/* login */}
      <Route path="/signup" element={<SignupForm signup={signup} />} />{" "}
      {/* signup */}
      <Route
        path="/profile"
        element={<ProfileForm updateUser={updateUser} />}
      />{" "}
      {/* edit profile */}
      <Route path="*" element={<NotFound />} />
      {/* Catch-all for invalid URLs */}
    </Routes>
  );
}

export default JoblyRoutes;
