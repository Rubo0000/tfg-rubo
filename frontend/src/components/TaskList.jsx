import {
    Box,
    Typography,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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

    const handleCardClick = (e) => {
        // Evita navegación si el clic es en un botón
        if (e.target.closest("button")) return;
        navigate(`/tasks/${task.id}`);
    };

    return (
        <Paper
            elevation={3}
            onClick={handleCardClick}
            sx={{
                p: 2,
                borderRadius: 2,
                border: `2px solid ${borderColor}`,
                cursor: "pointer",
                height: "100%"
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
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
                </Box>

                <Stack direction="row" spacing={1}>
                    <Tooltip title="Editar">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation(); // Previene navegación
                                onEdit(task);
                            }}
                            size="small"
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation(); // Previene navegación
                                onDelete(task.id);
                            }}
                            size="small"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default TaskCard;
