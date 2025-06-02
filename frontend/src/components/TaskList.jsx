// components/TaskList.jsx
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Grid,
    Divider,
    Stack,
    Tooltip,
    Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

const TaskList = ({
    tasks = [],
    onTaskUpdate,
    setTaskModalOpen,
    setSelectedTask,
    statusFilter,
    priorityFilter,
    onlyMine,
    userId
}) => {


    const handleDeleteClick = async (taskId) => {
        try {
            await deleteTask(taskId);
            await onTaskUpdate(); // recarga lista
        } catch (error) {
            console.error("Error al borrar tarea:", error);
        }
    };

    if (!tasks || tasks.length === 0) {
        return (
            <Typography sx={{ mb: 4 }} variant="body1" color="text.secondary">
                No hay tareas registradas en este proyecto.
            </Typography>
        );
    }

    const filteredTasks = tasks?.filter(task =>
        (!statusFilter || task.status === statusFilter) &&
        (!priorityFilter || task.priority === priorityFilter) &&
        (!onlyMine || task.assigned_to === userId)
    ) || [];


    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={2}>
                {filteredTasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
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
                            </Stack>

                            <Typography variant="caption" display="block">
                                Fecha: {task.due_date || "Sin fecha"}
                            </Typography>
                            <Typography variant="caption">
                                Asignado a: {task.assigned_to || "Nadie"}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TaskList;
