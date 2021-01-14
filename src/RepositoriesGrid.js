import React, { useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Grid,
  Paper,
} from '@material-ui/core';

export default function RepositoriesGrid({ repositories }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedRepositories = sort(repositories, sortBy);

  function getContent() {
    if (repositories.length === 0) {
      return (
        <Box mt={3}>
          <Typography variant='h6'>No repositories</Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {sortedRepositories.map(repository => (
          <Grid item xs={12} sm={6} md={4} key={repository.id}>
            <Paper elevation={2}>
              <Box p={2}>
                <Typography variant='h6'>
                  {repository.full_name}
                </Typography>
                <Typography>
                  {repository.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant='subtitle2'>
                    <Box component='span' mr={2}>
                      Stars: {repository.stargazers_count}
                    </Box>
                    Watchers: {repository.watchers_count}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  };

  return (
    <Box>
      <Typography variant='h6'>Sort by</Typography>
      <FormControl component="fieldset">
        <RadioGroup name="sortBy" value={sortBy} onChange={handleSortChange} row>
          <FormControlLabel value="name" control={<Radio color='primary' />} label="Name" />
          <FormControlLabel value="stars" control={<Radio color='primary' />} label="Stars" />
        </RadioGroup>
      </FormControl>
      <Box mt={1} mb={3}>
        <Divider />
      </Box>
      {getContent()}
    </Box>
  )

}

function sort(repositories, sortBy) {
  return repositories.sort((a, b) => {
    if (sortBy === 'name') {
      return b.name.localeCompare(a.name, undefined, { sensitivity: 'accent' })
    }

    return b.stargazers_count - a.stargazers_count;
  });
}