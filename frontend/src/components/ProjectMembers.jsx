import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Chip,
    Stack
} from "@mui/material";
import { useState } from "react";

const ProjectMembers = ({ allUsers, projectUsers, onAddUser, onRemoveUser }) => {
    const [selectedUser, setSelectedUser] = useState("");

    const handleAdd = () => {
        if (selectedUser) {
            onAddUser(parseInt(selectedUser));
            setSelectedUser("");
        }
    };

    const availableUsers = allUsers.filter(
        user => !projectUsers.some(u => u.id === user.id)
    );

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                👥 Miembros del proyecto
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <TextField
                    select
                    label="Agregar miembro"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    sx={{ minWidth: 240 }}
                >
                    {availableUsers.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    disabled={!selectedUser}
                >
                    Agregar
                </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap">
                {projectUsers.map(user => (
                    <Chip
                        key={user.id}
                        label={user.name}
                        color="info"
                        onDelete={() => onRemoveUser(user.id)} // ✅ Se pasa al padre
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
