import React, { useEffect, useState } from 'react';
import './App.css';
import Jobs from './Jobs';
import fetch from 'node-fetch';


const JOBS_API_URL = "http://localhost:3001/jobs";
async function fetchJobs(setJobs) {
  const response = await fetch(JOBS_API_URL);
  const json = await response.json();
  setJobs(json);
}

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    console.log('useEffect is called');
    fetchJobs(setJobs);
  }, []);

  return (
    <div className="App">
     <Jobs jobs={jobs}/>
    </div>
  );
}

export default App;
