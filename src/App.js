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
      <Box>
        <Box display='flex'>
          <TextField
            value={username}
            disabled={isLoading}
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
        {error && (
          <Typography color='error'>{error}</Typography>
        )}
        {repositories === null ? (
          <Typography variant='h6'>
            Enter username and click "Search"
          </Typography>
        ) : (
          <RepositoriesGrid repositories={repositories} />
        )}
      </Box>
    </Container>
  );
}

export default App;
