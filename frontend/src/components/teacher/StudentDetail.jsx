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
    CircularProgress,
    Card,
    CardContent,
    CardActions,
    Badge,
    Breadcrumbs,
    Link,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import {
    Timeline, // Import Timeline and related components from @mui/lab
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
} from "@mui/lab"; // Correct import path for Timeline components

import {
    CheckCircle,
    Assignment,
    School,
    Timeline as TimelineIcon, // Keep the icon import as is
    CalendarToday,
    Description,
    Comment as CommentIcon,
    Task as TaskIcon,
    ArrowBack,
    Home,
    Person,
    AccessTime,
    Grade,
    Visibility,
    Send,
    Edit,
    Delete,
    Add,
    TrendingUp,
    TrendingDown,
    Star,
    Warning,
    Info
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    fetchUserById,
    fetchStudentProgress,
    fetchTasksByUser,
    addCommentToTask,
    fetchCommentsByTaskId
} from "../../services/api";

// Componente para mostrar estadísticas
const StatCard = ({ icon, value, label, color = "primary", trend = null }) => (
    <Card sx={{
        height: '100%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
    }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                color: `${color}.main`
            }}>
                {icon}
            </Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {value}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                {label}
            </Typography>
            {trend && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                    {trend > 0 ? (
                        <TrendingUp color="success" fontSize="small" />
                    ) : (
                        <TrendingDown color="error" fontSize="small" />
                    )}
                    <Typography variant="caption" color={trend > 0 ? 'success.main' : 'error.main'} sx={{ ml: 0.5 }}>
                        {Math.abs(trend)}%
                    </Typography>
                </Box>
            )}
        </CardContent>
    </Card>
);

// Componente para comentarios del docente
const TeacherComments = ({ studentId, comments, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            // Aquí usarías una API específica para comentarios del docente al estudiante
            // Por ahora simulamos la funcionalidad
            const commentData = {
                content: newComment,
                user_id: 1, // ID del docente actual
                student_id: studentId,
                type: 'teacher_feedback'
            };

            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newCommentObj = {
                id: Date.now(),
                content: newComment,
                created_at: new Date().toISOString(),
                author_name: 'Profesor Actual',
                author_role: 'teacher'
            };

            onCommentAdded(newCommentObj);
            setNewComment('');
            setSnackbar({ open: true, message: 'Comentario agregado exitosamente', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error al agregar comentario', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <CommentIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Comentarios del Docente
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Escribe un comentario para el estudiante..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    sx={{ mb: 3 }}
                >
                    {loading ? 'Enviando...' : 'Enviar Comentario'}
                </Button>

                <Divider sx={{ mb: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                    Comentarios Recientes
                </Typography>

                <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <ListItem key={comment.id} sx={{
                                alignItems: 'flex-start',
                                px: 0,
                                mb: 2,
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <ListItemIcon sx={{ minWidth: 40, mt: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <CommentIcon fontSize="small" />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Box>
                                            <Typography variant="body1" fontWeight="medium">
                                                {comment.content}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {comment.author_name} • {new Date(comment.created_at).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                            No hay comentarios aún
                        </Typography>
                    )}
                </List>
            </CardContent>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

// Componente para la línea de tiempo de actividad
const ActivityTimeline = ({ activities }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'task_completed':
                return <CheckCircle color="success" />;
            case 'project_joined':
                return <Assignment color="primary" />;
            case 'grade_received':
                return <Grade color="warning" />;
            case 'login':
                return <Visibility color="info" />;
            default:
                return <Info color="action" />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'task_completed':
                return 'success';
            case 'project_joined':
                return 'primary';
            case 'grade_received':
                return 'warning';
            case 'login':
                return 'info';
            default:
                return 'grey';
        }
    };

    return (
        <Card sx={{
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TimelineIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Actividad Reciente
                    </Typography>
                </Box>

                <Timeline position="left" sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {activities.map((activity, index) => (
                        <TimelineItem key={activity.id}>
                            <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                                {new Date(activity.timestamp).toLocaleDateString('es-ES', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color={getActivityColor(activity.type)}>
                                    {getActivityIcon(activity.type)}
                                </TimelineDot>
                                {index < activities.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="body2" component="span" fontWeight="medium">
                                    {activity.title}
                                </Typography>
                                <Typography variant="caption" display="block" color="text.secondary">
                                    {activity.description}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
};

function StudentDetail() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();

    // Estados principales
    const [student, setStudent] = useState(null);
    const [progress, setProgress] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    // Estados para comentarios
    const [comments, setComments] = useState([]);

    // Estados para actividad
    const [activities, setActivities] = useState([]);

    // Cargar datos iniciales
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

                // Generar datos de actividad simulados
                generateActivityData(tasksData, progressData);

                // Cargar comentarios simulados
                loadComments();

            } catch (err) {
                setError("Error al cargar los datos del estudiante");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id]);

    const generateActivityData = (tasksData, progressData) => {
        const activityTypes = [
            { type: 'task_completed', title: 'Completó una tarea', description: 'Tarea marcada como finalizada' },
            { type: 'project_joined', title: 'Se unió a un proyecto', description: 'Nuevo proyecto asignado' },
            { type: 'grade_received', title: 'Recibió una calificación', description: 'Evaluación completada' },
            { type: 'login', title: 'Accedió al sistema', description: 'Sesión iniciada' }
        ];

        const generatedActivities = [];
        const now = new Date();

        // Generar actividades basadas en tareas completadas
        tasksData.forEach((task, index) => {
            if (task.status === 'finalizada') {
                generatedActivities.push({
                    id: `task_${task.id}`,
                    type: 'task_completed',
                    title: `Completó: ${task.title}`,
                    description: `Tarea del proyecto ${task.project_id}`,
                    timestamp: new Date(now.getTime() - (index * 86400000)).toISOString()
                });
            }
        });

        // Generar actividades de proyectos
        if (progressData?.projects) {
            progressData.projects.forEach((project, index) => {
                generatedActivities.push({
                    id: `project_${project.id}`,
                    type: 'project_joined',
                    title: `Proyecto: ${project.name}`,
                    description: `Progreso: ${project.progress}%`,
                    timestamp: new Date(now.getTime() - ((index + 5) * 86400000)).toISOString()
                });
            });
        }

        // Agregar algunas actividades de login
        for (let i = 0; i < 3; i++) {
            generatedActivities.push({
                id: `login_${i}`,
                type: 'login',
                title: 'Accedió al sistema',
                description: 'Sesión iniciada',
                timestamp: new Date(now.getTime() - ((i + 10) * 86400000)).toISOString()
            });
        }

        // Ordenar por fecha más reciente
        generatedActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setActivities(generatedActivities);
    };

    const loadComments = () => {
        // Simular comentarios existentes
        const mockComments = [
            {
                id: 1,
                content: "Excelente trabajo en el último proyecto. Has demostrado una gran comprensión de los conceptos.",
                created_at: new Date(Date.now() - 86400000).toISOString(),
                author_name: "Prof. Martínez",
                author_role: "teacher"
            },
            {
                id: 2,
                content: "Continúa con este nivel de dedicación. Tu progreso es notable.",
                created_at: new Date(Date.now() - 172800000).toISOString(),
                author_name: "Prof. García",
                author_role: "teacher"
            }
        ];
        setComments(mockComments);
    };

    const handleCommentAdded = (newComment) => {
        setComments(prev => [newComment, ...prev]);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "60vh",
                flexDirection: "column"
            }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Cargando datos del estudiante...
                </Typography>
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
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', p: 3 }}>
            {/* Header con Breadcrumbs */}
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs sx={{ mb: 2, color: 'white' }}>
                    <Link
                        color="inherit"
                        href="#"
                        onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}
                        sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                        <Home sx={{ mr: 0.5 }} />
                        Dashboard
                    </Link>
                    <Link
                        color="inherit"
                        href="#"
                        onClick={(e) => { e.preventDefault(); navigate('/teacher-dashboard'); }}
                        sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                        <Person sx={{ mr: 0.5 }} />
                        Gestión de Estudiantes
                    </Link>
                    <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 0.5 }} />
                        {student.name}
                    </Typography>
                </Breadcrumbs>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                mr: 2,
                                color: 'white',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h3" fontWeight="bold" sx={{ color: 'white' }}>
                            {student.name}
                        </Typography>
                    </Box>
                    <Chip
                        label={`ID: ${student.id}`}
                        size="medium"
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }}
                    />
                </Box>
            </Box>

            {/* Información del Estudiante */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card sx={{
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <CardContent sx={{ p: 4 }}>
                            <Avatar
                                src={student.avatar}
                                alt={student.name}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: 'auto',
                                    mb: 3,
                                    border: `4px solid ${theme.palette.primary.main}`,
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                }}
                            />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {student.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" gutterBottom>
                                {student.email}
                            </Typography>
                            <Chip
                                label="Estudiante"
                                color="primary"
                                sx={{ mt: 1 }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Estadísticas */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={<Assignment sx={{ fontSize: 40 }} />}
                                value={progress?.total_projects || 0}
                                label="Proyectos"
                                color="primary"
                                trend={5}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={<TaskIcon sx={{ fontSize: 40 }} />}
                                value={`${progress?.completed_tasks || 0}/${progress?.total_tasks || 0}`}
                                label="Tareas Completadas"
                                color="secondary"
                                trend={12}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={<TrendingUp sx={{ fontSize: 40 }} />}
                                value={`${progress?.overall_progress || 0}%`}
                                label="Progreso General"
                                color="success"
                                trend={8}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                icon={<Star sx={{ fontSize: 40 }} />}
                                value="8.5"
                                label="Calificación Promedio"
                                color="warning"
                                trend={-2}
                            />
                        </Grid>
                    </Grid>

                    {/* Barra de Progreso General */}
                    <Card sx={{
                        mt: 2,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Progreso General del Curso
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    {progress?.overall_progress || 0}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={progress?.overall_progress || 0}
                                sx={{
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    '& .MuiLinearProgress-bar': {
                                        borderRadius: 6,
                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                                    }
                                }}
                                color={
                                    progress?.overall_progress >= 80 ? 'success' :
                                        progress?.overall_progress >= 50 ? 'primary' : 'warning'
                                }
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Contenido Principal */}
            <Grid container spacing={3}>
                {/* Panel Izquierdo - Comentarios */}
                <Grid item xs={12} md={4}>
                    <TeacherComments
                        studentId={id}
                        comments={comments}
                        onCommentAdded={handleCommentAdded}
                    />
                </Grid>

                {/* Panel Derecho - Tabs */}
                <Grid item xs={12} md={8}>
                    <Card sx={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': {
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    fontSize: '1rem'
                                }
                            }}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Proyectos" icon={<Assignment />} />
                            <Tab label="Tareas" icon={<TaskIcon />} />
                            <Tab label="Actividad" icon={<TimelineIcon />} />
                        </Tabs>

                        <Box sx={{ p: 3 }}>
                            {tabValue === 0 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        Proyectos Asignados
                                    </Typography>
                                    {progress?.projects?.length > 0 ? (
                                        <Grid container spacing={2}>
                                            {progress.projects.map((project) => (
                                                <Grid item xs={12} key={project.id}>
                                                    <Card sx={{
                                                        p: 2,
                                                        borderRadius: 3,
                                                        background: 'rgba(255,255,255,0.5)',
                                                        border: '1px solid rgba(0,0,0,0.05)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                                        }
                                                    }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                            <Typography fontWeight="bold" variant="h6">
                                                                {project.name}
                                                            </Typography>
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
                                                                height: 8,
                                                                borderRadius: 4,
                                                                mb: 2,
                                                                backgroundColor: 'rgba(0,0,0,0.1)'
                                                            }}
                                                            color={
                                                                project.progress >= 80 ? 'success' :
                                                                    project.progress >= 50 ? 'primary' : 'warning'
                                                            }
                                                        />
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {project.completed_tasks}/{project.total_tasks} tareas completadas
                                                            </Typography>
                                                            {project.due_date && (
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                                                    {new Date(project.due_date).toLocaleDateString()}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <Assignment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                            <Typography color="text.secondary" variant="h6">
                                                No hay proyectos asignados
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {tabValue === 1 && (
                                <Box>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        Tareas Recientes
                                    </Typography>
                                    {tasks?.length > 0 ? (
                                        <List>
                                            {tasks.map((task) => (
                                                <ListItem
                                                    key={task.id}
                                                    sx={{
                                                        px: 0,
                                                        mb: 2,
                                                        p: 2,
                                                        borderRadius: 2,
                                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                                        border: '1px solid rgba(0,0,0,0.05)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                                            transform: 'translateX(4px)'
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
                                                        primary={
                                                            <Typography variant="body1" fontWeight="medium">
                                                                {task.title}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Proyecto: {task.project_id} • {task.status === 'finalizada' ? 'Completada' : new Date(task.due_date) < new Date() ? 'Atrasada' : 'Pendiente'}
                                                                </Typography>
                                                                {task.description && (
                                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                                        {task.description}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        }
                                                    />
                                                    <Box sx={{ textAlign: 'right' }}>
                                                        <Typography variant="caption" display="block" color="text.secondary">
                                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Sin fecha'}
                                                        </Typography>
                                                        <Chip
                                                            label={task.priority}
                                                            size="small"
                                                            color={
                                                                task.priority === 'alta' ? 'error' :
                                                                    task.priority === 'media' ? 'warning' : 'success'
                                                            }
                                                            sx={{ mt: 1 }}
                                                        />
                                                    </Box>
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <Box sx={{ textAlign: 'center', py: 4 }}>
                                            <TaskIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                                            <Typography color="text.secondary" variant="h6">
                                                No hay tareas registradas
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {tabValue === 2 && (
                                <ActivityTimeline activities={activities} />
                            )}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default StudentDetail;