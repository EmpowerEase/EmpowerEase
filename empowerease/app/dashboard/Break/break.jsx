// //date selection, break time duration, how many times you want to take break at least
"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Break = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [numBreaks, setNumBreaks] = useState(0);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddBreak = () => {
    // Implement your logic to handle adding a break
    handleCloseModal();
  };
  const handleIncrement = () => {
    setNumBreaks((prevNumBreaks) => prevNumBreaks + 1);
  };

  const handleDecrement = () => {
    if (numBreaks > 0) {
      setNumBreaks((prevNumBreaks) => prevNumBreaks - 1);
    }
  };

  return (
    <div>
      {/* Button to open the modal */}
      <Button variant="outlined" color="primary" onClick={handleOpenModal}>
        Add Break
      </Button>

      {/* Modal */}
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
            Add Break
          </Typography>
          {/* Add your form or content for adding a break here */}
          {/* Break time duration text field*/}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Break Time Duration
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              // Add necessary state and onChange handler
            />
          </Box>
          {/* Number of breaks increment and decrement */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Number of breaks
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={numBreaks}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleDecrement} edge="start">
                      <RemoveIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleIncrement} edge="end">
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Add Button */}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddBreak}
            sx={{ marginTop: 2 }}
          >
            Add Break
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Break;
