// components/Dashboard.js

import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectStats from "../components/ProjectStats";
import { fetchProjects, fetchTasksByProject, fetchProjectsByUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectStats, setProjectStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    userTasks: 0,
    recentActivity: [],
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const currentUserId = parseInt(localStorage.getItem("userId"));
        const data = await fetchProjectsByUser(currentUserId);
        setProjects(data);
        if (data.length > 0) {
          setSelectedProjectId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching user's projects:", error);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const loadProjectStats = async () => {
      if (selectedProjectId) {
        try {
          const tasks = await fetchTasksByProject(selectedProjectId);
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(task => task.status === 'finalizada').length;
          const userId = 1; // Reemplaza con el ID del usuario actual
          const userTasks = tasks.filter(task => task.assigned_to === userId).length;
          const recentActivity = tasks
            .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
            .slice(0, 5)
            .map(task => `Tarea '${task.title}' con estado '${task.status}'`);

          setProjectStats({
            totalTasks,
            completedTasks,
            userTasks,
            recentActivity,
          });
        } catch (error) {
          console.error("Error fetching project stats:", error);
        }
      }
    };

    loadProjectStats();
  }, [selectedProjectId]);

  const handleCreateProject = () => {
    console.log("Redirigir o abrir modal para crear nuevo proyecto");
  };



  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout");
    } catch (err) {
      console.warn("Logout local, sin respuesta del servidor");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ¡Bienvenido de nuevo! <span role="img">👋</span>
      </Typography>
      <Button
        variant="outlined"
        color="error"
        onClick={handleLogout}
        sx={{ textTransform: "none", fontWeight: "bold" }}
      >
        Cerrar sesión
      </Button>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {projects.length > 0
          ? "Estos son tus proyectos actuales:"
          : "Todavía no tienes proyectos. ¡Empieza uno ahora!"}
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Paper
              component={motion.div}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                textAlign: "center",
                fontWeight: "bold",
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/projects/${project.id}`)}

            >
              {project.name}
            </Paper>
          </Grid>
        ))}

        {/* Crear nuevo proyecto */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            component={motion.div}
            whileHover={{
              scale: 1.07,
              boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            elevation={3}
            onClick={handleCreateProject}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              height: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              backgroundColor: "#f8f9fa",
              border: "2px dashed #c0c0c0",
              cursor: "pointer",
              color: "#333",
              transition: "all 0.3s ease",
            }}
          >
            <Add sx={{ fontSize: 40, mb: 1 }} />
            Crear nuevo proyecto
          </Paper>
        </Grid>
      </Grid>

      {/* Mostrar estadísticas del proyecto seleccionado */}
      {selectedProjectId && (
        <ProjectStats
          totalTasks={projectStats.totalTasks}
          completedTasks={projectStats.completedTasks}
          userTasks={projectStats.userTasks}
          recentActivity={projectStats.recentActivity}
        />
      )}
    </Box>
  );
}

export default Dashboard;
