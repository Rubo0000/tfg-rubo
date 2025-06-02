// components/TaskDetail.jsx
import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Divider,
    Stack,
    Chip,
    Avatar,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTaskById, fetchCommentsByTaskId, addCommentToTask } from "../services/api";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CommentIcon from "@mui/icons-material/Comment";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { format } from "date-fns";
import AttachmentsSection from "./AttachmentsSection"; // Asegúrate de tener este componente
const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const loadTask = async () => {
            const data = await fetchTaskById(taskId);
            setTask(data);
        };
        const loadComments = async () => {
            const data = await fetchCommentsByTaskId(taskId);
            setComments(data);
        };
        loadTask();
        loadComments();
    }, [taskId]);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;
        await addCommentToTask(taskId, { content: newComment });
        const updatedComments = await fetchCommentsByTaskId(taskId);
        setComments(updatedComments);
        setNewComment("");
    };

    if (!task) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                {task.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={task.status} color="primary" />
                <Chip label={task.priority} color="secondary" />
                <Chip label={`Asignado a: ${task.assigned_to_name}`} />
                <Chip label={`Fecha límite: ${format(new Date(task.due_date), 'dd/MM/yyyy')}`} />
            </Stack>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} aria-label="task detail tabs">
                    <Tab label="Información" icon={<InfoIcon />} iconPosition="start" />
                    <Tab label="Comentarios" icon={<CommentIcon />} iconPosition="start" />
                    <Tab label="Adjuntos" icon={<InsertDriveFileIcon />} iconPosition="start" />
                    <Tab label="Historial" icon={<HistoryIcon />} iconPosition="start" />
                </Tabs>
                <Divider sx={{ my: 2 }} />
                {tabIndex === 0 && (
                    <Box>
                        <Typography variant="h6">Descripción</Typography>
                        <Typography>{task.description}</Typography>
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <List>
                            {comments.map((comment) => (
                                <ListItem key={comment.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>{comment.author_name.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={comment.author_name}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {format(new Date(comment.created_at), 'dd/MM/yyyy HH:mm')}
                                                </Typography>
                                                {" — "}{comment.content}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <TextField
                            label="Nuevo comentario"
                            multiline
                            fullWidth
                            rows={4}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            variant="outlined"
                            sx={{ mt: 2 }}
                        />
                        <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddComment}>
                            Añadir comentario
                        </Button>
                    </Box>
                )}
                {tabIndex === 2 && <AttachmentsSection taskId={task.id} />}

                {tabIndex === 3 && (
                    <Box>
                        <Typography>Historial de cambios (en desarrollo)</Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default TaskDetail;
