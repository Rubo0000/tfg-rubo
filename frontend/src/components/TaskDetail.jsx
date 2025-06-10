import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Divider,
    Stack,
    Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    fetchTaskById,
    fetchUsers
} from "../services/api";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CommentIcon from "@mui/icons-material/Comment";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import AttachmentsSection from "./AttachmentsSection";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import AppHeader from "./AppHeader";

const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [userMap, setUserMap] = useState({});

    useEffect(() => {
        const loadTask = async () => {
            const data = await fetchTaskById(taskId);
            setTask(data);
        };

        const loadUsers = async () => {
            const users = await fetchUsers();
            const map = {};
            users.forEach(user => {
                map[user.id] = user.name;
            });
            setUserMap(map);
        };

        loadTask();
        loadUsers();
    }, [taskId]);

    if (!task) return <Typography>Cargando...</Typography>;

    return (
        <>
            <AppHeader />
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {task.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={task.status} color="primary" />
                    <Chip label={task.priority} color="secondary" />
                    <Chip label={`Asignado a: ${userMap[task.assigned_to] || "Nadie"}`} />
                    <Chip label={`Fecha límite: ${format(new Date(task.due_date), "dd/MM/yyyy")}`} />
                </Stack>
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} aria-label="task detail tabs">
                        <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
                        <Tab label="Comentarios" icon={<CommentIcon />} iconPosition="start" />
                        <Tab label="Adjuntos" icon={<InsertDriveFileIcon />} iconPosition="start" />
                        <Tab label="Historial" icon={<HistoryIcon />} iconPosition="start" />
                    </Tabs>
                    <Divider sx={{ my: 2 }} />
                    {tabIndex === 0 && <TaskInfo description={task.description} />}
                    {tabIndex === 1 && <TaskComments taskId={taskId} userMap={userMap} />}
                    {tabIndex === 2 && <AttachmentsSection taskId={task.id} />}
                    {tabIndex === 3 && (
                        <Box>
                            <Typography>Historial de cambios (en desarrollo)</Typography>
                        </Box>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default TaskDetail;