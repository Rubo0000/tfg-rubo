import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
    Tooltip,
    Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const statusColors = {
    pendiente: "default",
    "en progreso": "info",
    finalizada: "success",
};

const priorityColors = {
    alta: "error",
    media: "warning",
    baja: "success",
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

const TaskCard = ({ task, onEdit, onDelete, userMap, projectId }) => {
    const navigate = useNavigate();
    const urgency = getUrgency(task.due_date);

    const handleCardClick = () => {
        navigate(`/tasks/${task.id}`);
    };

    const borderColor =
        urgency === "overdue"
            ? "red"
            : urgency === "upcoming"
                ? "orange"
                : "transparent";

    const dateColor =
        urgency === "overdue"
            ? "error.main"
            : urgency === "upcoming"
                ? "warning.main"
                : "text.secondary";

    return (
        <Card
            sx={{
                border: `2px solid ${borderColor}`,
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                    transform: "scale(1.01)",
                    boxShadow: 3,
                },
            }}
            onClick={handleCardClick}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                            {task.description}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <Chip
                                label={task.priority}
                                color={priorityColors[task.priority]}
                                size="small"
                            />
                            <Chip
                                label={task.status}
                                color={statusColors[task.status]}
                                size="small"
                            />
                            {urgency === "overdue" && (
                                <Tooltip title="¡Tarea vencida!">
                                    <Chip
                                        icon={<ErrorOutlineIcon />}
                                        label="Vencida"
                                        color="error"
                                        size="small"
                                    />
                                </Tooltip>
                            )}
                            {urgency === "upcoming" && (
                                <Tooltip title="Tarea próxima a vencer">
                                    <Chip
                                        icon={<WarningAmberIcon />}
                                        label="Próxima"
                                        color="warning"
                                        size="small"
                                    />
                                </Tooltip>
                            )}
                        </Stack>
                        <Typography variant="caption" sx={{ color: dateColor }}>
                            Fecha: {task.due_date || "Sin fecha"}
                        </Typography>
                        <br />
                        <Typography variant="caption">
                            Asignado a: {userMap?.[task.assigned_to] || "Nadie"}
                        </Typography>
                    </Box>
                    <Box>
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
