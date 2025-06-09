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

    // Nuevos cálculos más precisos para cada estado
    const completed = completedTasks;
    const inProgress = contributions.__enProgreso || 0;
    const pending = totalTasks - completed - inProgress;

    const pieData = {
        labels: ["Completadas", "Pendientes", "En progreso"],
        datasets: [
            {
                label: "Estado de tareas",
                data: [completed, pending, inProgress],
                backgroundColor: ["#4caf50", "#ffc107", "#2196f3"],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: Object.keys(contributions).filter(k => !k.startsWith("__")),
        datasets: [
            {
                label: "Tareas completadas",
                data: Object.entries(contributions)
                    .filter(([k]) => !k.startsWith("__"))
                    .map(([, v]) => v),
                backgroundColor: "#1976d2",
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
        </Grid>
    );
}

export default ProjectOverview;
