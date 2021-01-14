import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button } from '@material-ui/core';
import RepositoriesGrid from './RepositoriesGrid';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState(null);

  function search() {
    if (!username) {
      setError('Enter username');
      return;
    }

    setError(null);
    setIsLoading(true);

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        setRepositories(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch(() => {
        setError('User doesn\'t exist');
        setIsLoading(false);
      })
  }

  return (
    <Container>
      <Box mt={4}>
        <Typography variant='h4' align='center'>
          Search github repositories by username
        </Typography>
      </Box>
      <Box display='flex' width='100%'>
        <Box display='flex' mx='auto' mt={5} mb={4}>
          <TextField
            value={username}
            disabled={isLoading}
            variant='outlined'
            size='small'
            helperText={error}
            error={error}
            placeholder='Search GitHub users'
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box ml={1}>
            <Button
              color='primary'
              variant='contained'
              onClick={search}
              disabled={isLoading}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      {repositories !== null && (
        <>
          <Box mb={1}>
            <Typography variant='h5'>Listing repositories for the user "{username}"</Typography>
          </Box>
          <RepositoriesGrid repositories={repositories} />
        </>
      )}
    </Container>
  );
}

export default App;
