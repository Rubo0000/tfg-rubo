import {
    Box,
    Typography,
    TextField,
    Button,
    Chip,
    Stack,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { fetchUsers } from "../services/api"; // Para buscar si existe

const ProjectMembers = ({ allUsers, projectUsers, onAddUser, onRemoveUser }) => {
    const [inputName, setInputName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAdd = async () => {
        setErrorMessage("");
        const found = allUsers.find(
            (u) => u.name.toLowerCase() === inputName.trim().toLowerCase()
        );
        if (!found) {
            setErrorMessage(
                `No existe ningún usuario llamado "${inputName}".`
            );
            return;
        }
        if (projectUsers.some((u) => u.id === found.id)) {
            setErrorMessage(`${found.name} ya está en el proyecto.`);
            setInputName("");
            return;
        }
        await onAddUser(found.name);
        setInputName("");
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                👥 Miembros del proyecto
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <TextField
                    label="Invitar por nombre"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Escribe el nombre del usuario..."
                    sx={{ minWidth: 240 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    disabled={!inputName.trim()}
                >
                    Agregar
                </Button>
            </Stack>

            {errorMessage && (
                <Alert
                    severity="error"
                    onClose={() => setErrorMessage("")}
                    sx={{ mb: 2 }}
                >
                    {errorMessage}
                </Alert>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap">
                {projectUsers.map((user) => (
                    <Chip
                        key={user.id}
                        label={user.name}
                        color="info"
                        onDelete={() => onRemoveUser(user.id)}
                        sx={{ mb: 1 }}
                    />
                ))}
                {projectUsers.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                        No hay miembros en este proyecto.
                    </Typography>
                )}
            </Stack>
        </Box>
    );
};

export default ProjectMembers;
