import { Box, Typography, Grid } from "@mui/material";
import TaskCard from "./TaskCard";

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

    const renderGroup = (titulo, tareas) => (
        tareas.length > 0 && (
            <>
                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{titulo}</Typography>
                <Grid container spacing={2}>
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
            </>
        )
    );

    return (
        <Box sx={{ mt: 4 }}>
            {totalFiltradas === 0 ? (
                <Typography variant="body1" sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                    No hay tareas que coincidan con los filtros seleccionados.
                </Typography>
            ) : (
                <>
                    {renderGroup("🎉 Vencidas", vencidas)}
                    {renderGroup("⚠️ Próximas (≤ 3 días)", proximas)}
                    {renderGroup("📌 Otras tareas", otras)}
                </>
            )}
        </Box>
    );
};

export default TaskList;
