// components/CreateProjectModal.jsx
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";

const CreateProjectModal = ({ open, onClose, onCreate }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        const userId = parseInt(localStorage.getItem("userId"));
        if (!name || isNaN(userId)) return;

        onCreate({ name, description, created_by: userId });
        setName("");
        setDescription("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Crear nuevo proyecto</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre del proyecto"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectModal;
