import React, { useState } from "react";
import { Box, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Checkbox, Snackbar, Alert, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const FormDisplay = () => {
  const location = useLocation();
  const { fields } = location.state || { fields: [] };
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.label] = ""; // Initialize form data with empty strings
      return acc;
    }, {})
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (event, field) => {
    setFormData({
      ...formData,
      [field.label]: event.target.value
    });
  };

  const handleCheckboxChange = (event, field) => {
    setFormData({
      ...formData,
      [field.label]: event.target.checked ? "on" : "off"
    });
  };

  const handleSmileyChange = (value, field) => {
    setFormData({
      ...formData,
      [field.label]: value
    });
  };

  const handleSubmit = () => {
    // Show popup message with form data
    setSnackbarMessage(`Form submitted with data: ${JSON.stringify(formData)}`);
    setOpenSnackbar(true);
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderField = (field, index) => {
    const value = formData[field.label] || "";

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={index}
            label={field.label}
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={value}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "numeric":
        return (
          <TextField
            key={index}
            label={field.label}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={value}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "textarea":
        return (
          <TextField
            key={index}
            label={field.label}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            size="small"
            value={value}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "rating":
        return (
          <TextField
            key={index}
            label={field.label}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            InputProps={{
              inputProps: { min: 1, max: 10 },
            }}
            value={value}
            onChange={(e) => handleInputChange(e, field)}
          />
        );
      case "star":
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="outlined" size="small">
                ★
              </Button>
            ))}
          </Box>
        );
      case "smiley":
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => handleSmileyChange("happy", field)}>😊</Button>
            <Button variant="outlined" size="small" onClick={() => handleSmileyChange("neutral", field)}>😐</Button>
            <Button variant="outlined" size="small" onClick={() => handleSmileyChange("sad", field)}>😢</Button>
          </Box>
        );
      case "radio":
        return (
          <FormControl key={index} component="fieldset" fullWidth margin="normal" size="small">
            <RadioGroup
              row
              value={value}
              onChange={(e) => handleInputChange(e, field)}
            >
              {[...Array(3)].map((_, i) => (
                <FormControlLabel
                  key={i}
                  value={`option${i + 1}`}
                  control={<Radio size="small" />}
                  label={`Option ${i + 1}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControl key={index} component="fieldset" fullWidth margin="normal" size="small">
            <FormControlLabel
              control={<Checkbox checked={value === "on"} size="small" />}
              label={field.label}
              onChange={(e) => handleCheckboxChange(e, field)}
            />
          </FormControl>
        );
      case "category":
        return (
          <FormControl key={index} fullWidth margin="normal" size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleInputChange(e, field)}
              label={field.label}
            >
              {[...Array(5)].map((_, i) => (
                <MenuItem key={i} value={`category${i + 1}`}>
                  Category {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Generic Website Rating 
      </Typography>
      <Grid spacing={2} sx={{marginLeft: '30px',marginRight:' 30px'}}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box
              sx={{
                border: '1px solid #ddd',
                padding: 2,
                borderRadius: 1,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {field.label}
              </Typography>
              {renderField(field, index)}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button sx={{marginLeft:"10px"}} variant="contained" >
        <Link to="/display" style={{ textDecoration: 'none' }}>input data displa</Link>          
        </Button>
      </Box>
    </Box>
  );
};

export default FormDisplay;
