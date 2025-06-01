import { Box, Typography, Grid, Paper } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ProjectDashboard() {
    // Simulación de datos (estos deberían venir de la API)
    const totalTasks = 12;
    const completedTasks = 8;
    const pendingTasks = totalTasks - completedTasks;

    const contributions = {
        Rubén: 5,
        María: 3,
        Juan: 4,
    };

    const recentActivity = [
        "Rubén completó 'Frontend Auth'",
        "Juan editó 'Backend API'",
        "María añadió 'Documentación'",
    ];

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
        <Box sx={{ px: 4, py: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard: Proyecto TFG
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Progreso de tareas</Typography>
                        <Pie data={pieData} />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Contribuciones por usuario</Typography>
                        <Bar data={barData} />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" gutterBottom>Actividad reciente</Typography>
                        {recentActivity.map((entry, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                • {entry}
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProjectDashboard;
