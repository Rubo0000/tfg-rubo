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
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function StudentManagement({ students, stats }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Lista de todos los estudiantes y su progreso
            </Typography>

            <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
                            <TableRow>
                                <TableCell>Estudiante</TableCell>
                                <TableCell align="center">Proyectos</TableCell>
                                <TableCell align="center">Tareas</TableCell>
                                <TableCell align="center">Progreso</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id} hover>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <Avatar src={student.avatar} alt={student.name} />
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
                                            label={
                                                stats?.student_progress[student.id]?.projects || 0
                                            }
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip
                                            label={
                                                stats?.student_progress[student.id]?.tasks || 0
                                            }
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={
                                                    stats?.student_progress[student.id]?.progress || 0
                                                }
                                                sx={{ height: 8, flexGrow: 1, borderRadius: 4 }}
                                            />
                                            <Typography variant="body2">
                                                {stats?.student_progress[student.id]?.progress || 0}%
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => navigate(`/user/${student.id}`)}
                                        >
                                            Detalles
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default StudentManagement;