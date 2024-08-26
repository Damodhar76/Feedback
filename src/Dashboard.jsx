// import React from 'react';
// import { Button, Container, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

// function Dashboard() {
//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Feedback Forms
//       </Typography>
//       <Link to="/create" style={{ textDecoration: 'none' }}>
//         <Button variant="contained" color="primary">
//           Create New Form
//         </Button>
//       </Link>
//       {/* List of forms will go here */}
//     </Container>
//   );
// }

// export default Dashboard;

import React from 'react';
import { Box, Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const forms = [
    {
      title: 'Delivery',
      submitted: 10,
      viewed: 55,
      datePublished: '08/08/2024',
    },
    {
      title: 'Product Quality',
      submitted: 100,
      viewed: 300,
      datePublished: '07/08/2024',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Feedback
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/create" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary" sx={{ height: 200 }}>
            New Form
          </Button>
          </Link>
            
          </Card>
        </Grid>
        {forms.map((form, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {form.title}
                </Typography>
                <Typography>Submitted: {form.submitted}</Typography>
                <Typography>Viewed: {form.viewed}</Typography>
                <Typography>Date Published: {form.datePublished}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                <Button variant="contained" color="primary">
                  Submission
                </Button>
                <Button variant="outlined" color="success">
                  Edit
                </Button>
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
