import { Box, Typography, Grid, Paper, Chip } from "@mui/material";
import TaskCard from "./TaskCard";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const getUrgency = (dueDateStr) => {
    if (!dueDateStr) return "normal";
    const today = new Date();
    const dueDate = new Date(dueDateStr);
    const diffInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    if (diffInDays < 0) return "overdue";
    if (diffInDays <= 3) return "upcoming";
    return "normal";
};

const TaskList = ({
    tasks,
    statusFilter,
    priorityFilter,
    onlyMine,
    userId,
    userMap,
    onEdit,
    onDelete,
    projectId,
}) => {
    const filtered = tasks.filter(task => {
        const matchStatus = !statusFilter || task.status === statusFilter;
        const matchPriority = !priorityFilter || task.priority === priorityFilter;
        const matchMine = !onlyMine || task.assigned_to === userId;
        return matchStatus && matchPriority && matchMine;
    });

    const vencidas = filtered.filter(t => getUrgency(t.due_date) === "overdue");
    const proximas = filtered.filter(t => getUrgency(t.due_date) === "upcoming");
    const otras = filtered.filter(t => getUrgency(t.due_date) === "normal");
    const totalFiltradas = vencidas.length + proximas.length + otras.length;

    const renderGroup = (titulo, tareas, icon) => (
        tareas.length > 0 && (
            <Box component="section" sx={{ mt: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'text.primary',
                        fontWeight: 600
                    }}
                >
                    {icon} {titulo} <Chip label={`${tareas.length}`} size="small" />
                </Typography>
                <Grid container spacing={3}>
                    {tareas.map(task => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                            <TaskCard
                                projectId={projectId}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                userMap={userMap}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    );

    return (
        <Box sx={{ mt: 2 }}>
            {totalFiltradas === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        textAlign: "center",
                        p: 4,
                        mt: 4,
                        backgroundColor: 'background.paper',
                        borderRadius: 2
                    }}
                >
                    <SentimentDissatisfiedIcon sx={{ fontSize: 48, mb: 2, color: 'text.disabled' }} />
                    <Typography variant="h6" color="text.secondary">
                        No hay tareas que coincidan con los filtros seleccionados
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Intenta ajustar los filtros o crear una nueva tarea
                    </Typography>
                </Paper>
            ) : (
                <>
                    {renderGroup("Tareas Vencidas", vencidas, "🔥")}
                    {renderGroup("Próximas a Vencer (≤ 3 días)", proximas, "⏰")}
                    {renderGroup("Otras Tareas", otras, "📌")}
                </>
            )}
        </Box>
    );
};

export default TaskList;