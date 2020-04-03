import React from 'react';
import { Typography } from '@material-ui/core';

function Job({ job }) {

  return (
    <div className="job">
        <div>
          <Typography variant="h6">{ job.title }</Typography>
          <Typography variant="h5">{ job.company }</Typography>
          <Typography>{ job.location }</Typography>
      </div>
      <div>
  <Typography>{job.created_at.split(' ').slice(0, 3)}</Typography>
      </div>
    </div>
  );
}

export default Job;