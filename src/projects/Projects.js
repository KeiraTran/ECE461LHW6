import React, { useState } from "react";
import ProjectItem from "./ProjectItem";

const API_BASE_URL = "http://127.0.0.1:5000"

const Projects = () => {
  // global hardware
  const [hwSet1, setHwSet1] = useState(100);
  const [hwSet2, setHwSet2] = useState(100);

  const [projects, setProjects] = useState([
    { id: 1, name: "Project 1", joined: true, checkoutHW1: 0, checkoutHW2: 0 },
    { id: 2, name: "Project 2", joined: false, checkoutHW1: 0, checkoutHW2: 0 },
    { id: 3, name: "Project 3", joined: false, checkoutHW1: 0, checkoutHW2: 0 },
  ]);


  const handleJoinLeave = (id) => {
    const project = projects.find((project) => project.id === id);

    if (project.joined) {
      fetch(`${API_BASE_URL}/leave?projectId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === id ? { ...project, joined: false } : project
            )
          );
        })
        .catch((error) => {
          console.error("Error leaving project:", error);
          alert("An error occurred while leaving the project.");
        });
    } else {
      fetch(`${API_BASE_URL}/join?projectId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id === id ? { ...project, joined: true } : project
            )
          );
        })
        .catch((error) => {
          console.error("Error joining project:", error);
          alert("An error occurred while joining the project.");
        });
    }
  };

  const handleCheckIn = (id, setNumber, qty) => {
    const project = projects.find((project) => project.id === id);
  
    if (!project.joined) {
      alert("You must join the project before checking in hardware.");
      return;
    }
  
    if (!id || !qty) {
      alert("Invalid project ID or quantity");
      return;
    }
  
    fetch(`${API_BASE_URL}/checkin?projectId=${id}&qty=${qty}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => {
            if (project.id === id) {
              if (setNumber === 1) {
                return { ...project, checkoutHW1: project.checkoutHW1 - qty };
              }
              if (setNumber === 2) {
                return { ...project, checkoutHW2: project.checkoutHW2 - qty };
              }
            }
            return project;
          });
          return updatedProjects;
        });
  
        if (setNumber === 1) {
          setHwSet1(hwSet1 + qty);
        } else if (setNumber === 2) {
          setHwSet2(hwSet2 + qty);
        }
      })
      .catch((error) => {
        console.error("Error checking in hardware:", error);
        alert("An error occurred while checking in hardware.");
      });
  };
  
  const handleCheckOut = (id, setNumber, qty) => {
    const project = projects.find((project) => project.id === id);
  
    if (!project.joined) {
      alert("You must join the project before checking out hardware.");
      return;
    }
  
    if (!id || !qty) {
      alert("Invalid project ID or quantity");
      return;
    }
  
    fetch(`${API_BASE_URL}/checkout?projectId=${id}&qty=${qty}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
  
        setProjects((prevProjects) => {
          const updatedProjects = prevProjects.map((project) => {
            if (project.id === id) {
              if (setNumber === 1) {
                return { ...project, checkoutHW1: project.checkoutHW1 + qty };
              }
              if (setNumber === 2) {
                return { ...project, checkoutHW2: project.checkoutHW2 + qty };
              }
            }
            return project;
          });
          return updatedProjects;
        });
  
        if (setNumber === 1) {
          setHwSet1(hwSet1 - qty);
        } else if (setNumber === 2) {
          setHwSet2(hwSet2 - qty);
        }
      })
      .catch((error) => {
        console.error("Error checking out hardware:", error);
        alert("An error occurred while checking out hardware.");
      });
  };
  




  

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Projects</h1>
      <h3>Global Hardware Set (Available/Capacity):</h3>
      <p>HWSet1: {hwSet1}/100</p>
      <p>HWSet2: {hwSet2}/100</p>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project} //Pass props from a parent to a child at least twice
          onJoinLeave={handleJoinLeave} //Pass props from a parent to a child at least twice
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
        />
      ))}
    </div>
  );
};

export default Projects;
