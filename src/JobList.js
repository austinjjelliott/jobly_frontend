import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import UserContext from "./UserContext";

function JobList() {
  const { currentUser } = useContext(UserContext); // Get current user from context
  const [jobs, setJobs] = useState([]); //starts as an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
    setIsLoading(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const filteredJobs =
      searchTerm.trim() === ""
        ? await JoblyApi.getJobs()
        : await JoblyApi.getJobs(searchTerm);
    setJobs(filteredJobs);
  }

  return (
    <div>
      <h1>All Available Jobs:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Jobs"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {jobs.length ? (
          <div>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} currentUser={currentUser} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default JobList;
