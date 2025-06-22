import { Box, Typography, Paper, Divider } from "@mui/material";

const TaskInfo = ({ description }) => {
    return (
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                Descripción de la Tarea
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.7 }}>
                {description || "No hay descripción disponible para esta tarea."}
            </Typography>
            {/* Podrías añadir más información aquí si la tarea tiene campos adicionales */}
            {/* <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" color="text.secondary">
                Creado por: Juan Pérez
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
                Última actualización: 10/06/2025
            </Typography> */}
        </Paper>
    );
};

export default TaskInfo;