import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Avatar,
    Chip,
    useTheme,
    Button,
    Stack,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Warning, Error } from "@mui/icons-material";

function StudentManagement({ students, stats }) {
    const theme = useTheme();
    const navigate = useNavigate();

    const getProgressColor = (progress) => {
        if (progress >= 80) return 'success';
        if (progress >= 50) return 'primary';
        return 'warning';
    };

    const getProgressIcon = (progress) => {
        if (progress >= 80) return <CheckCircle fontSize="small" />;
        if (progress >= 50) return <Warning fontSize="small" color="warning" />;
        return <Error fontSize="small" color="error" />;
    };

    return (
        <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Lista de todos los estudiantes y su progreso
            </Typography>

            <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{
                            bgcolor: theme.palette.primary.main,
                            '& .MuiTableCell-root': {
                                color: theme.palette.primary.contrastText,
                                fontWeight: 'bold'
                            }
                        }}>
                            <TableRow>
                                <TableCell>Estudiante</TableCell>
                                <TableCell align="center">Proyectos</TableCell>
                                <TableCell align="center">Tareas</TableCell>
                                <TableCell align="center">Progreso</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => {
                                const progress = stats?.student_progress[student.id]?.progress || 0;
                                return (
                                    <TableRow
                                        key={student.id}
                                        hover
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: theme.palette.action.hover
                                            }
                                        }}
                                    >
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Avatar
                                                    src={student.avatar}
                                                    alt={student.name}
                                                    sx={{ width: 40, height: 40 }}
                                                />
                                                <Box>
                                                    <Typography fontWeight="bold">{student.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {student.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                                label={stats?.student_progress[student.id]?.projects || 0}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderRadius: 1,
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                <Chip
                                                    label={`${stats?.student_progress[student.id]?.completed_tasks || 0}✓`}
                                                    color="success"
                                                    size="small"
                                                    sx={{ borderRadius: 1 }}
                                                />
                                                <Chip
                                                    label={`${stats?.student_progress[student.id]?.pending_tasks || 0}⌛`}
                                                    color="warning"
                                                    size="small"
                                                    sx={{ borderRadius: 1 }}
                                                />
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                                <Box sx={{ width: '100%' }}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={progress}
                                                        color={getProgressColor(progress)}
                                                        sx={{
                                                            height: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: theme.palette.grey[300]
                                                        }}
                                                    />
                                                </Box>
                                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                                    {getProgressIcon(progress)}
                                                    <Typography variant="body2" fontWeight="bold">
                                                        {progress}%
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => navigate(`/teacher/students/${student.id}`)}
                                                sx={{
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        boxShadow: theme.shadows[2]
                                                    }
                                                }}
                                            >
                                                Ver detalles
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default StudentManagement;