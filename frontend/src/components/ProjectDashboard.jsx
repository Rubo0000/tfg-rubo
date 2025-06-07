import {
    Box, CircularProgress, Alert, Button
} from "@mui/material";
import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import {
    fetchProjectById, fetchTasksByProject, createTask, updateTask,
    fetchUsersByProject, deleteTask, removeUserFromProject, addUserToProject,
    fetchUsers
} from "../services/api";
import { useProjectStats } from "../hooks/useProjectStats";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";
import ProjectStats from "../components/ProjectStats";
import ProjectOverview from "../components/ProjectOverview";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import ProjectMembers from "../components/ProjectMembers";
import AppHeader from "../components/AppHeader";

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
    const [projectUsers, setProjectUsers] = useState([]);
    const [userMap, setUserMap] = useState({});
    const userId = parseInt(localStorage.getItem("userId"));
    const { stats, loading, error: statsError, refetchStats } = useProjectStats(projectId);

    const loadTasks = async () => {
        const data = await fetchTasksByProject(projectId);
        setTasks(data);
    };

    const loadProjectUsers = async () => {
        try {
            const data = await fetchUsersByProject(projectId);
            setProjectUsers(data);
            console.log("Usuarios del proyecto:", data);
        } catch (err) {
            console.error("Error al obtener usuarios del proyecto", err);
        }
    };

    const loadUsers = async () => {
        try {
            const data = await fetchUsers();
            setUsers(data);
            console.log("Usuarios en general:", data);
            const map = {};
            data.forEach(user => {
                map[user.id] = user.name;
            });
            setUserMap(map);
            console.log("Mapa de usuarios:", map);
        } catch (err) {
            console.error("Error al obtener usuarios en general ", err);
        }
    };

    const handleAddUser = async (userId) => {
        try {
            await addUserToProject(projectId, userId);
            await loadProjectUsers();
        } catch (err) {
            console.error("Error al agregar usuario al proyecto", err);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            await removeUserFromProject(projectId, userId);
            await loadProjectUsers();
        } catch (err) {
            console.error("Error al eliminar usuario del proyecto", err);
        }
    };

    useEffect(() => {
        if (!projectId) {
            setError("ID de proyecto no válido.");
            return;
        }
        loadTasks();
        loadProjectUsers();
        loadUsers();
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

    return (
        <>
            <AppHeader />
            <Box sx={{ px: 4, py: 6 }}>
                <ProjectDetailsHeader name={project.name} description={project.description} />

                <ProjectMembers
                    allUsers={users}
                    projectUsers={projectUsers}
                    onAddUser={handleAddUser}
                    onRemoveUser={handleRemoveUser}
                />

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
                    projectId={projectId}
                    onEdit={(t) => {
                        setSelectedTask(t);
                        setTaskModalOpen(true);
                    }}
                    onDelete={async (t) => {
                        try {
                            await deleteTask(t);
                        } catch (err) {
                            console.error("Error al eliminar tarea:", err);
                        }
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

                <CreateTaskModal
                    open={taskModalOpen}
                    onClose={() => {
                        setTaskModalOpen(false);
                        setSelectedTask(null);
                    }}
                    onCreate={async (data) => {
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
                    users={projectUsers.map(user => ({
                        id: user.id,
                        name: user.name
                    }))}
                />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => window.history.back()}
                    sx={{
                        mb: 2,
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: 2,
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    ← Volver al dashboard
                </Button>

            </Box>

        </>

    );
}

export default ProjectDashboard;
