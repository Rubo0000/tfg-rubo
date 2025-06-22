import {
    Box,
    Typography,
    TextField,
    Button,
    Chip,
    Stack,
    Alert,
    Avatar,
    Paper,
    IconButton,
    useTheme
} from "@mui/material";
import { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProjectMembers = ({ allUsers, projectUsers, onAddUser, onRemoveUser }) => {
    const [inputName, setInputName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const theme = useTheme();

    const handleAdd = async () => {
        setErrorMessage("");
        const found = allUsers.find(
            (u) => u.name.toLowerCase() === inputName.trim().toLowerCase()
        );

        if (!found) {
            setErrorMessage(`Usuario "${inputName}" no encontrado`);
            return;
        }

        if (projectUsers.some((u) => u.id === found.id)) {
            setErrorMessage(`${found.name} ya es miembro del proyecto`);
            setInputName("");
            return;
        }

        await onAddUser(found.name);
        setInputName("");
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mt: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: 'background.paper'
            }}
        >
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                👥 Gestión de Miembros
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                    Invitar nuevo miembro
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                        label="Nombre de usuario"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="Buscar usuario..."
                        size="small"
                        fullWidth
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: (
                                <PersonAddIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 1
                                    }}
                                />
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdd}
                        disabled={!inputName.trim()}
                        startIcon={<CheckCircleIcon />}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Invitar
                    </Button>
                </Stack>

                {errorMessage && (
                    <Alert
                        severity="error"
                        onClose={() => setErrorMessage("")}
                        sx={{ mt: 2 }}
                        iconMapping={{
                            error: <CancelIcon fontSize="inherit" />
                        }}
                    >
                        {errorMessage}
                    </Alert>
                )}
            </Box>

            <Box>
                <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                    Miembros actuales ({projectUsers.length})
                </Typography>

                {projectUsers.length === 0 ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic' }}
                    >
                        No hay miembros en este proyecto
                    </Typography>
                ) : (
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {projectUsers.map((user) => (
                            <Chip
                                key={user.id}
                                avatar={<Avatar alt={user.name} sx={{ width: 24, height: 24 }}>
                                    {user.name.charAt(0)}
                                </Avatar>}
                                label={user.name}
                                color="default"
                                variant="outlined"
                                onDelete={() => onRemoveUser(user.id)}
                                sx={{
                                    borderRadius: 2,
                                    '& .MuiChip-deleteIcon': {
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'error.main'
                                        }
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                )}
            </Box>
        </Paper>
    );
};

export default ProjectMembers;