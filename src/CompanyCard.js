import React from "react";
import "./CompanyCard.css";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div>
      <Link to={`/companies/${company.handle}`}>
        <div className="CompanyCard">
          <h3>{company.name}</h3>
          <p>{company.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;
