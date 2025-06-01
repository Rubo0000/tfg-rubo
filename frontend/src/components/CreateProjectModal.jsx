import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { createProject } from "../services/projectService";

function CreateProjectModal({ open, handleClose, userId, onProjectCreated }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        start_date: "",
        due_date: "",
    });

    const handleChange = (field) => (e) =>
        setForm({ ...form, [field]: e.target.value });

    const handleSubmit = async () => {
        const response = await createProject({
            ...form,
            created_by: userId,
        });

        if (response?.success) {
            onProjectCreated();
            handleClose();
            setForm({ name: "", description: "", start_date: "", due_date: "" });
        } else {
            alert("Error creando proyecto.");
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Crear nuevo proyecto</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre del proyecto"
                            fullWidth
                            value={form.name}
                            onChange={handleChange("name")}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descripción"
                            fullWidth
                            multiline
                            rows={3}
                            value={form.description}
                            onChange={handleChange("description")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Fecha de inicio"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.start_date}
                            onChange={handleChange("start_date")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Fecha de entrega estimada"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.due_date}
                            onChange={handleChange("due_date")}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateProjectModal;
