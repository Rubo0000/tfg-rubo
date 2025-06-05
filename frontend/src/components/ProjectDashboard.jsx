import {
    Box,
    Typography,
    Grid,
    Paper,
    CircularProgress,
} from "@mui/material";
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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function ProjectDashboard() {
    const { id: projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/tasks/by_project/${projectId}`
                );
                const data = await res.json();
                setTasks(data);
                setLoading(false);
            } catch (err) {
                console.error("Error al obtener tareas:", err);
                setLoading(false);
            }
        };
        fetchTasks();
    }, [projectId]);

    if (loading) {
        return (
            <Box sx={{ px: 4, py: 6, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
        (task) => task.status === "completada"
    ).length;
    const pendingTasks = totalTasks - completedTasks;

    const contributions = tasks.reduce((acc, task) => {
        const userId = task.assigned_to || "Sin asignar";
        acc[userId] = (acc[userId] || 0) + 1;
        return acc;
    }, {});

    const pieData = {
        labels: ["Completadas", "Pendientes"],
        datasets: [
            {
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
                label: "Tareas por usuario",
                data: Object.values(contributions),
                backgroundColor: "#2196f3",
            },
        ],
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Dashboard del Proyecto #{projectId}
            </Typography>

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
        </Box>
    );
}

export default ProjectDashboard;
