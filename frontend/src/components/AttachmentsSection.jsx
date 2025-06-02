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
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchAttachmentsByTaskId, uploadAttachmentToTask } from '../services/api';

const AttachmentsSection = ({ taskId }) => {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const loadAttachments = async () => {
            setLoading(true);
            const data = await fetchAttachmentsByTaskId(taskId);
            setAttachments(data);
            setLoading(false);
        };
        loadAttachments();
    }, [taskId]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setUploading(true);
        await uploadAttachmentToTask(taskId, file);
        const data = await fetchAttachmentsByTaskId(taskId);
        setAttachments(data);
        setUploading(false);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Archivos Adjuntos
            </Typography>
            <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                disabled={uploading}
            >
                {uploading ? 'Subiendo...' : 'Subir Archivo'}
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {loading ? (
                <CircularProgress sx={{ mt: 2 }} />
            ) : (
                <List>
                    {Array.isArray(attachments) &&
                        attachments.map((attachment) => (
                            <ListItem key={attachment.id}>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={attachment.filename}
                                    secondary={`Subido el ${new Date(attachment.uploaded_at).toLocaleDateString()}`}
                                />
                                <IconButton
                                    component="a"
                                    href={attachment.filepath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <CloudUploadIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                </List>
            )}
        </Box>
    );
};

export default AttachmentsSection;
