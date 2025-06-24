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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main }}>
                        {localStorage.getItem('userName')?.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            Bienvenido, {localStorage.getItem('userName')}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.primary.light }}>
                            <Typography variant="subtitle2" color="primary.contrastText">
                                Proyectos Activos
                            </Typography>
                            <Typography variant="h4" color="primary.contrastText">
                                {stats?.total_projects || 0}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.secondary.light }}>
                            <Typography variant="subtitle2" color="secondary.contrastText">
                                Estudiantes
                            </Typography>
                            <Typography variant="h4" color="secondary.contrastText">
                                {students.length}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.success.light }}>
                            <Typography variant="subtitle2" color="success.contrastText">
                                Tareas Completadas
                            </Typography>
                            <Typography variant="h4" color="success.contrastText">
                                {stats?.completed_tasks || 0}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.warning.light }}>
                            <Typography variant="subtitle2" color="warning.contrastText">
                                Progreso Promedio
                            </Typography>
                            <Typography variant="h4" color="warning.contrastText">
                                {stats?.average_progress || 0}%
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

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