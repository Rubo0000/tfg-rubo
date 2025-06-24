import { Box, Typography, Paper, Avatar, Chip, useTheme } from "@mui/material";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function TeacherFeedback({ comments }) {
    const theme = useTheme();
    const teacherComments = comments?.filter(c => c.author_role === "teacher") || [];

    if (teacherComments.length === 0) {
        return (
            <Box sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.grey[100],
                textAlign: 'center'
            }}>
                <Typography variant="body1" color="text.secondary">
                    Aún no hay feedback del docente
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4 }} component="section" aria-labelledby="teacher-feedback-heading">
            <Typography
                variant="h5"
                component="h2"
                id="teacher-feedback-heading"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.dark
                }}
            >
                Feedback del Docente
            </Typography>

            {teacherComments.map((comment) => (
                <Paper
                    key={comment.id}
                    elevation={2}
                    sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: 3,
                        borderLeft: `4px solid ${theme.palette.teacherPrimary.main}`,
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                            boxShadow: theme.shadows[4]
                        }
                    }}
                    aria-label={`Comentario de ${comment.author_name}`}
                >
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                            <Avatar
                                src={comment.Avatar}
                                alt={comment.author_name}
                                sx={{ width: 40, height: 40 }}
                            />
                            <Box sx={{ ml: 2 }}>
                                <Typography fontWeight="bold" component="span">
                                    {comment.author_name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                >
                                    {format(new Date(comment.created_at), 'PPPpp', { locale: es })}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            label="Docente"
                            size="small"
                            sx={{
                                ml: "auto",
                                bgcolor: theme.palette.teacherPrimary.light,
                            }}
                        />
                    </Box>
                    <Typography
                        component="div"
                        sx={{
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.6,
                            '& p': { marginBottom: 2 }
                        }}
                    >
                        {comment.content}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
}

export default TeacherFeedback;