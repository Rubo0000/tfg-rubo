import {
    Box,
    Typography,
    IconButton,
    Paper,
    Grid,
    Stack,
    Tooltip,
    Chip,
    Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { deleteTask } from "../services/api";
import { useNavigate } from "react-router-dom";
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
const getUrgency = (dueDateStr) => {
    if (!dueDateStr) return "normal";
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    const diffInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (diffInDays < 0) return "overdue";
    if (diffInDays <= 3) return "upcoming";
    return "normal";
};

const TaskCard = ({ task, onEdit, onDelete, userMap }) => {
    const urgency = getUrgency(task.due_date);
    const borderColor =
        urgency === "overdue" ? "red" :
            urgency === "upcoming" ? "orange" : "transparent";
    const dateColor =
        urgency === "overdue" ? "error.main" :
            urgency === "upcoming" ? "warning.main" : "text.secondary";

    const navigate = useNavigate();
    return (
        <Paper elevation={3} onClick={() => navigate(`/tasks/${task.id}`)} sx={{ p: 2, borderRadius: 2, border: `2px solid ${borderColor}`, cursor: "pointer", height: "100%" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
                <Box>
                    <Tooltip title="Editar">
                        <IconButton onClick={() => onEdit(task)} size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => onDelete(task.id)} size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>

            <Typography variant="body2" sx={{ mt: 0.5, mb: 1.5 }}>{task.description}</Typography>

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

            <Typography variant="caption" display="block" sx={{ color: dateColor, fontWeight: urgency ? 'bold' : 'normal' }}>
                Fecha: {task.due_date || "Sin fecha"}
            </Typography>
            <Typography variant="caption">
                Asignado a: {userMap[task.assigned_to] || "Nadie"}
            </Typography>
        </Paper>
    );
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

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setTaskModalOpen(true);
    };

    const filteredTasks = tasks.filter(task =>
        (!statusFilter || task.status === statusFilter) &&
        (!priorityFilter || task.priority === priorityFilter) &&
        (!onlyMine || task.assigned_to === userId)
    );

    const grouped = {
        overdue: [],
        upcoming: [],
        normal: []
    };

    filteredTasks.forEach(task => {
        grouped[getUrgency(task.due_date)].push(task);
    });

    const renderGroup = (label, tasks) => (
        tasks.length > 0 && (
            <>
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{label}</Typography>
                <Grid container spacing={2}>
                    {tasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <TaskCard
                                task={task}
                                onEdit={handleEditClick}
                                onDelete={handleDeleteClick}
                                userMap={userMap}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    );

    return (
        <Box sx={{ mb: 6 }}>
            {renderGroup("🚨 Vencidas", grouped.overdue)}
            {renderGroup("⚠️ Próximas (≤ 3 días)", grouped.upcoming)}
            {renderGroup("📅 Otras tareas", grouped.normal)}
            {filteredTasks.length === 0 && (
                <Typography sx={{ mt: 2 }} color="text.secondary">
                    No hay tareas que coincidan con los filtros seleccionados.
                </Typography>
            )}
        </Box>
    );
};

export default TaskList;
