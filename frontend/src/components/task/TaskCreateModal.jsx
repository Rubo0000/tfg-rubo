import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    useTheme // Importar useTheme para acceder a las propiedades del tema, incluido el borderRadius
} from "@mui/material";
import { useState, useEffect } from "react";
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const priorities = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baja", label: "Baja" }
];
const statuses = [
    { value: "pendiente", label: "Pendiente" },
    { value: "en progreso", label: "En Progreso" },
    { value: "finalizada", label: "Finalizada" }
];

const CreateTaskModal = ({ open, onClose, onCreate, projectId, users, initialData }) => {
    const theme = useTheme(); // Usar el hook useTheme
    const [form, setForm] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        status: "",
        assigned_to: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setForm({
                ...initialData,
                due_date: initialData.due_date ? new Date(initialData.due_date).toISOString().split('T')[0] : "",
                assigned_to: initialData.assigned_to || "",
            });
        } else {
            setForm({
                title: "",
                description: "",
                due_date: "",
                priority: "",
                status: "",
                assigned_to: "",
            });
        }
        setErrors({});
    }, [initialData, open]);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        if (!form.title.trim()) {
            newErrors.title = "El título es obligatorio.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const payload = {
            ...form,
            project_id: projectId,
            assigned_to: form.assigned_to ? parseInt(form.assigned_to) : null,
        };
        onCreate(payload);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            scroll="paper"
            PaperProps={{
                sx: {
                    borderRadius: theme.shape.borderRadius * 3, // Aumentar el redondeo del modal
                    boxShadow: theme.shadows[10], // Sombra más prominente
                }
            }}
        >
            <DialogTitle sx={{ pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}> {/* Añadir un borde inferior */}
                {/* Solución al error de anidamiento h2 dentro de h2:
                    La DialogTitle por defecto renderiza un h2. Si necesitas un estilo visual de h5,
                    puedes usar la propiedad `component` para que Typography renderice otra etiqueta HTML.
                */}
                <Typography variant="h5" component="span" fontWeight="bold">
                    {initialData ? "✏️ Editar Tarea" : "✨ Nueva Tarea"}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 1,
                    // Añadir un borde redondeado a los TextField/Selects
                    '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius * 1.5, // Bordes más redondeados para los inputs
                    },
                    '& .MuiFilledInput-root': {
                        borderRadius: theme.shape.borderRadius * 1.5,
                    },
                    '& .MuiInputBase-root': {
                        borderRadius: theme.shape.borderRadius * 1.5,
                    }
                }}>
                    <TextField
                        label="Título de la Tarea"
                        value={form.title}
                        onChange={handleChange("title")}
                        fullWidth
                        required
                        error={!!errors.title}
                        helperText={errors.title}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Descripción"
                        value={form.description}
                        onChange={handleChange("description")}
                        fullWidth
                        multiline
                        rows={4}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Fecha límite"
                        type="date"
                        value={form.due_date}
                        onChange={handleChange("due_date")}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        select
                        label="Prioridad"
                        value={form.priority}
                        onChange={handleChange("priority")}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PriorityHighIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {priorities.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Estado"
                        value={form.status}
                        onChange={handleChange("status")}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CheckCircleOutlineIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    >
                        {statuses.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Asignado a"
                        value={form.assigned_to}
                        onChange={handleChange("assigned_to")}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">Nadie</MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}> {/* Añadir un borde superior */}
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="outlined"
                    sx={{ px: 3, py: 1, borderRadius: theme.shape.borderRadius * 1.5 }} // Bordes más redondeados
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ px: 3, py: 1, borderRadius: theme.shape.borderRadius * 1.5 }} // Bordes más redondeados
                    disabled={!form.title.trim()}
                >
                    {initialData ? "Guardar Cambios" : "Crear Tarea"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskModal;