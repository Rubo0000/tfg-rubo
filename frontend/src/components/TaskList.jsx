// components/TaskList.jsx
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Grid,
    Divider,
    Stack,
    Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask } from "../services/api";

const TaskList = ({ tasks = [], onTaskUpdate, setTaskModalOpen, setSelectedTask }) => {
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

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} sm={6} md={4} key={task.id}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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

                            {task.description && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {task.description}
                                </Typography>
                            )}

                            <Divider sx={{ my: 1.5 }} />

                            <Typography variant="caption">
                                Estado: <strong>{task.status}</strong> | Prioridad: <strong>{task.priority}</strong>
                            </Typography>
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
