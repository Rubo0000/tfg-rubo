import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
    Tooltip,
    Stack,
    Avatar,
    LinearProgress,
    useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

const getProgressValue = (status) => {
    switch (status) {
        case 'pendiente': return 20;
        case 'en progreso': return 60;
        case 'finalizada': return 100;
        default: return 0;
    }
};

const TaskCard = ({ task, onEdit, onDelete, userMap, projectId }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const urgency = getUrgency(task.due_date);

    const handleCardClick = () => {
        navigate(`/tasks/${task.id}`);
    };

    const borderColor = urgency === "overdue"
        ? theme.palette.error.main
        : urgency === "upcoming"
            ? theme.palette.warning.main
            : theme.palette.divider;

    const dateColor = urgency === "overdue"
        ? "error.main"
        : urgency === "upcoming"
            ? "warning.main"
            : "text.secondary";

    const formattedDate = task.due_date
        ? format(new Date(task.due_date), "PP", { locale: es })
        : "Sin fecha límite";

    return (
        <Card
            sx={{
                borderLeft: `4px solid ${borderColor}`,
                borderRadius: 2,
                cursor: "pointer",
                transition: "all 0.2s ease",
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: theme.shadows[4],
                },
            }}
            onClick={handleCardClick}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flexGrow={1}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            {task.title}
                        </Typography>
                        <Typography
                            color="text.secondary"
                            sx={{
                                mb: 2,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {task.description || "Sin descripción"}
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            value={getProgressValue(task.status)}
                            color={statusColors[task.status]}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                mb: 2,
                                backgroundColor: theme.palette.grey[200]
                            }}
                        />

                        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                            <Chip
                                label={task.priority}
                                color={priorityColors[task.priority]}
                                size="small"
                                sx={{ fontWeight: 500 }}
                            />
                            <Chip
                                label={task.status}
                                color={statusColors[task.status]}
                                size="small"
                            />
                            {urgency === "overdue" && (
                                <Tooltip title="¡Tarea vencida!">
                                    <Chip
                                        icon={<ErrorOutlineIcon fontSize="small" />}
                                        label="Vencida"
                                        color="error"
                                        size="small"
                                    />
                                </Tooltip>
                            )}
                            {urgency === "upcoming" && (
                                <Tooltip title="Tarea próxima a vencer">
                                    <Chip
                                        icon={<WarningAmberIcon fontSize="small" />}
                                        label="Próxima"
                                        color="warning"
                                        size="small"
                                    />
                                </Tooltip>
                            )}
                        </Stack>
                    </Box>

                    <Box sx={{ ml: 1 }}>
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit(task);
                                }}
                                size="small"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        color: theme.palette.primary.main,
                                        backgroundColor: theme.palette.primary.lighter
                                    }
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                size="small"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        color: theme.palette.error.main,
                                        backgroundColor: theme.palette.error.lighter
                                    }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2
                }}>
                    <Typography variant="caption" sx={{ color: dateColor, fontWeight: 500 }}>
                        {formattedDate}
                    </Typography>

                    {task.assigned_to && (
                        <Tooltip title={userMap?.[task.assigned_to] || "Nadie"}>
                            <Avatar
                                sx={{
                                    width: 28,
                                    height: 28,
                                    fontSize: '0.75rem',
                                    bgcolor: theme.palette.primary.main
                                }}
                            >
                                {userMap?.[task.assigned_to]?.charAt(0) || "?"}
                            </Avatar>
                        </Tooltip>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;