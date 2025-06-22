import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography, // Importar Typography
    useTheme // Importar useTheme
} from "@mui/material";
import { useState } from "react";

const CreateProjectModal = ({ open, onClose, onCreate }) => {
    const theme = useTheme(); // Usar el hook useTheme
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    // Estado para la validación del nombre
    const [nameError, setNameError] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) {
            setNameError("El nombre del proyecto es obligatorio.");
            return;
        }
        setNameError(""); // Limpiar error si está presente

        const userId = parseInt(localStorage.getItem("userId"));
        if (isNaN(userId)) {
            console.error("User ID not found in localStorage.");
            return;
        }

        onCreate({ name, description, created_by: userId });
        setName("");
        setDescription("");
        onClose();
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (nameError && e.target.value.trim()) {
            setNameError(""); // Limpiar error al empezar a escribir
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: theme.shape.borderRadius * 3, // Redondeo del modal
                    boxShadow: theme.shadows[10], // Sombra
                }
            }}
        >
            <DialogTitle sx={{ pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
                {/* Solución al error de anidamiento similar a CreateTaskModal */}
                <Typography variant="h5" component="span" fontWeight="bold">
                    ✨ Crear nuevo proyecto
                </Typography>
            </DialogTitle>
            <DialogContent sx={{
                // Redondeo para los TextField/Selects dentro del modal
                '& .MuiOutlinedInput-root': {
                    borderRadius: theme.shape.borderRadius * 1.5,
                },
                '& .MuiFilledInput-root': {
                    borderRadius: theme.shape.borderRadius * 1.5,
                },
                '& .MuiInputBase-root': {
                    borderRadius: theme.shape.borderRadius * 1.5,
                }
            }}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nombre del proyecto"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    required // Marca el campo como obligatorio
                    error={!!nameError} // Muestra el estado de error
                    helperText={nameError} // Texto de ayuda para el error
                    sx={{ mb: 2 }} // Margen inferior para separar de la descripción
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
            <DialogActions sx={{ p: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button
                    onClick={onClose}
                    color="secondary"
                    variant="outlined"
                    sx={{ px: 3, py: 1, borderRadius: theme.shape.borderRadius * 1.5 }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!name.trim()} // Deshabilitar si el nombre está vacío
                    sx={{ px: 3, py: 1, borderRadius: theme.shape.borderRadius * 1.5 }}
                >
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateProjectModal;