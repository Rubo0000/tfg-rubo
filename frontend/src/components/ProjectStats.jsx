import { Box, Typography, LinearProgress, Divider, List, ListItem, ListItemText } from "@mui/material";

function ProjectStats({ totalTasks = 10, completedTasks = 6, userTasks = 4, recentActivity = [] }) {
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const userContribution = totalTasks > 0 ? Math.round((userTasks / totalTasks) * 100) : 0;

    return (
        <Box
            sx={{
                mt: 6,
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
            }}
        >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                📈 Estadísticas del proyecto
            </Typography>

            <Typography variant="subtitle2">Progreso general:</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ my: 1, height: 10, borderRadius: 5 }} />
            <Typography variant="body2" color="text.secondary">{progress}% completado</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2">Tu contribución:</Typography>
            <Typography variant="body2" color="text.secondary">{userContribution}% de las tareas</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2">Actividad reciente:</Typography>
            <List dense>
                {recentActivity.length === 0 ? (
                    <ListItem><ListItemText primary="Sin actividad reciente" /></ListItem>
                ) : (
                    recentActivity.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))
                )}
            </List>
        </Box>
    );
}

export default ProjectStats;
