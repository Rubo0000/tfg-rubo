import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    Typography,
    IconButton,
    Grid,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    Snackbar,
    useTheme,
    alpha,
    InputAdornment,
} from "@mui/material";
import {
    Close,
    Edit,
    Save,
    Cancel,
    Person,
    Email,
    School,
    CameraAlt,
    Badge,
    CalendarToday,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function UserProfile({ open, onClose }) {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Datos del usuario (inicializar con localStorage o datos por defecto)
    const [userData, setUserData] = useState({
        name: localStorage.getItem("userName") || "Usuario",
        email: localStorage.getItem("userEmail") || "usuario@example.com",
        role: localStorage.getItem("userRole") || "student",
        bio: localStorage.getItem("userBio") || "",
        phone: localStorage.getItem("userPhone") || "",
        institution: localStorage.getItem("userInstitution") || "",
        joinDate: localStorage.getItem("userJoinDate") || new Date().toLocaleDateString(),
    });

    const [editedData, setEditedData] = useState(userData);

    useEffect(() => {
        if (open) {
            setEditedData(userData);
            setIsEditing(false);
        }
    }, [open, userData]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditedData(userData);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            // Aquí harías la llamada a la API para actualizar los datos
            // Por ahora solo actualizo localStorage
            Object.keys(editedData).forEach(key => {
                localStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, editedData[key]);
            });

            setUserData(editedData);
            setIsEditing(false);
            setSnackbarMessage("Perfil actualizado exitosamente");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage("Error al actualizar el perfil");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getRoleColor = (role) => {
        return role === "teacher" ? "#4caf50" : "#2196f3";
    };

    const getRoleLabel = (role) => {
        return role === "teacher" ? "Docente" : "Estudiante";
    };

    const handleAvatarClick = () => {
        // Aquí podrías implementar la funcionalidad para cambiar la foto de perfil
        setSnackbarMessage("Funcionalidad de cambio de avatar próximamente");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        bgcolor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        py: 3,
                        position: "relative",
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h5" fontWeight="bold">
                            Mi Perfil
                        </Typography>
                        <IconButton
                            onClick={onClose}
                            sx={{
                                color: "white",
                                bgcolor: alpha(theme.palette.common.white, 0.1),
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.common.white, 0.2),
                                }
                            }}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ p: 4 }}>
                    {/* Header del perfil */}
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Box sx={{ position: "relative", display: "inline-block" }}>
                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        fontSize: "3rem",
                                        fontWeight: "bold",
                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                        border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease",
                                        '&:hover': {
                                            transform: "scale(1.05)",
                                        }
                                    }}
                                    onClick={handleAvatarClick}
                                >
                                    {userData.name[0]?.toUpperCase()}
                                </Avatar>
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: theme.palette.primary.main,
                                        color: "white",
                                        width: 36,
                                        height: 36,
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.dark,
                                        }
                                    }}
                                    onClick={handleAvatarClick}
                                >
                                    <CameraAlt fontSize="small" />
                                </IconButton>
                            </Box>
                        </motion.div>

                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                            {userData.name}
                        </Typography>

                        <Chip
                            icon={<Badge />}
                            label={getRoleLabel(userData.role)}
                            sx={{
                                bgcolor: alpha(getRoleColor(userData.role), 0.1),
                                color: getRoleColor(userData.role),
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                px: 2,
                                py: 1,
                                border: `1px solid ${alpha(getRoleColor(userData.role), 0.3)}`
                            }}
                        />

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
                            Miembro desde {userData.joinDate}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    {/* Formulario de datos */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombre completo"
                                value={isEditing ? editedData.name : userData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color={isEditing ? "primary" : "disabled"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={isEditing ? editedData.email : userData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                disabled={!isEditing}
                                type="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color={isEditing ? "primary" : "disabled"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth disabled={!isEditing}>
                                <InputLabel>Rol</InputLabel>
                                <Select
                                    value={isEditing ? editedData.role : userData.role}
                                    label="Rol"
                                    onChange={(e) => handleInputChange("role", e.target.value)}
                                    sx={{
                                        borderRadius: 3,
                                    }}
                                >
                                    <MenuItem value="student">Estudiante</MenuItem>
                                    <MenuItem value="teacher">Docente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                value={isEditing ? editedData.phone : userData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                disabled={!isEditing}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Institución"
                                value={isEditing ? editedData.institution : userData.institution}
                                onChange={(e) => handleInputChange("institution", e.target.value)}
                                disabled={!isEditing}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <School color={isEditing ? "primary" : "disabled"} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Biografía"
                                value={isEditing ? editedData.bio : userData.bio}
                                onChange={(e) => handleInputChange("bio", e.target.value)}
                                disabled={!isEditing}
                                multiline
                                rows={3}
                                placeholder="Cuéntanos un poco sobre ti..."
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3, gap: 2 }}>
                    {!isEditing ? (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={handleEdit}
                                variant="contained"
                                startIcon={<Edit />}
                                sx={{
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    color: "white",
                                    fontWeight: "bold",
                                    px: 3,
                                    py: 1,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    '&:hover': {
                                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                    }
                                }}
                            >
                                Editar Perfil
                            </Button>
                        </motion.div>
                    ) : (
                        <>
                            <Button
                                onClick={handleCancel}
                                variant="outlined"
                                startIcon={<Cancel />}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Cancelar
                            </Button>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    startIcon={<Save />}
                                    sx={{
                                        background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
                                        color: "white",
                                        fontWeight: "bold",
                                        px: 3,
                                        py: 1,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        '&:hover': {
                                            background: "linear-gradient(135deg, #45a049 0%, #4caf50 100%)",
                                        }
                                    }}
                                >
                                    Guardar Cambios
                                </Button>
                            </motion.div>
                        </>
                    )}
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={snackbarSeverity}
                    sx={{
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                    }}
                    onClose={() => setSnackbarOpen(false)}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default UserProfile;