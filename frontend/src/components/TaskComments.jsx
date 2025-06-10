import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import {
    fetchCommentsByTaskId,
    addCommentToTask,
    deleteComment,
} from "../services/api";
import { format } from "date-fns";

const TaskComments = ({ taskId, userMap }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const userId = parseInt(localStorage.getItem("userId"));

    useEffect(() => {
        const loadComments = async () => {
            const data = await fetchCommentsByTaskId(taskId);
            setComments(data);
        };
        loadComments();
    }, [taskId]);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;
        await addCommentToTask(taskId, { content: newComment, user_id: userId });
        const updatedComments = await fetchCommentsByTaskId(taskId);
        setComments(updatedComments);
        setNewComment("");
    };

    const handleDeleteComment = async (commentId) => {
        await deleteComment(commentId, userId);
        const updatedComments = await fetchCommentsByTaskId(taskId);
        setComments(updatedComments);
    };

    return (
        <Box>
            <List>
                {comments.map((comment) => (
                    <ListItem key={comment.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar>{userMap[comment.user_id]?.charAt(0) || '?'}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={userMap[comment.user_id] || "Usuario Desconocido"}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        {format(new Date(comment.created_at), 'dd/MM/yyyy HH:mm')}
                                    </Typography>
                                    {" — "}{comment.content}
                                </>
                            }
                        />
                        {comment.user_id === userId && (
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
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
    );
};

export default TaskComments;