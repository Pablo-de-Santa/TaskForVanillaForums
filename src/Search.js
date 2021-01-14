import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

export default function Search({
  disabled,
  error,
  placeholder,
  onSearchButtonClick }) {
  const [search, setSearch] = useState('');

  return (
    <Box display='flex' mx='auto' mt={5} mb={4}>
      <TextField
        value={search}
        disabled={disabled}
        variant='outlined'
        size='small'
        helperText={error}
        error={error}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box ml={1}>
        <Button
          color='primary'
          variant='contained'
          onClick={() => onSearchButtonClick(search)}
          disabled={disabled}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}
