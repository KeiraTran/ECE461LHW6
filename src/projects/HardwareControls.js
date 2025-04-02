import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const HardwareControls = ({ label, availableQty, setNumber, projectId, onCheckIn, onCheckOut }) => {
  const [inputQty, setInputQty] = useState("");

  const handleCheckIn = () => {
    const qty = parseInt(inputQty, 10);
    if (!isNaN(qty) && qty > 0 && qty <= availableQty) {
      onCheckIn(projectId, setNumber, qty);
      setInputQty("");
    }
  };

  const handleCheckOut = () => {
    const qty = parseInt(inputQty, 10);
    if (!isNaN(qty) && qty > 0) {
      onCheckOut(projectId, setNumber, qty);
      setInputQty("");
    }
  };




  
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
      <Typography variant="body1">{label} (Checked Out: {availableQty})</Typography>
      <TextField
        size="small"
        placeholder="Enter qty"
        variant="outlined"
        sx={{ width: "80px" }}
        value={inputQty}
        onChange={(e) => setInputQty(e.target.value)}
      />
      <Button variant="contained" size="small" color="primary" onClick={handleCheckIn} disabled={availableQty === 0}>
        Check In
      </Button>
      <Button variant="contained" size="small" color="secondary" onClick={handleCheckOut}>
        Check Out
      </Button>
    </Box>
  );
};

export default HardwareControls;
