// components/TaskFilters.jsx
import { Box, Chip, Stack, Typography, Button } from "@mui/material";
import { use, useState } from "react";

const statuses = [
    { label: "pendiente", color: "default" },
    { label: "en progreso", color: "info" },
    { label: "finalizada", color: "success" },
];

const priorities = [
    { label: "alta", color: "error" },
    { label: "media", color: "warning" },
    { label: "baja", color: "default" },
];

const TaskFilters = ({
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    onlyMine,
    setOnlyMine,
    filteredCount,
    userId
}) => {
    const toggleOnlyMine = () => setOnlyMine(!onlyMine);

    const resetFilters = () => {
        setStatusFilter(null);
        setPriorityFilter(null);
        setOnlyMine(false);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Tareas encontradas: {filteredCount}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
                Filtrar por estado:
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {statuses.map(({ label, color }) => (
                    <Chip
                        key={label}
                        label={label}
                        clickable
                        color={statusFilter === label ? color : "default"}
                        variant={statusFilter === label ? "filled" : "outlined"}
                        onClick={() => setStatusFilter(statusFilter === label ? null : label)}
                    />
                ))}
            </Stack>

            <Typography variant="subtitle2" gutterBottom>
                Filtrar por prioridad:
            </Typography>
            <Stack direction="row" spacing={1} mb={2}>
                {priorities.map(({ label, color }) => (
                    <Chip
                        key={label}
                        label={label}
                        clickable
                        color={priorityFilter === label ? color : "default"}
                        variant={priorityFilter === label ? "filled" : "outlined"}
                        onClick={() => setPriorityFilter(priorityFilter === label ? null : label)}
                    />
                ))}
            </Stack>

            <Stack direction="row" spacing={2}>
                <Button
                    variant={onlyMine ? "contained" : "outlined"}
                    color="info"
                    onClick={toggleOnlyMine}
                >
                    Solo mis tareas
                </Button>
                <Button variant="outlined" color="warning" onClick={resetFilters}>
                    Limpiar filtros
                </Button>
            </Stack>
        </Box>
    );
};

export default TaskFilters;
