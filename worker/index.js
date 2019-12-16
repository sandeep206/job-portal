var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github');

// fetch github jobs
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');

// fetch linkdin jobs // run every 2 mins
// fetch monster jobs