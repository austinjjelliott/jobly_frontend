import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./CompanyDetail.css";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import UserContext from "./UserContext";

function CompanyDetail({ applyToJob }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchCompany() {
      const singleCompany = await JoblyApi.getCompany(handle);
      setCompany(singleCompany);
    }
    fetchCompany();
    setIsLoading(false);
  }, [handle]);

  if (isLoading) return <p>Loading...</p>;
  if (!company)
    return (
      <div>
        <p>No company found. Please visit homepage to start again</p>
      </div>
    );

  return (
    <div className="CompanyDetail">
      <div className="title">
        <h2> {company.name} </h2>
        <p> {company.description}</p>
      </div>
      <h3>Jobs...</h3>
      <div className="JobList">
        {company.jobs.map((job) => (
          <JobCard key={job.id} job={job} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
