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
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Panel de Docente
                </Typography>

                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{ mb: 4 }}
                    variant="fullWidth"
                >
                    <Tab label="Supervisión de Proyectos" />
                    <Tab label="Gestión de Estudiantes" />
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