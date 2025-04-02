import React from "react";
import { Button, Box, Typography, ThemeProvider, createTheme } from "@mui/material";
import HardwareControls from "./HardwareControls";

const theme = createTheme({
    palette: {
        primary: {
            main: '#a1b5d8'
        },
        secondary: {
            main: '#738290'
        }
    }
  });

  

const ProjectItem = ({ project, onJoinLeave, onCheckIn, onCheckOut }) => {
  return (
    <ThemeProvider theme={theme}>
    <Box //Use at least two components (e.g., Button) from a library
      sx={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: project.joined ? "#ecfee8" : "white",
      }}
    >


      <Typography variant="h6">{project.name}</Typography>
      <Typography variant="h7">{project.id}</Typography>
      <Typography variant="body2" color="textSecondary">
        list of authorized users
      </Typography>
      <HardwareControls //Reuse one of your custom components
        label="HWSet1"
        availableQty={project.checkoutHW1}
        setNumber={1}
        projectId={project.id}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
      />


      <HardwareControls // Reuse one of your custom components
        label="HWSet2"
        availableQty={project.checkoutHW2}
        setNumber={2}
        projectId={project.id}
        onCheckIn={onCheckIn}
        onCheckOut={onCheckOut}
      />
      <Button //Use at least two components (e.g., Button) from a library
        variant="contained"
        color={project.joined ? "secondary" : "primary"}
        onClick={() => onJoinLeave(project.id)}
        sx={{ marginTop: "10px" }}
      >
        {project.joined ? "Leave" : "Join"}
      </Button>
    </Box>
    </ThemeProvider>
  );
};

export default ProjectItem;
