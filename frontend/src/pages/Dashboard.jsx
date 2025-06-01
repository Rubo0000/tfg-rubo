import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectStats from "../components/ProjectStats";
import CreateProjectModal from "../components/CreateProjectModal";
import { fetchUserProjects } from "../services/projectService";

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const userId = 1; // ← Sustituir por el ID real del usuario
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const loadProjects = async () => {
    const data = await fetchUserProjects(userId);
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ¡Bienvenido de nuevo! <span role="img">👋</span>
      </Typography>

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
              onClick={() => navigate(`/proyecto/${project.id}`)}
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
            >
              {project.name}
            </Paper>
          </Grid>
        ))}

        <ProjectStats
          totalTasks={12}
          completedTasks={8}
          userTasks={3}
          recentActivity={[
            "Rubén completó 'Integrar login'",
            "María subió archivo a 'Informe final'",
            "Se añadió tarea 'Revisar código'",
          ]}
        />

        <Grid item xs={12} sm={6} md={4}>
          <Paper
            component={motion.div}
            whileHover={{
              scale: 1.07,
              boxShadow: "0px 12px 28px rgba(0, 0, 0, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            elevation={3}
            onClick={() => setModalOpen(true)}
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
            }}
          >
            <Add sx={{ fontSize: 40, mb: 1 }} />
            Crear nuevo proyecto
          </Paper>
        </Grid>
      </Grid>

      <CreateProjectModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        userId={userId}
        onProjectCreated={loadProjects}
      />
    </Box>
  );
}

export default Dashboard;
