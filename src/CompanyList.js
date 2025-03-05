import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
//
function CompanyList() {
  const [companies, setCompanies] = useState([]); //starts as an empty array
  const [searchTerm, setSearchTerm] = useState(""); //starts empty string

  useEffect(() => {
    async function fetchCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    fetchCompanies();
  }, []); //loads on mount

  async function handleSubmit(e) {
    e.preventDefault();
    const filteredCompanies =
      searchTerm.trim() === ""
        ? await JoblyApi.getCompanies()
        : await JoblyApi.getCompanies(searchTerm);
    setCompanies(filteredCompanies);
  }

  return (
    <div>
      <h1>Companies:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Companies"
        />
        <button type="submit">Search</button>
      </form>
      {companies.length ? (
        <div>
          {companies.map((company) => (
            <CompanyCard key={company.handle} company={company} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default CompanyList;
