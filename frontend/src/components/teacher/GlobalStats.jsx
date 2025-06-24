import {
    Box,
    Typography,
    Grid,
    Paper,
    useTheme,
    Divider,
    LinearProgress,
} from "@mui/material";
import {
    PieChart,
    Pie,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function GlobalStats({ stats }) {
    const theme = useTheme();

    if (!stats) return null;

    const projectData = [
        { name: "Activos", value: stats.total_projects },
        { name: "Completados", value: 0 },
    ];

    const taskData = [
        { name: "Completadas", value: stats.completed_tasks },
        { name: "Pendientes", value: stats.pending_tasks },
    ];

    return (
        <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Estadísticas globales de la plataforma
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Distribución de Proyectos
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={projectData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {projectData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Distribución de Tareas
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={taskData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8">
                                    {taskData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Resumen General
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Proyectos Totales"
                                    value={stats.total_projects}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Tareas Totales"
                                    value={stats.total_tasks}
                                    color={theme.palette.secondary.main}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Tareas Completadas"
                                    value={stats.completed_tasks}
                                    color={theme.palette.success.main}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Progreso Promedio"
                                    value={`${stats.average_progress}%`}
                                    color={theme.palette.warning.main}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

const StatCard = ({ title, value, color }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            borderRadius: 3,
            borderLeft: `4px solid ${color}`,
            bgcolor: "background.paper",
        }}
    >
        <Typography variant="subtitle2" color="text.secondary">
            {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color={color}>
            {value}
        </Typography>
    </Paper>
);

export default GlobalStats;