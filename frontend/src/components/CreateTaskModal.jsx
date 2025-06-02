// components/CreateTaskModal.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box
} from "@mui/material";
import { useState } from "react";

const priorities = ["alta", "media", "baja"];
const statuses = ["pendiente", "en progreso", "finalizada"];

const CreateTaskModal = ({ open, onClose, onCreate, projectId }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "media",
        status: "pendiente",
        assigned_to: "",
    });

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        const userId = form.assigned_to ? parseInt(form.assigned_to) : null;
        onCreate({
            ...form,
            project_id: projectId,
            assigned_to: userId,
        });
        setForm({
            title: "",
            description: "",
            due_date: "",
            priority: "media",
            status: "pendiente",
            assigned_to: "",
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Nueva Tarea</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField label="Título" value={form.title} onChange={handleChange("title")} fullWidth />
                    <TextField
                        label="Descripción"
                        value={form.description}
                        onChange={handleChange("description")}
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Fecha límite"
                        type="date"
                        value={form.due_date}
                        onChange={handleChange("due_date")}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        label="Prioridad"
                        value={form.priority}
                        onChange={handleChange("priority")}
                    >
                        {priorities.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Estado"
                        value={form.status}
                        onChange={handleChange("status")}
                    >
                        {statuses.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="ID de usuario asignado"
                        value={form.assigned_to}
                        onChange={handleChange("assigned_to")}
                        placeholder="(Opcional)"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskModal;
