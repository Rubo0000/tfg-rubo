import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress,
    Paper,
    LinearProgress,
    Alert
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAttachmentsByTaskId, uploadAttachmentToTask } from '../services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const AttachmentsSection = ({ taskId }) => {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const userId = parseInt(localStorage.getItem("userId")); // Asume que el userId está en localStorage

    const loadAttachments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAttachmentsByTaskId(taskId);
            setAttachments(data);
        } catch (err) {
            setError("Error al cargar los adjuntos.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAttachments();
    }, [taskId]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);
        setError(null);

        const onUploadProgress = (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
        };

        try {
            await uploadAttachmentToTask(taskId, file, onUploadProgress);
            await loadAttachments(); // Recargar adjuntos después de subir
            event.target.value = null; // Limpiar el input file
        } catch (err) {
            setError("Error al subir el archivo.");
            console.error(err);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDeleteAttachment = async (attachmentId, filename) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar "${filename}"?`)) return;
        try {
            // Asegúrate de que tu API de eliminación reciba el userId si es necesario para validación
            await deleteAttachment(attachmentId, userId);
            await loadAttachments();
        } catch (err) {
            setError("Error al eliminar el adjunto.");
            console.error(err);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                Archivos Adjuntos
            </Typography>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploading}
                    sx={{ mb: 2, borderRadius: 1.5 }}
                >
                    {uploading ? 'Subiendo...' : 'Subir Archivo'}
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {uploading && (
                    <Box sx={{ width: '100%', mt: 1 }}>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center' }}>
                            {uploadProgress}%
                        </Typography>
                    </Box>
                )}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {attachments.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                                No hay archivos adjuntos para esta tarea.
                            </Typography>
                        ) : (
                            attachments.map((attachment) => (
                                <ListItem
                                    key={attachment.id}
                                    divider
                                    secondaryAction={
                                        <Box>
                                            <IconButton
                                                edge="end"
                                                aria-label="download"
                                                component="a"
                                                href={`http://localhost:8000/uploads/${encodeURIComponent(attachment.filename)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ mr: 1 }}
                                            >
                                                <DownloadIcon />
                                            </IconButton>
                                            {/* Asumiendo que el usuario que subió el archivo o un admin puede eliminarlo */}
                                            {attachment.uploaded_by_user_id === userId && ( // Asegúrate de que tu API devuelva `uploaded_by_user_id`
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteAttachment(attachment.id, attachment.filename)}
                                                    color="error"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </Box>
                                    }
                                    sx={{ '&:last-child': { borderBottom: 'none' } }}
                                >
                                    <ListItemIcon>
                                        <InsertDriveFileIcon color="action" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {attachment.filename}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption" color="text.secondary">
                                                Subido el {format(new Date(attachment.uploaded_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                                                {attachment.uploaded_by_user_id && userMap[attachment.uploaded_by_user_id] &&
                                                    ` por ${userMap[attachment.uploaded_by_user_id]}` // Muestra quién lo subió
                                                }
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                )}
            </Paper>
        </Box>
    );
};

export default AttachmentsSection;