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
    Paper,
    Divider,
    Fade,
    InputAdornment
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import {
    fetchCommentsByTaskId,
    addCommentToTask,
    deleteComment,
} from "../services/api";
import { format, isValid } from "date-fns";
import { es } from 'date-fns/locale'; // Importar el locale español

const TaskComments = ({ taskId, userMap }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isSending, setIsSending] = useState(false);
    const userId = parseInt(localStorage.getItem("userId")); // Asume que el userId está en localStorage

    const loadComments = async () => {
        try {
            const data = await fetchCommentsByTaskId(taskId);
            setComments(data);
        } catch (error) {
            console.error("Error loading comments:", error);
            // Podrías añadir un estado para mostrar un mensaje de error al usuario
        }
    };

    useEffect(() => {
        loadComments();
    }, [taskId]);

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;
        setIsSending(true);
        try {
            await addCommentToTask(taskId, { content: newComment, user_id: userId });
            await loadComments(); // Recargar comentarios
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
            // Manejar error de envío
        } finally {
            setIsSending(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) return;
        try {
            await deleteComment(commentId, userId); // Asegúrate de que el backend valide el userId
            await loadComments(); // Recargar comentarios
        } catch (error) {
            console.error("Error deleting comment:", error);
            // Manejar error de eliminación
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Comentarios
            </Typography>
            <Paper elevation={1} sx={{ maxHeight: 400, overflowY: 'auto', mb: 2, borderRadius: 2, p: 1 }}>
                <List sx={{ width: '100%' }}>
                    {comments.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                            Sé el primero en dejar un comentario.
                        </Typography>
                    ) : (
                        comments.map((comment) => (
                            <Fade in={true} key={comment.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        py: 1.5,
                                        px: 2,
                                        mb: 1,
                                        borderRadius: 1.5,
                                        bgcolor: comment.user_id === userId ? 'primary.light' : 'grey.100',
                                        ml: comment.user_id === userId ? 'auto' : 0, // Alinea tus comentarios a la derecha
                                        mr: comment.user_id === userId ? 0 : 'auto', // Alinea tus comentarios a la izquierda
                                        maxWidth: '95%',
                                        boxShadow: 1,
                                        '&:hover': {
                                            boxShadow: 3,
                                        }
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: comment.user_id === userId ? 'primary.main' : 'secondary.main' }}>
                                            {userMap[comment.user_id]?.charAt(0) || 'U'}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                component="span"
                                                variant="subtitle2"
                                                color="text.primary"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {userMap[comment.user_id] || "Usuario Desconocido"}
                                                <Typography
                                                    component="span"
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ ml: 1 }}
                                                >
                                                    {isValid(new Date(comment.created_at)) ? format(new Date(comment.created_at), 'dd/MM/yyyy HH:mm', { locale: es }) : 'Fecha inválida'}
                                                </Typography>
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block', mt: 0.5 }}>
                                                {comment.content}
                                            </Typography>
                                        }
                                    />
                                    {comment.user_id === userId && (
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            sx={{ ml: 1, color: 'error.main' }}
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </ListItem>
                            </Fade>
                        ))
                    )}
                </List>
            </Paper>
            <TextField
                label="Escribe un comentario..."
                multiline
                fullWidth
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                variant="outlined"
                sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddComment}
                                disabled={newComment.trim() === "" || isSending}
                                endIcon={isSending ? null : <SendIcon />}
                                sx={{ borderRadius: 1.5, py: 1.5, px: 3 }}
                            >
                                {isSending ? 'Enviando...' : 'Enviar'}
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default TaskComments;