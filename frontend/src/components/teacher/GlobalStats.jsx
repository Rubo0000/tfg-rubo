import {
    Box,
    Typography,
    Grid,
    Paper,
    useTheme,
    Divider,
    LinearProgress,
    Stack,
    Avatar
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
import { CheckCircle, Assignment, School, Timeline } from "@mui/icons-material";

const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc948", "#b07aa1"];

function GlobalStats({ stats }) {
    const theme = useTheme();

    if (!stats) return null;

    const projectData = [
        { name: "Activos", value: stats.active_projects },
        { name: "Completados", value: stats.completed_projects },
        { name: "Pendientes", value: stats.pending_projects },
    ];

    const taskData = [
        { name: "Completadas", value: stats.completed_tasks },
        { name: "Pendientes", value: stats.pending_tasks },
        { name: "Atrasadas", value: stats.overdue_tasks },
    ];

    const studentProgressData = stats.students_progress_range?.map(item => ({
        name: item.range,
        value: item.count
    })) || [];

    return (
        <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Estadísticas globales de la plataforma
            </Typography>

            <Grid container spacing={4}>
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
                                    icon={<Assignment color="primary" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Tareas Totales"
                                    value={stats.total_tasks}
                                    color={theme.palette.secondary.main}
                                    icon={<CheckCircle color="secondary" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Estudiantes"
                                    value={stats.total_students}
                                    color={theme.palette.success.main}
                                    icon={<School color="success" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title="Progreso Promedio"
                                    value={`${stats.average_progress}%`}
                                    color={theme.palette.warning.main}
                                    icon={<Timeline color="warning" />}
                                    progress={stats.average_progress}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

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
                                    animationBegin={0}
                                    animationDuration={1000}
                                >
                                    {projectData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [`${value} proyectos`, 'Cantidad']}
                                />
                                <Legend />
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
                                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [`${value} tareas`, 'Cantidad']}
                                    labelFormatter={(label) => `Estado: ${label}`}
                                />
                                <Legend />
                                <Bar dataKey="value" name="Tareas" radius={[4, 4, 0, 0]}>
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

                {studentProgressData.length > 0 && (
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                Progreso de Estudiantes por Rango
                            </Typography>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={studentProgressData}
                                    layout="vertical"
                                    margin={{ left: 30 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={120} />
                                    <Tooltip
                                        formatter={(value) => [`${value} estudiantes`, 'Cantidad']}
                                        labelFormatter={(label) => `Rango: ${label}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" name="Estudiantes" radius={[0, 4, 4, 0]}>
                                        {studentProgressData.map((entry, index) => (
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
                )}
            </Grid>
        </Box>
    );
}

const StatCard = ({ title, value, color, icon, progress }) => (
    <Paper
        elevation={0}
        sx={{
            p: 3,
            borderRadius: 3,
            borderLeft: `4px solid ${color}`,
            bgcolor: "background.paper",
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <Stack direction="row" alignItems="center" spacing={2}>
            {icon && (
                <Avatar sx={{ bgcolor: `${color}20`, color: color }}>
                    {icon}
                </Avatar>
            )}
            <Box>
                <Typography variant="subtitle2" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={color}>
                    {value}
                </Typography>
            </Box>
        </Stack>

        {progress !== undefined && (
            <Box sx={{ mt: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: `${color}20`,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: color
                        }
                    }}
                />
            </Box>
        )}
    </Paper>
);

export default GlobalStats;