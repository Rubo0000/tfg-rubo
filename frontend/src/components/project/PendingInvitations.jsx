import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Button,
    Stack,
    Alert,
    CircularProgress,
    useTheme // Importar useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    fetchUserInvitations,
    acceptInvitation,
    rejectInvitation,
} from "../../services/api";

const PendingInvitations = ({ userId, onHandled }) => {
    const theme = useTheme(); // Usar el hook useTheme
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadInvitations = async () => {
        setLoading(true);
        try {
            const data = await fetchUserInvitations(userId);
            setInvitations(data);
        } catch (err) { // Capturar el error para mostrarlo
            console.error("Error al cargar invitaciones:", err);
            setError("Error al cargar invitaciones. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvitations();
    }, [userId]); // Añadir userId como dependencia para recargar si cambia

    const handleAction = async (id, action) => {
        try {
            if (action === "accept") await acceptInvitation(id);
            else await rejectInvitation(id);

            setInvitations(prev => prev.filter(i => i.id !== id));
            if (onHandled) onHandled();
        } catch (err) { // Capturar el error para mostrarlo
            console.error("Error al actualizar la invitación:", err);
            setError(`Error al ${action === "accept" ? "aceptar" : "rechazar"} la invitación.`);
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
        </Box>
    );
    if (error) return (
        <Alert severity="error" sx={{ mb: 3, borderRadius: theme.shape.borderRadius * 1.5 }}>
            {error}
        </Alert>
    );
    if (invitations.length === 0) return null;

    return (
        <Paper
            sx={{
                p: 2,
                mb: 3,
                borderRadius: theme.shape.borderRadius * 2, // Redondeo para el Paper de invitaciones
                boxShadow: theme.shadows[4], // Sombra suave
            }}
        >
            <Typography variant="h6" gutterBottom sx={{ borderBottom: `1px solid ${theme.palette.divider}`, pb: 1, mb: 2 }}>
                📩 Invitaciones pendientes
            </Typography>
            <List>
                {invitations.map(inv => (
                    <ListItem
                        key={inv.id}
                        divider
                        sx={{
                            // Añadir algo de redondeo a los ListItem si se desea, aunque con dividers es menos visible
                            // borderRadius: theme.shape.borderRadius,
                            mb: 1,
                            p: 1.5
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Invitación a: <span style={{ color: theme.palette.primary.main }}>"{inv.project_name}"</span>
                                </Typography>
                            }
                            secondary={`Invitado por: ${inv.invited_by_name}`}
                            sx={{ mr: 2 }}
                        />
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="contained"
                                color="success"
                                size="small" // Botones más pequeños
                                onClick={() => handleAction(inv.id, "accept")}
                                sx={{ borderRadius: theme.shape.borderRadius }} // Redondeo
                            >
                                Aceptar
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small" // Botones más pequeños
                                onClick={() => handleAction(inv.id, "reject")}
                                sx={{ borderRadius: theme.shape.borderRadius }} // Redondeo
                            >
                                Rechazar
                            </Button>
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default PendingInvitations;