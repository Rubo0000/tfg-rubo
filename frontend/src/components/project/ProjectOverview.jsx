import { Box, Typography, Grid, Paper, useTheme } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title // Importa Title para añadir títulos a los gráficos
} from "chart.js";

// Registro de componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function ProjectOverview({ completedTasks, totalTasks, contributions, recentActivity }) {
    const theme = useTheme(); // Hook para acceder al tema de Material-UI

    if (totalTasks === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 3,
                    p: 3,
                    boxShadow: theme.shadows[1]
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    No hay tareas registradas en este proyecto.
                </Typography>
            </Box>
        );
    }

    const completed = completedTasks;
    const inProgress = contributions.__enProgreso || 0;
    const pending = totalTasks - completed - inProgress;

    // Colores más vibrantes y armónicos usando el tema de Material-UI
    const pieData = {
        labels: ["Completadas", "Pendientes", "En progreso"],
        datasets: [
            {
                label: "Estado de tareas",
                data: [completed, pending, inProgress],
                backgroundColor: [
                    theme.palette.success.main,    // Verde para completadas
                    theme.palette.warning.main,    // Amarillo para pendientes
                    theme.palette.info.main        // Azul para en progreso
                ],
                borderColor: theme.palette.background.paper, // Borde para diferenciar los segmentos
                borderWidth: 2,
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
                backgroundColor: theme.palette.primary.main, // Color primario para las barras
                borderColor: theme.palette.primary.dark,
                borderWidth: 1,
                borderRadius: 4 // Bordes redondeados para las barras
            },
        ],
    };

    // Opciones para los gráficos
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Distribución de Tareas por Estado',
                font: {
                    size: 18
                },
                color: theme.palette.text.primary
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + ' tareas';
                        }
                        return label;
                    }
                }
            }
        },
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Contribuciones por Usuario',
                font: {
                    size: 18
                },
                color: theme.palette.text.primary
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' tareas';
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // Asegura que los ticks del eje Y sean enteros
                }
            }
        }
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[3] }}>
                    {/* El título se maneja ahora dentro de las opciones del gráfico */}
                    <Pie data={pieData} options={pieOptions} />
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, boxShadow: theme.shadows[3] }}>
                    {/* El título se maneja ahora dentro de las opciones del gráfico */}
                    <Bar data={barData} options={barOptions} />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ProjectOverview;