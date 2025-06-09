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
} from "@mui/material";
import { useEffect, useState } from "react";
import {
    fetchUserInvitations,
    acceptInvitation,
    rejectInvitation,
} from "../services/api";

const PendingInvitations = ({ userId, onHandled }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadInvitations = async () => {
        setLoading(true);
        try {
            const data = await fetchUserInvitations(userId);
            setInvitations(data);
        } catch {
            setError("Error al cargar invitaciones.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInvitations();
    }, []);

    const handleAction = async (id, action) => {
        try {
            if (action === "accept") await acceptInvitation(id);
            else await rejectInvitation(id);

            setInvitations(prev => prev.filter(i => i.id !== id));
            if (onHandled) onHandled();
        } catch {
            setError("Error al actualizar la invitación.");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (invitations.length === 0) return null;

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                📩 Invitaciones pendientes
            </Typography>
            <List>
                {invitations.map(inv => (
                    <ListItem key={inv.id} divider>
                        <ListItemText
                            primary={`Invitación a "${inv.project_name}"`}
                            secondary={`Invitado por: ${inv.invited_by_name}`}
                        />
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleAction(inv.id, "accept")}
                            >
                                Aceptar
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleAction(inv.id, "reject")}
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
