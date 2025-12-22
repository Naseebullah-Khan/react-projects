import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "/.netlify/functions/fetch-tabs";
function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }
  const { company, title, duties, dates } = jobs[index];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, value) => {
            return (
              <button
                onClick={() => setIndex(value)}
                key={job.id}
                className={`job-btn ${value === index && "active-btn"}`}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button className="btn">more info</button>
    </section>
  );
}

export default App;
