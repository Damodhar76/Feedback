import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

const DisplayFormData = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    
    const data = localStorage.getItem('formData');
    if (data) {
      try {
       
        setFormData(JSON.parse(data));
      } catch (error) {
        console.error("Failed to parse form data from local storage:", error);
      }
    } else {
      console.warn("No form data found in local storage.");
    }
  }, []);

  
  const splitIntoLetters = (str) => {
    return str.split('').map((letter, index) => (
      <Typography key={index} component="span" sx={{ marginRight: 0.5 }}>
        {letter}
      </Typography>
    ));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, backgroundColor:'blue', color:'white' }}>
       Generic Website Rating
      </Typography>
      <Grid sx={{boxShadow:"4"}} spacing={2}>
        {Object.entries(formData).length > 0 ? (
          Object.entries(formData).map(([key, value], index) => (
            <Grid sx={{marginLeft:"10px"}} item xs={12} sm={6} md={4} key={index}>
              <div
                sx={{
                  border: '1px solid #ddd',
                  padding: 2,
                  borderRadius: 1,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {key}
                </Typography>
                <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {typeof value === 'string' ? splitIntoLetters(value) : value}
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <Typography>No form data available.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default DisplayFormData;
