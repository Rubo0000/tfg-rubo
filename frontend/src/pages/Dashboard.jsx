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
import { useEffect, useState, useCallback } from "react";
import ProjectStats from "../components/project/ProjectStats";
import {
  fetchTasksByProject,
  fetchProjectsByUser,
  createProject,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/project/ProjectCreateModal";
import AppHeader from "../components/layout/AppHeader";
import PendingInvitations from "../components/project/PendingInvitations";
import UserProfile from "../components/user/UserProfile";

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem("userId"));
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [projectStats, setProjectStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    userTasks: 0,
    recentActivity: [],
  });

  const loadUserProjects = useCallback(async () => {
    try {
      const data = await fetchProjectsByUser(userId);
      setProjects(data);
      if (data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching user's projects:", error);
    }
  }, [userId]);

  useEffect(() => {
    loadUserProjects();
  }, [loadUserProjects]);

  useEffect(() => {
    const loadProjectStats = async () => {
      if (selectedProjectId) {
        try {
          const tasks = await fetchTasksByProject(selectedProjectId);
          const totalTasks = tasks.length;
          const completedTasks = tasks.filter(t => t.status === "finalizada").length;
          const userTasks = tasks.filter(t => t.assigned_to === userId).length;
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
          console.error("Error loading project stats:", error);
        }
      }
    };

    loadProjectStats();
  }, [selectedProjectId, userId]);

  const handleCreateProject = () => setModalOpen(true);

  const handleProjectSubmit = async (data) => {
    try {
      await createProject(data);
      await loadUserProjects();
    } catch (err) {
      console.error("Error al crear el proyecto:", err);
    }
  };

  const handleOpenProfile = () => {
    setProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <AppHeader onOpenProfile={handleOpenProfile} />

      <UserProfile open={profileOpen} onClose={handleCloseProfile} />

      <Box sx={{ px: 4, py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          ¡Bienvenido de nuevo! 👋
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {projects.length > 0
            ? "Estos son tus proyectos actuales:"
            : "Todavía no tienes proyectos. ¡Empieza uno ahora!"}
        </Typography>

        <PendingInvitations userId={userId} onHandled={loadUserProjects} />

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Paper
                component={motion.div}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0,0,0,0.2)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                elevation={3}
                sx={{
                  p: 4,
                  // Aumentamos el redondeo para los proyectos existentes
                  borderRadius: theme.shape.borderRadius * 2.5,
                  textAlign: "center",
                  fontWeight: "bold",
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  overflow: 'hidden' // Asegura que el contenido no se salga del borde redondeado
                }}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <Typography variant="h6" component="h3" noWrap>{project.name}</Typography>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              component={motion.div}
              whileHover={{
                scale: 1.07,
                boxShadow: "0px 12px 28px rgba(0,0,0,0.25)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              elevation={3}
              onClick={handleCreateProject}
              sx={{
                p: 4,
                // Aumentamos el redondeo para el botón de crear proyecto
                borderRadius: theme.shape.borderRadius * 2.5,
                textAlign: "center",
                height: 150,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                backgroundColor: theme.palette.action.hover, // Usar color del tema para hover
                border: `2px dashed ${theme.palette.divider}`, // Usar color del tema para el borde
                cursor: "pointer",
                color: theme.palette.text.secondary, // Usar color del tema para el texto
                transition: "all 0.3s ease",
              }}
            >
              <Add sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body1">Crear nuevo proyecto</Typography>
            </Paper>
          </Grid>
        </Grid>

        {selectedProjectId && (
          // Considera darle un sx prop aquí también si quieres que ProjectStats tenga bordes redondeados
          <ProjectStats {...projectStats} />
        )}

        <CreateProjectModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleProjectSubmit}
        />
      </Box>
    </>
  );
}

export default Dashboard;