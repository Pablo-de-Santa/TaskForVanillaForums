import React, { useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

export default function ({ repositories }) {
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

    return sortedRepositories.map(repository => (
      <Box key={repository.id}>{repository.name} - {repository.stargazers_count}</Box>
    ));
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  };

  return (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Sort by</FormLabel>
        <RadioGroup name="sortBy" value={sortBy} onChange={handleSortChange}>
          <FormControlLabel value="name" control={<Radio />} label="Name" />
          <FormControlLabel value="stars" control={<Radio />} label="Stars" />
        </RadioGroup>
      </FormControl>
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