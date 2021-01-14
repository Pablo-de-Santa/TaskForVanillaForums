import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@material-ui/core';
import RepositoriesGrid from './RepositoriesGrid';
import Search from './Search';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState(null);

  function search(username) {
    if (!username) {
      setError('Enter username');
      return;
    }

    setUsername(username);
    setError(null);
    setIsLoading(true);

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        setRepositories(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('User doesn\'t exist');
        setIsLoading(false);
      })
  }

  return (
    <>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Box mt={4}>
          <Typography variant='h4' align='center'>
            Search github repositories by username
          </Typography>
        </Box>
        <Box display='flex' width='100%'>
          <Search
            disabled={isLoading}
            error={error}
            onSearchButtonClick={search}
            placeholder='Search GitHub users'
          />
        </Box>
        {repositories !== null && (
          <>
            <Box mb={1}>
              <Typography variant='h5'>Listing repositories for the user "{username}"</Typography>
            </Box>
            <RepositoriesGrid repositories={repositories} />
          </>
        )}
        <Box mt='auto' py={3}>
          <Typography align='center' variant='body1'>
            Developed by Paul Nohtiev for Vanilla Forums
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;
