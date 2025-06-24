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
    Stack,
    LinearProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Schedule, Group } from "@mui/icons-material";

function ProjectSupervision({ projects }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'completed': return 'primary';
            default: return 'default';
        }
    };

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
                            whileHover={{
                                scale: 1.03,
                                boxShadow: theme.shadows[6],
                                borderLeft: `4px solid ${theme.palette.primary.main}`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                borderLeft: '4px solid transparent',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover .project-actions': {
                                    opacity: 1,
                                    transform: 'translateY(0)'
                                }
                            }}
                        >
                            <Chip
                                label={project.status || 'active'}
                                color={getStatusColor(project.status)}
                                size="small"
                                sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    textTransform: 'capitalize'
                                }}
                            />

                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                {project.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {project.description || "Sin descripción"}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Group fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        {project.student_count || 0} estudiantes
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Schedule fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        {new Date(project.due_date).toLocaleDateString()}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    Progreso: {project.progress || 0}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={project.progress || 0}
                                    sx={{ height: 8, borderRadius: 4 }}
                                    color={project.progress >= 80 ? 'success' : project.progress >= 50 ? 'primary' : 'warning'}
                                />
                            </Box>

                            <Box
                                className="project-actions"
                                sx={{
                                    mt: 'auto',
                                    opacity: 0,
                                    transform: 'translateY(10px)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate(`/projects/${project.id}`)}
                                    sx={{
                                        borderRadius: 2,
                                        py: 1,
                                        textTransform: 'none',
                                        fontWeight: 'bold'
                                    }}
                                    startIcon={<CheckCircle />}
                                >
                                    Ver detalles del proyecto
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