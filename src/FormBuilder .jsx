import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Drawer,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import StarIcon from "@mui/icons-material/Star";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFieldType, setNewFieldType] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [conditionalLogic, setConditionalLogic] = useState({ url: "", data: "" });
  const [showConditionalFields, setShowConditionalFields] = useState(false);
  const [timeCondition, setTimeCondition] = useState({ start: "", end: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const startHour = parseInt(timeCondition.start.split(':')[0] || 0, 10);
    const endHour = parseInt(timeCondition.end.split(':')[0] || 24, 10);
    
    setShowConditionalFields(currentHour >= startHour && currentHour < endHour);
  }, [timeCondition]);

  const addField = () => {
    if (newFieldType) {
      setFields([
        ...fields,
        {
          type: newFieldType,
          label: fieldLabel || "New Field",
          conditions: conditionalLogic,
        },
      ]);
      setFieldLabel("");
      setNewFieldType("");
      setDialogOpen(false);
    }
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };

  const renderField = (field, index) => {
    if (field.conditions.url && !window.location.href.includes(field.conditions.url)) {
      return null;
    }
    if (field.conditions.data && !field.conditions.data.includes("specific data")) {
      return null;
    }
    if (!showConditionalFields) {
      return null;
    }

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={index}
            label={field.label || "Text Input"}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        );
      case "numeric":
        return (
          <TextField
            key={index}
            label={field.label || "Numeric Input"}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        );
      case "star":
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            {[...Array(5)].map((_, i) => (
              <Button key={i} variant="outlined">
                ★
              </Button>
            ))}
          </Box>
        );
      case "textarea":
        return (
          <TextField
            key={index}
            label={field.label || "Textarea Input"}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        );
      case "rating":
        return (
          <TextField
            key={index}
            label={field.label || "Numeric Rating"}
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { min: 1, max: 10 },
            }}
          />
        );
      case "smiley":
        return (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
             <SentimentSatisfiedIcon /> 
            <SentimentDissatisfiedIcon /> 
            <SentimentVerySatisfiedIcon /> 
            <SentimentNeutralIcon /> 
            <SentimentVeryDissatisfiedIcon /> 
          </Box>
        );
      case "radio":
        return (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <FormControl component="fieldset">
              <RadioGroup row>
                {[...Array(3)].map((_, i) => (
                  <FormControlLabel key={i} value={`option${i + 1}`} control={<Radio />} label={`Option ${i + 1}`} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case "checkbox":
        return (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <FormControlLabel control={<Checkbox />} label="Check this box" />
          </Box>
        );
      case "category":
        return (
          <TextField
            key={index}
            label={field.label || "Category"}
            variant="outlined"
            fullWidth
            margin="normal"
            select
          >
            {[...Array(5)].map((_, i) => (
              <MenuItem key={i} value={`category${i + 1}`}>
                Category {i + 1}
              </MenuItem>
            ))}
          </TextField>
        );
      default:
        return null;
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setFieldLabel(fields[index].label);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: 240, flexShrink: 0 }}
      >
        <Box sx={{ width: 240, padding: 2 }}>
          <Typography variant="h6">Add Fields</Typography>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("textarea");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Textarea
          </Button>
          <Button
            variant="outlined"
            startIcon={<AssessmentIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("rating");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Numeric Rating
          </Button>
          <Button
            variant="outlined"
            startIcon={<StarIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("star");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Star Rating
          </Button>
          <Button
            variant="outlined"
            startIcon={<SentimentSatisfiedIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("smiley");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Smiley Rating
          </Button>
          <Button
            variant="outlined"
            startIcon={<RadioButtonCheckedIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("radio");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Radio Button
          </Button>
          <Button
            variant="outlined"
            startIcon={<CheckBoxIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("checkbox");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Checkbox
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            fullWidth
            onClick={() => {
              setNewFieldType("category");
              setDialogOpen(true);
            }}
            sx={{ my: 1 }}
          >
            Category
          </Button>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Conditional Logic
          </Typography>
          <TextField
            label="URL Condition"
            variant="outlined"
            fullWidth
            margin="normal"
            value={conditionalLogic.url}
            onChange={(e) => setConditionalLogic({ ...conditionalLogic, url: e.target.value })}
          />
          <TextField
            label="Data Condition"
            variant="outlined"
            fullWidth
            margin="normal"
            value={conditionalLogic.data}
            onChange={(e) => setConditionalLogic({ ...conditionalLogic, data: e.target.value })}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Time-Based Logic
          </Typography>
          <TextField
            label="Start Time (HH:mm)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={timeCondition.start}
            onChange={(e) => setTimeCondition({ ...timeCondition, start: e.target.value })}
          />
          <TextField
            label="End Time (HH:mm)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={timeCondition.end}
            onChange={(e) => setTimeCondition({ ...timeCondition, end: e.target.value })}
          />
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Button
          variant="contained"
          onClick={() => setDrawerOpen(true)}
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          Add Field
        </Button>
        <Grid
          sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 1, backgroundColor: '#f9f9r8' }}
          spacing={2}
        >
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 1, backgroundColor: '#f9f9f9' }}>
                <Box sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  {renderField(field, index)}
                  
                </Box>
                <Box sx={{ justifyContent: 'space-between', mt: 1 }}>
                    <IconButton onClick={() => handleEditClick(index)} sx={{ m: 0.5 }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => removeField(index)} sx={{ m: 0.5 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Field</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Field Label"
            type="text"
            fullWidth
            variant="standard"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={addField}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormBuilder;
