// components/TaskModal.jsx
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
import { useEffect, useState } from "react";

const priorities = ["alta", "media", "baja"];
const statuses = ["pendiente", "en progreso", "finalizada"];

const TaskModal = ({ open, onClose, onSubmit, projectId, initialData = null }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "media",
        status: "pendiente",
        assigned_to: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                description: initialData.description || "",
                due_date: initialData.due_date || "",
                priority: initialData.priority || "media",
                status: initialData.status || "pendiente",
                assigned_to: initialData.assigned_to || "",
            });
        }
    }, [initialData]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...form,
            project_id: projectId,
            assigned_to: form.assigned_to ? parseInt(form.assigned_to) : null,
            due_date: form.due_date === "" ? null : form.due_date, // <- FIX
        };

        onSubmit(payload);

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
            <DialogTitle>{initialData ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
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
                    {initialData ? "Guardar cambios" : "Crear"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
