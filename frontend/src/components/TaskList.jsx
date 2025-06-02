import {
    Box,
    Typography,
    IconButton,
    Paper,
    Grid,
    Stack,
    Tooltip,
    Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { deleteTask } from "../services/api";

const statusColors = {
    "pendiente": "default",
    "en progreso": "info",
    "finalizada": "success",
};

const priorityColors = {
    "alta": "error",
    "media": "warning",
    "baja": "success",
};

// 🎯 Función para saber si es urgente o vencida
const getUrgency = (dueDateStr) => {
    if (!dueDateStr) return null;

    const today = new Date();
    const dueDate = new Date(dueDateStr);
    const diffInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return "overdue";       // Vencida
    if (diffInDays <= 3) return "upcoming";     // Próxima
    return null;
};

const TaskList = ({
    tasks = [],
    onTaskUpdate,
    setTaskModalOpen,
    setSelectedTask,
    statusFilter,
    priorityFilter,
    onlyMine,
    userId,
    userMap
}) => {
    const handleDeleteClick = async (taskId) => {
        try {
            await deleteTask(taskId);
            await onTaskUpdate();
        } catch (error) {
            console.error("Error al borrar tarea:", error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        (!statusFilter || task.status === statusFilter) &&
        (!priorityFilter || task.priority === priorityFilter) &&
        (!onlyMine || task.assigned_to === userId)
    );

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={2}>
                {filteredTasks.map((task) => {
                    const urgency = getUrgency(task.due_date);
                    const borderColor = urgency === "overdue"
                        ? "red"
                        : urgency === "upcoming"
                            ? "orange"
                            : "transparent";

                    const dateColor = urgency === "overdue"
                        ? "error.main"
                        : urgency === "upcoming"
                            ? "warning.main"
                            : "text.secondary";

                    return (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    border: `2px solid ${borderColor}`,
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight="bold">
                                        {task.title}
                                    </Typography>
                                    <Box>
                                        <Tooltip title="Editar">
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedTask(task);
                                                    setTaskModalOpen(true);
                                                }}
                                                size="small"
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton
                                                onClick={() => handleDeleteClick(task.id)}
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Stack>

                                <Typography variant="body2" sx={{ mt: 0.5, mb: 1.5 }}>
                                    {task.description}
                                </Typography>

                                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                                    <Chip label={task.priority} color={priorityColors[task.priority]} size="small" />
                                    <Chip label={task.status} color={statusColors[task.status]} size="small" />

                                    {urgency === "overdue" && (
                                        <Tooltip title="¡Tarea vencida!">
                                            <Chip icon={<ErrorOutlineIcon />} label="Vencida" color="error" size="small" />
                                        </Tooltip>
                                    )}
                                    {urgency === "upcoming" && (
                                        <Tooltip title="Tarea próxima a vencer">
                                            <Chip icon={<WarningAmberIcon />} label="Próxima" color="warning" size="small" />
                                        </Tooltip>
                                    )}
                                </Stack>

                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ color: dateColor, fontWeight: urgency ? 'bold' : 'normal' }}
                                >
                                    Fecha: {task.due_date || "Sin fecha"}
                                </Typography>
                                <Typography variant="caption">
                                    Asignado a: {userMap[task.assigned_to] || "Nadie"}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default TaskList;
