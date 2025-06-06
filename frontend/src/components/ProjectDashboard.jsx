import {
    Box, CircularProgress, Alert, Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    fetchProjectById, fetchTasksByProject, createTask, updateTask, fetchUsers
} from "../services/api";
import { useProjectStats } from "../hooks/useProjectStats";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";
import ProjectStats from "../components/ProjectStats";
import ProjectOverview from "../components/ProjectOverview";
import TaskModal from "../components/TaskModal";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList"; // ← importante

function ProjectDashboard() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState("");
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState(null);
    const [onlyMine, setOnlyMine] = useState(false);
    const [users, setUsers] = useState([]);
    const [userMap, setUserMap] = useState({});
    const userId = parseInt(localStorage.getItem("userId"));
    const { stats, loading, error: statsError, refetchStats } = useProjectStats(projectId);

    const loadTasks = async () => {
        const data = await fetchTasksByProject(projectId);
        setTasks(data);
    };

    useEffect(() => {
        if (!projectId) {
            setError("ID de proyecto no válido.");
            return;
        }
        loadTasks();
    }, [projectId]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
                const map = {};
                usersData.forEach(user => {
                    map[user.id] = user.name;
                });
                setUserMap(map);
            } catch (err) {
                console.error("Error al cargar usuarios:", err);
            }
        };
        loadUsers();
    }, []);

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
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                onlyMine={onlyMine}
                userId={userId}
                userMap={userMap}
                onEdit={(t) => {
                    setSelectedTask(t);
                    setTaskModalOpen(true);
                }}
                onDelete={async (id) => {
                    // lógica de borrado si la tienes implementada
                    await loadTasks();
                    await refetchStats();
                }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={() => setTaskModalOpen(true)}
                sx={{ mt: 3 }}
            >
                ➕ Crear nueva tarea
            </Button>

            <ProjectStats {...stats} />

            <Box sx={{ mt: 6 }}>
                <ProjectOverview {...stats} />
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
                        await refetchStats();
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
