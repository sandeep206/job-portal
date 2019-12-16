var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = `https://jobs.github.com/positions.json`;

//fetch all pages
async function fetchGithub() {
  let resultCount = 1, onPage = 0, allJobs = [];
  
  while(resultCount > 0) {
    const response  = await fetch (`${baseURL}?page=${onPage}`);
    const jobs = await response.json();
    resultCount = jobs.length;
    console.log(`got ${resultCount} jobs`);
    allJobs.push(...jobs);
    
    onPage++;
  }


  //filter alogrithm

  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    console.log('jobTitle', typeof jobTitle);
    if (jobTitle.includes('senior') ||
        jobTitle.includes('manager') ||
        jobTitle.includes('sr.') ||
        jobTitle.includes('architect')) {
          return false;
    }
    return true;
  });
  console.log(`got ${allJobs.length} jobs in total`);

  console.log('filtered down to', jrJobs.length);

  // setin redis
  const success = await setAsync('github', JSON.stringify(jrJobs));
  console.log(success);
}

// fetchGithub();

module.exports = fetchGithub;