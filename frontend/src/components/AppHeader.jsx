import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Avatar,
    Snackbar,
    Alert,
    Menu,
    MenuItem,
    Divider,
    Chip,
    useTheme,
    alpha,
} from "@mui/material";
import {
    Dashboard,
    Logout,
    ArrowBack,
    Person,
    Settings,
    Notifications,
    KeyboardArrowDown,
    AccountCircle
} from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useState } from "react";
import { motion } from "framer-motion";

function AppHeader({ onOpenProfile }) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const theme = useTheme();

    const [logoutMsgOpen, setLogoutMsgOpen] = useState(false);
    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

    const userName = localStorage.getItem("userName") || "Usuario";
    const userRole = localStorage.getItem("userRole") || "student";

    const handleLogout = async () => {
        await logoutUser();
        setLogoutMsgOpen(true);
        setProfileMenuAnchor(null);
        setTimeout(() => navigate("/login"), 1500);
    };

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchor(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchor(null);
    };

    const handleOpenProfile = () => {
        setProfileMenuAnchor(null);
        onOpenProfile();
    };

    const isDashboard = location.pathname === "/dashboard";
    const isTaskDetail = /^\/tasks\/\d+$/.test(location.pathname);
    const isProjectDashboard = /^\/projects\/\d+$/.test(location.pathname);

    const getTitle = () => {
        if (isDashboard) return "Panel Principal de Proyectos";
        if (isTaskDetail) return "Detalle de Tarea";
        if (isProjectDashboard) return "Panel del Proyecto";
        return "App";
    };

    const getRoleColor = (role) => {
        return role === "teacher" ? "#4caf50" : "#2196f3";
    };

    const getRoleLabel = (role) => {
        return role === "teacher" ? "Docente" : "Estudiante";
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                backdropFilter: "blur(20px)",
                borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            }}
        >
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1,
                minHeight: 72
            }}>
                {/* Left Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: alpha(theme.palette.common.white, 0.2),
                                color: "white",
                                width: 48,
                                height: 48,
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
                                backdropFilter: "blur(10px)"
                            }}
                        >
                            {userName[0]?.toUpperCase()}
                        </Avatar>
                    </motion.div>

                    <Box>
                        <Typography
                            variant="h5"
                            component="div"
                            fontWeight="bold"
                            sx={{
                                color: "white",
                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                mb: 0.5
                            }}
                        >
                            {getTitle()}
                        </Typography>
                        <Chip
                            label={getRoleLabel(userRole)}
                            size="small"
                            sx={{
                                backgroundColor: alpha(getRoleColor(userRole), 0.2),
                                color: "white",
                                fontweight: "bold",
                                fontSize: "0.75rem",
                                border: `1px solid ${alpha(getRoleColor(userRole), 0.5)}`
                            }}
                        />
                    </Box>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Notifications */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <IconButton
                            sx={{
                                color: "white",
                                bgcolor: alpha(theme.palette.common.white, 0.1),
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.common.white, 0.2),
                                }
                            }}
                        >
                            <Notifications />
                        </IconButton>
                    </motion.div>

                    {/* Navigation Buttons */}
                    {isTaskDetail && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Button
                                startIcon={<ArrowBack />}
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    color: "white",
                                    borderColor: alpha(theme.palette.common.white, 0.3),
                                    backdropFilter: "blur(10px)",
                                    bgcolor: alpha(theme.palette.common.white, 0.1),
                                    '&:hover': {
                                        borderColor: "white",
                                        bgcolor: alpha(theme.palette.common.white, 0.2),
                                    }
                                }}
                            >
                                Volver al proyecto
                            </Button>
                        </motion.div>
                    )}

                    {isProjectDashboard && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Button
                                startIcon={<Dashboard />}
                                variant="outlined"
                                onClick={() => navigate("/dashboard")}
                                sx={{
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    color: "white",
                                    borderColor: alpha(theme.palette.common.white, 0.3),
                                    backdropFilter: "blur(10px)",
                                    bgcolor: alpha(theme.palette.common.white, 0.1),
                                    '&:hover': {
                                        borderColor: "white",
                                        bgcolor: alpha(theme.palette.common.white, 0.2),
                                    }
                                }}
                            >
                                Volver al dashboard
                            </Button>
                        </motion.div>
                    )}

                    {/* Profile Menu */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            onClick={handleProfileMenuOpen}
                            sx={{
                                color: "white",
                                textTransform: "none",
                                fontWeight: "bold",
                                bgcolor: alpha(theme.palette.common.white, 0.1),
                                backdropFilter: "blur(10px)",
                                px: 2,
                                py: 1,
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.common.white, 0.2),
                                }
                            }}
                            endIcon={<KeyboardArrowDown />}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <AccountCircle />
                                {userName}
                            </Box>
                        </Button>
                    </motion.div>

                    <Menu
                        anchorEl={profileMenuAnchor}
                        open={Boolean(profileMenuAnchor)}
                        onClose={handleProfileMenuClose}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                minWidth: 200,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.background.paper, 0.95),
                                backdropFilter: "blur(20px)",
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem
                            onClick={handleOpenProfile}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                mx: 1,
                                mb: 0.5,
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                                }
                            }}
                        >
                            <Person sx={{ mr: 2, color: theme.palette.primary.main }} />
                            Mi Perfil
                        </MenuItem>

                        <MenuItem
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                mx: 1,
                                mb: 0.5,
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                                }
                            }}
                        >
                            <Settings sx={{ mr: 2, color: theme.palette.primary.main }} />
                            Configuración
                        </MenuItem>

                        <Divider sx={{ my: 1 }} />

                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                mx: 1,
                                mt: 0.5,
                                color: theme.palette.error.main,
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.error.main, 0.1)
                                }
                            }}
                        >
                            <Logout sx={{ mr: 2 }} />
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>

            <Snackbar
                open={logoutMsgOpen}
                autoHideDuration={1500}
                onClose={() => setLogoutMsgOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity="success"
                    sx={{
                        width: "100%",
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.success.main, 0.9),
                        backdropFilter: "blur(10px)"
                    }}
                >
                    ¡Sesión cerrada exitosamente!
                </Alert>
            </Snackbar>
        </AppBar>
    );
}

export default AppHeader;