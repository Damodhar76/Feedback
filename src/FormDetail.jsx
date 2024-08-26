import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function FormDetail() {
  const { id } = useParams();
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Form Details - ID: {id}
      </Typography>
      {/* Display form details and submissions here */}
    </Container>
  );
}

export default FormDetail;
