import {
    Box,
    Typography,
    Grid,
    Paper,
    useTheme,
    Avatar,
    Button,
    Divider,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProjectSupervision({ projects }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Todos los proyectos activos en la plataforma
            </Typography>

            <Grid container spacing={3}>
                {projects.map((project) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Paper
                            component={motion.div}
                            whileHover={{ scale: 1.03, boxShadow: theme.shadows[6] }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {project.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {project.description || "Sin descripción"}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mt: "auto" }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    sx={{ borderRadius: 3 }}
                                >
                                    Ver detalles
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProjectSupervision;