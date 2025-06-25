import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    useTheme,
    CircularProgress,
    Alert,
    Tabs,
    Tab,
    Avatar,
    Badge,
    Stack
} from "@mui/material";
import {
    fetchAllProjects,
    fetchGlobalStatistics,
    fetchStudents,
} from "../services/api";
import ProjectSupervision from "../components/teacher/ProjectSupervision";
import StudentManagement from "../components/teacher/StudentManagement";
import GlobalStats from "../components/teacher/GlobalStats";
import AppHeader from "../components/layout/AppHeader";

function TeacherDashboard() {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [projectsData, statsData, studentsData] = await Promise.all([
                    fetchAllProjects(),
                    fetchGlobalStatistics(),
                    fetchStudents(),
                ]);
                setProjects(projectsData);
                setStats(statsData);
                setStudents(studentsData);
            } catch (err) {
                setError("Error al cargar los datos del docente");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <>
            <AppHeader />
            <Box sx={{ px: 4, py: 6 }}>
                {/* Sección de bienvenida centrada */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    mb: 4
                }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Bienvenido, {localStorage.getItem('userName')}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {new Date().toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{
                    mb: 4,
                    justifyContent: 'center',
                    maxWidth: '800px',
                    mx: 'auto'
                }}>
                    {[
                        {
                            title: "Proyectos Activos",
                            value: stats?.total_projects || 0,
                            color: "primary"
                        },
                        {
                            title: "Estudiantes",
                            value: students.length,
                            color: "secondary"
                        },
                        {
                            title: "Tareas Completadas",
                            value: stats?.completed_tasks || 0,
                            color: "success"
                        },
                        {
                            title: "Progreso Promedio",
                            value: `${stats?.average_progress || 0}%`,
                            color: "warning"
                        }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: theme.palette[item.color].light,
                                textAlign: 'center'
                            }}>
                                <Typography variant="subtitle2" color={`${item.color}.contrastText`} gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="h4" color={`${item.color}.contrastText`} fontWeight="bold">
                                    {item.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Tabs y contenido (se mantienen como antes) */}
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        mb: 4,
                        '& .MuiTabs-indicator': {
                            height: 4,
                            borderRadius: 2
                        }
                    }}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Badge badgeContent={projects.length} color="primary">
                                <span>Supervisión de Proyectos</span>
                            </Badge>
                        </Stack>
                    } />
                    <Tab label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Badge badgeContent={students.length} color="secondary">
                                <span>Gestión de Estudiantes</span>
                            </Badge>
                        </Stack>
                    } />
                    <Tab label="Estadísticas Globales" />
                </Tabs>

                {tabValue === 0 && <ProjectSupervision projects={projects} />}
                {tabValue === 1 && <StudentManagement students={students} stats={stats} />}
                {tabValue === 2 && <GlobalStats stats={stats} />}
            </Box>
        </>
    );
}

export default TeacherDashboard;