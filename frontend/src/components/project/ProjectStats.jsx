import {
    Box,
    Typography,
    LinearProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Chip, // Para añadir etiquetas visuales
    Stack, // Para organizar elementos horizontalmente
    useTheme // Para acceder al tema
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Icono para actividad reciente
import TaskAltIcon from '@mui/icons-material/TaskAlt'; // Icono para progreso
import PersonIcon from '@mui/icons-material/Person'; // Icono para contribución

function ProjectStats({ totalTasks = 0, completedTasks = 0, userTasks = 0, recentActivity = [] }) {
    const theme = useTheme();

    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const userContribution = totalTasks > 0 ? Math.round((userTasks / totalTasks) * 100) : 0;

    return (
        <Paper
            elevation={6} // Mayor elevación para destacarlo
            sx={{
                mt: 4,
                p: 4,
                borderRadius: 4, // Bordes más redondeados
                backgroundColor: theme.palette.background.paper, // Color de fondo del tema
                borderLeft: `8px solid ${theme.palette.primary.main}`, // Borde izquierdo distintivo
                boxShadow: theme.shadows[8], // Sombra más pronunciada
            }}
        >
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    📈 Estadísticas del Proyecto
                </Typography>
                <Chip
                    label="Actualizado"
                    size="small"
                    color="primary"
                    sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.contrastText }}
                />
            </Stack>

            {/* Progreso general */}
            <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <TaskAltIcon color="action" />
                    <Typography variant="h6" color="text.primary">Progreso General</Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        my: 1,
                        height: 12, // Un poco más grueso
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.success.main, // Barra de progreso verde
                            transition: 'transform .5s ease-in-out' // Transición suave
                        }
                    }}
                />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    **{progress}%** de las tareas completadas ({completedTasks} de {totalTasks})
                </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            {/* Tu contribución */}
            <Box mb={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonIcon color="action" />
                    <Typography variant="h6" color="text.primary">Tu Contribución</Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    Has contribuido con el **{userContribution}%** de las tareas totales.
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={userContribution}
                    sx={{
                        my: 1,
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[300],
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.info.main, // Barra de contribución azul
                        }
                    }}
                />
            </Box>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            {/* Actividad reciente */}
            <Box>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <AccessTimeIcon color="action" />
                    <Typography variant="h6" color="text.primary">Actividad Reciente</Typography>
                </Stack>
                <List dense sx={{ maxHeight: 150, overflowY: 'auto' }}>
                    {recentActivity.length === 0 ? (
                        <ListItem>
                            <ListItemText primary={
                                <Typography variant="body2" color="text.secondary">
                                    No hay actividad reciente para mostrar.
                                </Typography>
                            } />
                        </ListItem>
                    ) : (
                        recentActivity.map((item, idx) => (
                            <ListItem
                                key={idx}
                                sx={{
                                    backgroundColor: idx % 2 === 0 ? theme.palette.action.hover : 'transparent',
                                    borderRadius: 1,
                                    mb: 0.5,
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.selected,
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="body2">
                                            {item}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        </Paper>
    );
}

export default ProjectStats;