import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjectById } from "../services/api";
import { useProjectStats } from "../hooks/useProjectStats";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";
import ProjectStats from "../components/ProjectStats";
import ProjectOverview from "../components/ProjectOverview";

function ProjectDashboard() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState("");

    const projectStats = useProjectStats(projectId) || {};
    const { stats, loading, error: statsError } = projectStats;

    useEffect(() => {
        const loadProject = async () => {
            try {
                const data = await fetchProjectById(projectId);
                setProject(data);
            } catch (err) {
                setError("No se pudo cargar el proyecto.");
                console.error(err);
            }
        };
        loadProject();
    }, [projectId]);

    if (error || statsError) {
        return <Alert severity="error">{error || statsError}</Alert>;
    }

    if (!project || loading || !stats) {
        return (
            <Box sx={{ px: 4, py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <ProjectDetailsHeader name={project.name} description={project.description} />

            <ProjectStats
                totalTasks={stats.totalTasks}
                completedTasks={stats.completedTasks}
                userTasks={stats.userTasks}
                recentActivity={stats.recentActivity}
            />

            <Box sx={{ mt: 6 }}>
                <ProjectOverview
                    completedTasks={stats.completedTasks}
                    totalTasks={stats.totalTasks}
                    contributions={stats.contributions}
                    recentActivity={stats.recentActivity}
                />
            </Box>
        </Box>
    );
}

export default ProjectDashboard;