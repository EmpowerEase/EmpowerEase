/* @jsxImportSource react */
"use client";
import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Modal, Typography, TextField, Slider, InputLabel, MenuItem, FormControl, Select} from "@mui/material";

function Goal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submittedGoals, setSubmittedGoals] = useState([]);
  const [isPendingModalOpen, setPendingModalOpen] = useState(false);
  const [difficultyValue, setDifficultyValue] = useState(5);
  const [completionSelection, setCompletionSelection] = React.useState("");
  const [debriefSubmit, setSubmittedDebrief] = useState([]);
  
  const handleSubmitDebrief = () => {
    // Do something with the selected values and send them to an API
    console.log("Completion Selection:", completionSelection);
    console.log("Difficulty Value:", difficultyValue);
    
    // Reset the form after submission if needed
    setCompletionSelection(10);
    setDifficultyValue(0);

    handlePendingCloseModal();
  };

  const handleChange = (event) => {
    setCompletionSelection(event.target.value);
  };
  
  const handleSliderChange = (event, newValue) => {
        setDifficultyValue(newValue);
    };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePendingOpenModal = () => {
    setPendingModalOpen(true);
  };

  const handlePendingCloseModal = () => {
    setPendingModalOpen(false);
    };

  const handleAddGoal = () => {
    // Add the submitted goal to the submittedGoals array
    const newGoal = {
      goalText: goalText,
      estimatedTime: estimatedTime,
      deadline: deadline,
      completed: false, // Initialize as not completed
    };
    setSubmittedGoals((prevGoals) => [...prevGoals, newGoal]);

    // Clear the form fields
    setGoalText("");
    setEstimatedTime("");
    setDeadline("");

    handleCloseModal();
  };

  // useEffect to simulate toggling between "Pending" and "Completed"
  useEffect(() => {
    // Your logic for handling goal completion status here
    console.log("Goal completion status updated:", submittedGoals);
  }, [submittedGoals]);

  const handleCompleteGoal = (index) => {
    // Toggle the completion status for the selected goal
    // setSubmittedGoals((prevGoals) =>
    //   prevGoals.map((goal, i) =>
    //     i === index ? { ...goal, completed: !goal.completed } : goal
    //   )
    // );
    handlePendingOpenModal(index);
  };

  const handleDeleteGoal = (index) => {
    // Remove the selected goal from the submittedGoals array
    setSubmittedGoals((prevGoals) =>
      prevGoals.filter((goal, i) => i !== index)
    );
  };

  

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFF",
        padding: 2,
        borderRadius: 4,
        border: "1px solid black",
        maxWidth: 360,
      }}
    >
      {/* Add goal button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <h2 style={{ marginRight: "16px" }}>My goal</h2>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          size="small"
          sx={{ marginRight: "8px" }}
          onClick={handleOpenModal}
        >
          Add
        </Button>
      </Box>
      {/* List */}
      {submittedGoals.length === 0 ? (
        <Typography variant="body1" sx={{ margin: 2 }}>
          You currently do not have any goals. Add some goals to fill in this
          view
        </Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {submittedGoals.map((goal, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid black",
                borderRadius: 4,
                marginBottom: 2,
                overflow: "hidden", // Optional: Hides overflow content
                padding: "20px",
                opacity: goal.completed ? 0.5 : 1,
              }}
            >
              <ListItem disableGutters>
                <ListItemText
                  primary={`Goal: ${goal.goalText}`}
                  secondary={`Estimated Time: ${goal.estimatedTime}, Deadline: ${goal.deadline}`}
                />
                {/* Complete Button */}
                <Button
                  variant="outlined"
                  color={goal.completed ? "secondary" : "primary"}
                  onClick={() => handleCompleteGoal(index)}
                  disabled={goal.completed}
                  sx={{
                    marginRight: 2,
                    width: "220px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <CheckCircleIcon />
                  {goal.completed ? "Completed" : "Pending"}
                </Button>
                {/* Delete Button */}
                {!goal.completed && (
                  <Button
                    variant="outlined"
                    // color="secondary"
                    onClick={() => handleDeleteGoal(index)}
                    sx={{
                      color: "#e53935",
                      border: "1px solid #e53935",
                      marginRight: 2,
                      width: "220px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon />
                    Delete
                  </Button>
                )}
              </ListItem>
            </Box>
          ))}
        </List>
      )}

      {/* Pending completion of goal debrief modal: difficulty slider, duration of time to complete the task dropdown*/}
      <Modal open={isPendingModalOpen} onClose={handlePendingCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Debrief Form
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Difficulty of task
          </Typography>
          <Slider
            value={difficultyValue}
            onChange={(e, newValue) => setDifficultyValue(newValue)}
            min={0}
            max={10}
            step={1}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => value.toString()}
          />
          <Typography variant="subtitle1" gutterBottom>
            Duration of time
          </Typography>
          <FormControl fullWidth>
            <InputLabel
              id="completionSelectionLabel"
              htmlFor="completionSelection"
            >
              Completion Selection
            </InputLabel>
            <Select
              id="completionSelection"
              value={completionSelection}
              onChange={handleChange}
            >
              <MenuItem value="On time">Completed on time</MenuItem>
              <MenuItem value="More time">Needed more time</MenuItem>
              <MenuItem value="Less time">Done in less time</MenuItem>
            </Select>
          </FormControl>
          {/* Add Debrief Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmitDebrief}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
      {/* Goal form modal: goal text box, estimated time, and deadline datetime */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Goal Form
          </Typography>
          {/* Goal Text */}
          <Typography variant="subtitle1" gutterBottom>
            Description
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
          />

          {/* Estimated Time */}
          <Typography variant="subtitle1" gutterBottom>
            Estimated Time
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />

          {/* Deadline */}
          <Typography variant="subtitle1" gutterBottom>
            Deadline
          </Typography>
          <TextField
            variant="outlined"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {/* Add Goal Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddGoal}
            sx={{ marginTop: 2 }}
          >
            Add Goal
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Goal;