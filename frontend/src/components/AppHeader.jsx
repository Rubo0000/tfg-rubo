import { AppBar, Toolbar, Typography, Button, IconButton, Box, Avatar, Snackbar, Alert } from "@mui/material";
import { Dashboard, Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useState } from "react";
function AppHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [logoutMsgOpen, setLogoutMsgOpen] = useState(false);
    const userName = localStorage.getItem("userName") || "Usuario";

    const handleLogout = async () => {
        await logoutUser();
        setLogoutMsgOpen(true);
        setTimeout(() => navigate("/login"), 1500);
    };


    const isDashboard = location.pathname === "/dashboard";

    return (
        <AppBar position="static" elevation={3} sx={{ backgroundColor: "#ffffff", color: "#333" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>{userName[0]}</Avatar>
                    <Typography variant="h6" component="div" fontWeight="bold">
                        {isDashboard ? "Panel Principal de Proyectos" : "Detalles del Proyecto"}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {!isDashboard && (
                        <Button
                            startIcon={<Dashboard />}
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate("/dashboard")}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Volver al dashboard
                        </Button>
                    )}
                    <Button
                        startIcon={<Logout />}
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                        Cerrar sesión
                    </Button>
                </Box>
            </Toolbar>
            <Snackbar
                open={logoutMsgOpen}
                autoHideDuration={1500}
                onClose={() => setLogoutMsgOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    ¡Sesión cerrada exitosamente!
                </Alert>
            </Snackbar>

        </AppBar>

    );
}

export default AppHeader;
