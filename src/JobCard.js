import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import "./JobCard.css";

function JobCard({ job, currentUser }) {
  const [applied, setApplied] = useState(false);

  // Fetch applied jobs from localStorage when the component mounts
  useEffect(() => {
    if (currentUser) {
      const appliedJobs =
        JSON.parse(
          localStorage.getItem(`applied-jobs-${currentUser.username}`)
        ) || [];
      setApplied(appliedJobs.includes(job.id)); // Check if this job is already applied
    }
  }, [currentUser, job.id]);

  const handleApply = async () => {
    if (!currentUser) {
      alert("Please log in to apply for jobs.");
      return;
    }
    try {
      await JoblyApi.applyToJob(currentUser.username, job.id);
      setApplied(true); // Update the button to "Applied"
      // Store applied job in localStorage specific to the current user
      const appliedJobs =
        JSON.parse(
          localStorage.getItem(`applied-jobs-${currentUser.username}`)
        ) || [];
      localStorage.setItem(
        `applied-jobs-${currentUser.username}`,
        JSON.stringify([...appliedJobs, job.id])
      );
    } catch (err) {
      console.error("Error applying for job", err);
    }
  };

  return (
    <div className="JobCard">
      <h3>Title: {job.title}</h3>
      <h4>{job.companyName}</h4>
      <br />
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity} </p>
      <button
        onClick={handleApply}
        disabled={applied} // Disable the button if already applied
      >
        {applied ? "Applied" : "Apply"}
      </button>{" "}
    </div>
  );
}

export default JobCard;

//
