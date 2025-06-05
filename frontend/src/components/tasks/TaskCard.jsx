import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography color="text.secondary">{task.description}</Typography>
                        <Typography variant="body2">Estado: {task.status}</Typography>
                        <Typography variant="body2">Prioridad: {task.priority}</Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={() => onEdit(task)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
