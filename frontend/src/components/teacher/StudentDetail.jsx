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
    LinearProgress,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    TextField,
    Alert,
    CircularProgress
} from "@mui/material";
import {
    CheckCircle,
    Assignment,
    School,
    Timeline,
    CalendarToday,
    Description,
    Comment as CommentIcon,
    Task as TaskIcon,
    ArrowBack
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUserById, fetchStudentProgress, fetchTasksByUser } from "../../services/api";

function StudentDetail() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [progress, setProgress] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [comment, setComment] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [studentData, progressData, tasksData] = await Promise.all([
                    fetchUserById(id),
                    fetchStudentProgress(id),
                    fetchTasksByUser(id)
                ]);
                setStudent(studentData);
                setProgress(progressData);
                setTasks(tasksData);
            } catch (err) {
                setError("Error al cargar los datos del estudiante");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    useEffect(() => {
        if (activeTab === 1 && !tasks.length) {
            fetchTasksByUser(id).then(setTasks);
        }
    }, [activeTab, id, tasks.length]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAddComment = () => {
        // Lógica para agregar comentario
        console.log('Comentario agregado:', comment);
        setComment('');
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!student) {
        return null;
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">
                    Detalles del Estudiante
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar
                                src={student.avatar}
                                alt={student.name}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 3,
                                    border: `4px solid ${theme.palette.primary.main}`
                                }}
                            />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {student.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                {student.email}
                            </Typography>
                            <Chip
                                label={`ID: ${student.id}`}
                                size="small"
                                variant="outlined"
                                sx={{ mb: 3 }}
                            />

                            <Divider sx={{ width: '100%', my: 2 }} />

                            <Grid container spacing={2} sx={{ width: '100%' }}>
                                <Grid item xs={6}>
                                    <StatBox
                                        icon={<Assignment color="primary" />}
                                        value={progress?.total_projects || 0}
                                        label="Proyectos"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StatBox
                                        icon={<TaskIcon color="secondary" />}
                                        value={`${progress?.completed_tasks || 0}/${progress?.total_tasks || 0}`}
                                        label="Tareas"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Progreso General
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={progress?.overall_progress || 0}
                                            sx={{
                                                height: 10,
                                                borderRadius: 5,
                                                mb: 1
                                            }}
                                            color={
                                                progress?.overall_progress >= 80 ? 'success' :
                                                    progress?.overall_progress >= 50 ? 'primary' : 'warning'
                                            }
                                        />
                                        <Typography variant="body2" textAlign="right">
                                            {progress?.overall_progress || 0}%
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Comentarios del Docente
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            placeholder="Escribe un comentario para el estudiante..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleAddComment}
                            disabled={!comment.trim()}
                        >
                            Agregar Comentario
                        </Button>

                        <List sx={{ mt: 2 }}>
                            {/* Ejemplo de comentarios - deberías reemplazar con datos reales */}
                            <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                    <CommentIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Buen trabajo en el último proyecto"
                                    secondary="15/06/2023 - Profesor Martínez"
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            sx={{ mb: 3 }}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Proyectos" icon={<Assignment />} />
                            <Tab label="Tareas" icon={<TaskIcon />} />
                            <Tab label="Actividad" icon={<Timeline />} />
                        </Tabs>

                        {tabValue === 0 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Proyectos Asignados
                                </Typography>
                                {progress?.projects?.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {progress.projects.map((project) => (
                                            <Grid item xs={12} key={project.id}>
                                                <Paper sx={{ p: 2, borderRadius: 3 }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography fontWeight="bold">{project.name}</Typography>
                                                        <Chip
                                                            label={`${project.progress}%`}
                                                            size="small"
                                                            color={
                                                                project.progress >= 80 ? 'success' :
                                                                    project.progress >= 50 ? 'primary' : 'warning'
                                                            }
                                                        />
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={project.progress}
                                                        sx={{
                                                            height: 6,
                                                            borderRadius: 3,
                                                            my: 1
                                                        }}
                                                        color={
                                                            project.progress >= 80 ? 'success' :
                                                                project.progress >= 50 ? 'primary' : 'warning'
                                                        }
                                                    />
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography variant="caption">
                                                            {project.completed_tasks}/{project.total_tasks} tareas completadas
                                                        </Typography>
                                                        {project.due_date && (
                                                            <Typography variant="caption">
                                                                Fecha límite: {new Date(project.due_date).toLocaleDateString()}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography color="text.secondary">
                                        No hay proyectos asignados
                                    </Typography>
                                )}
                            </Box>
                        )}

                        {tabValue === 1 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Tareas Recientes
                                </Typography>
                                {tasks?.length > 0 ? (
                                    <List>
                                        {tasks.map((task) => (
                                            <ListItem
                                                key={task.id}
                                                sx={{
                                                    px: 0,
                                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                                    '&:last-child': {
                                                        borderBottom: 'none'
                                                    }
                                                }}
                                            >
                                                <ListItemIcon>
                                                    {task.status === 'finalizada' ? (
                                                        <CheckCircle color="success" />
                                                    ) : (
                                                        <TaskIcon color={
                                                            new Date(task.due_date) < new Date() ? 'error' : 'action'
                                                        } />
                                                    )}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={task.title}
                                                    secondary={`Proyecto: ${task.project_id} - ${task.status === 'finalizada' ? 'Completada' : new Date(task.due_date) < new Date() ? 'Atrasada' : 'Pendiente'}`}
                                                />
                                                <Typography variant="caption">
                                                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Sin fecha'}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Typography color="text.secondary">
                                        No hay tareas registradas
                                    </Typography>
                                )}
                            </Box>
                        )}

                        {tabValue === 2 && (
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Historial de Actividad
                                </Typography>
                                {/* Ejemplo de actividad - deberías reemplazar con datos reales */}
                                <List>
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <CalendarToday color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Completó la tarea 'Diseño de interfaz'"
                                            secondary={new Date().toLocaleString()}
                                        />
                                    </ListItem>
                                    <ListItem sx={{ px: 0 }}>
                                        <ListItemIcon>
                                            <CalendarToday color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Se unió al proyecto 'Plataforma educativa'"
                                            secondary={new Date(Date.now() - 86400000).toLocaleString()}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

const StatBox = ({ icon, value, label }) => (
    <Paper sx={{ p: 2, borderRadius: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            {icon}
        </Box>
        <Typography variant="h5" fontWeight="bold">
            {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {label}
        </Typography>
    </Paper>
);

export default StudentDetail;