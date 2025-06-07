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
} from "@mui/material";
import { Dashboard, Logout, ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../services/api";
import { useState } from "react";

function AppHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [logoutMsgOpen, setLogoutMsgOpen] = useState(false);
    const userName = localStorage.getItem("userName") || "Usuario";

    const handleLogout = async () => {
        await logoutUser();
        setLogoutMsgOpen(true);
        setTimeout(() => navigate("/login"), 1500);
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

    return (
        <AppBar
            position="static"
            elevation={3}
            sx={{ backgroundColor: "#ffffff", color: "#333" }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>{userName[0]}</Avatar>
                    <Typography variant="h6" component="div" fontWeight="bold">
                        {getTitle()}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {isTaskDetail && (
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate(-1)}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Volver al proyecto
                        </Button>
                    )}
                    {isProjectDashboard && (
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
