import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Divider,
    Stack,
    Chip,
    Avatar,
    CircularProgress,
    useTheme
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    fetchTaskById,
    fetchUsers
} from "../services/api";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CommentIcon from "@mui/icons-material/Comment";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import AttachmentsSection from "./AttachmentsSection";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import AppHeader from "./AppHeader";
import { deepPurple, grey, green, orange, red } from "@mui/material/colors"; // Importar colores

const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [userMap, setUserMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme(); // Para acceder al tema de Material-UI

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [taskData, usersData] = await Promise.all([
                    fetchTaskById(taskId),
                    fetchUsers()
                ]);
                setTask(taskData);
                const map = {};
                usersData.forEach(user => {
                    map[user.id] = user.name;
                });
                setUserMap(map);
            } catch (err) {
                setError("Error al cargar la tarea o los usuarios.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [taskId]);

    const getStatusChipProps = (status) => {
        switch (status.toLowerCase()) {
            case "abierta":
                return { label: status, color: "info", variant: "outlined" };
            case "en progreso":
                return { label: status, color: "warning", variant: "outlined" };
            case "completada":
                return { label: status, color: "success", variant: "filled" };
            case "cerrada":
                return { label: status, color: "default", variant: "filled" };
            default:
                return { label: status, color: "default", variant: "outlined" };
        }
    };

    const getPriorityChipProps = (priority) => {
        switch (priority.toLowerCase()) {
            case "alta":
                return { label: priority, style: { backgroundColor: red[600], color: 'white' } };
            case "media":
                return { label: priority, style: { backgroundColor: orange[400], color: 'white' } };
            case "baja":
                return { label: priority, style: { backgroundColor: green[500], color: 'white' } };
            default:
                return { label: priority, color: "default" };
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Cargando tarea...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'error.main' }}>
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    if (!task) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h6">No se encontró la tarea.</Typography>
            </Box>
        );
    }

    return (
        <>
            <AppHeader />
            <Box sx={{
                p: { xs: 2, md: 4 },
                maxWidth: 1200,
                mx: 'auto',
                mt: 2
            }}>
                <Paper elevation={6} sx={{ p: { xs: 2, md: 4 }, borderRadius: theme.shape.borderRadius * 2, overflow: 'hidden' }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" component="h1" gutterBottom sx={{
                            fontWeight: 700,
                            color: deepPurple[700],
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                            pb: 1,
                            display: 'inline-block'
                        }}>
                            {task.title}
                        </Typography>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            sx={{ mt: 2 }}
                        >
                            <Chip {...getStatusChipProps(task.status)} sx={{ fontWeight: 'bold' }} />
                            <Chip {...getPriorityChipProps(task.priority)} sx={{ fontWeight: 'bold' }} />
                            <Chip
                                label={`Asignado a: ${userMap[task.assigned_to] || "Nadie"}`}
                                icon={<Avatar sx={{ width: 24, height: 24, bgcolor: deepPurple[500] }}>
                                    {userMap[task.assigned_to]?.charAt(0) || '?'}
                                </Avatar>}
                                variant="outlined"
                                sx={{ bgcolor: grey[100] }}
                            />
                            <Chip
                                label={`Fecha límite: ${format(new Date(task.due_date), "dd/MM/yyyy")}`}
                                variant="outlined"
                                color="default"
                                sx={{ bgcolor: grey[100] }}
                            />
                        </Stack>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: grey[300] }} />

                    <Tabs
                        value={tabIndex}
                        onChange={(e, newValue) => setTabIndex(newValue)}
                        aria-label="task detail tabs"
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            mb: 2,
                            '& .MuiTabs-indicator': {
                                backgroundColor: theme.palette.primary.main,
                                height: 3,
                                borderRadius: '3px 3px 0 0'
                            },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                color: grey[600],
                                '&.Mui-selected': {
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                },
                            },
                        }}
                    >
                        <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
                        <Tab label="Comentarios" icon={<CommentIcon />} iconPosition="start" />
                        <Tab label="Adjuntos" icon={<InsertDriveFileIcon />} iconPosition="start" />
                        <Tab label="Historial" icon={<HistoryIcon />} iconPosition="start" />
                    </Tabs>

                    <Box sx={{ pt: 2 }}>
                        {tabIndex === 0 && <TaskInfo description={task.description} />}
                        {tabIndex === 1 && <TaskComments taskId={taskId} userMap={userMap} />}
                        {tabIndex === 2 && <AttachmentsSection taskId={task.id} />}
                        {tabIndex === 3 && (
                            <Box sx={{ p: 3, bgcolor: grey[50], borderRadius: 2 }}>
                                <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                    Historial de cambios (en desarrollo)
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Aquí se mostrarán los registros de actividad y modificaciones de la tarea.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default TaskDetail;