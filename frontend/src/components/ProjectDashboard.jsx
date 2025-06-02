import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjectById } from "../services/api";
import { useProjectStats } from "../hooks/useProjectStats";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";
import ProjectStats from "../components/ProjectStats";
import ProjectOverview from "../components/ProjectOverview";
import TaskModal from "../components/TaskModal";
import { updateTask } from "../services/api";
import { createTask, fetchTasksByProject } from "../services/api"; // ya deberías tener esto
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters"; // Asegúrate de tener este componente
function ProjectDashboard() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState("");
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState(null);
    const [onlyMine, setOnlyMine] = useState(false);
    const userId = parseInt(localStorage.getItem("userId"));
    const projectStats = useProjectStats(projectId) || {};
    const { stats, loading, error: statsError, refetchStats } = useProjectStats(projectId);

    const loadTasks = async () => {
        const data = await fetchTasksByProject(projectId);
        setTasks(data);
    };

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasksByProject(projectId);
            setTasks(data);
        };
        loadTasks();
    }, [projectId]);


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


    const handleTaskCreate = async (taskData) => {
        try {
            await createTask(taskData);
            window.location.reload();
        } catch (err) {
            console.error("Error al crear tarea:", err);
        }
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            <ProjectDetailsHeader name={project.name} description={project.description} />

            <TaskFilters
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                onlyMine={onlyMine}
                setOnlyMine={setOnlyMine}
                userId={userId}
            />


            <TaskList
                tasks={tasks}
                onTaskUpdate={async () => {
                    await loadTasks();
                    await refetchStats();
                }}
                setTaskModalOpen={setTaskModalOpen}
                setSelectedTask={setSelectedTask}
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={() => setTaskModalOpen(true)}
                sx={{ mb: 3 }}
            >
                ➕ Crear nueva tarea
            </Button>

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
            <TaskModal
                open={taskModalOpen}
                onClose={() => {
                    setTaskModalOpen(false);
                    setSelectedTask(null);
                }}
                onSubmit={async (data) => {
                    try {
                        if (selectedTask) {
                            await updateTask(selectedTask.id, data);
                        } else {
                            await createTask(data);
                        }
                        await loadTasks();
                        await refetchStats(); // ← ¡aquí también!
                    } catch (err) {
                        console.error("Error al guardar tarea:", err);
                    }
                }}
                projectId={parseInt(projectId)}
                initialData={selectedTask}
            />



        </Box>
    );
}

export default ProjectDashboard;