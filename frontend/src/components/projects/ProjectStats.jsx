import {
    Box,
    Typography,
    LinearProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
} from "@mui/material";

function ProjectStats({ totalTasks = 0, completedTasks = 0, userTasks = 0, recentActivity = [] }) {
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const userContribution = totalTasks > 0 ? Math.round((userTasks / totalTasks) * 100) : 0;

    return (
        <Paper
            elevation={3}
            sx={{
                mt: 4,
                p: 4,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
            }}
        >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                📈 Estadísticas del proyecto
            </Typography>

            {/* Progreso general */}
            <Typography variant="subtitle2">Progreso general:</Typography>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ my: 1, height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" color="text.secondary">
                {progress}% completado
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Contribución del usuario */}
            <Typography variant="subtitle2">Tu contribución:</Typography>
            <Typography variant="body2" color="text.secondary">
                {userContribution}% de las tareas
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Actividad reciente */}
            <Typography variant="subtitle2" gutterBottom>
                Actividad reciente:
            </Typography>
            <List dense>
                {recentActivity.length === 0 ? (
                    <ListItem>
                        <ListItemText primary="Sin actividad reciente" />
                    </ListItem>
                ) : (
                    recentActivity.map((item, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))
                )}
            </List>
        </Paper>
    );
}

export default ProjectStats;
