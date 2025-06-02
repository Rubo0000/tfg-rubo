import { Box, Typography, Grid, Paper } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ProjectOverview({ completedTasks, totalTasks, contributions, recentActivity }) {
    if (totalTasks === 0) {
        return (
            <Typography variant="body1" color="text.secondary">
                No hay tareas registradas en este proyecto.
            </Typography>
        );
    }

    const pendingTasks = totalTasks - completedTasks;

    const pieData = {
        labels: ["Completadas", "Pendientes"],
        datasets: [
            {
                label: "Estado de tareas",
                data: [completedTasks, pendingTasks],
                backgroundColor: ["#4caf50", "#ffc107"],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: Object.keys(contributions),
        datasets: [
            {
                label: "Tareas completadas",
                data: Object.values(contributions),
                backgroundColor: "#2196f3",
            },
        ],
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Progreso de tareas
                    </Typography>
                    <Pie data={pieData} />
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Contribuciones por usuario
                    </Typography>
                    <Bar data={barData} />
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Actividad reciente
                    </Typography>
                    {recentActivity.length === 0 ? (
                        <Typography variant="body2">Sin actividad reciente</Typography>
                    ) : (
                        recentActivity.map((entry, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                • {entry}
                            </Typography>
                        ))
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ProjectOverview;
