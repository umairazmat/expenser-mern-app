import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ErrorPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h2" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The requested page could not be found.
      </Typography>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography variant="body1" color="primary">
          Go back to Home
        </Typography>
      </Link>
    </Box>
  );
};

export default ErrorPage;
