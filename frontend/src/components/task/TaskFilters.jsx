import {
    Box,
    Chip,
    Stack,
    Typography,
    Button,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    useTheme,
    Paper
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";

const statuses = [
    { label: "Pendiente", value: "pendiente", icon: "⏳" },
    { label: "En Progreso", value: "en progreso", icon: "🚧" },
    { label: "Finalizada", value: "finalizada", icon: "✅" },
];

const priorities = [
    { label: "Alta", value: "alta", icon: "🔥" },
    { label: "Media", value: "media", icon: "⚠️" },
    { label: "Baja", value: "baja", icon: "💤" },
];

const TaskFilters = ({
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    onlyMine,
    setOnlyMine,
    userId
}) => {
    const theme = useTheme();

    const toggleOnlyMine = () => setOnlyMine(!onlyMine);
    const resetFilters = () => {
        setStatusFilter(null);
        setPriorityFilter(null);
        setOnlyMine(false);
    };

    const hasFilters = statusFilter || priorityFilter || onlyMine;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: 'background.paper'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                    <FilterAltIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Filtros de Tareas
                </Typography>

                {hasFilters && (
                    <Button
                        startIcon={<FilterAltOffIcon />}
                        onClick={resetFilters}
                        size="small"
                        color="inherit"
                        sx={{ color: 'text.secondary' }}
                    >
                        Limpiar filtros
                    </Button>
                )}
            </Box>

            <Box mb={3}>
                <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                    Estado
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {statuses.map(({ label, value, icon }) => {
                        const isSelected = Array.isArray(statusFilter) && statusFilter.includes(value);
                        return (
                            <Chip
                                key={value}
                                label={<>{icon} {label}</>}
                                clickable
                                color={isSelected ? "primary" : "default"}
                                variant={isSelected ? "filled" : "outlined"}
                                onClick={() => {
                                    if (isSelected) {
                                        setStatusFilter(statusFilter.filter(s => s !== value));
                                    } else {
                                        setStatusFilter([...statusFilter, value]);
                                    }
                                }}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    '& .MuiChip-label': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }
                                }}
                            />
                        );
                    })}

                </Stack>
            </Box>

            <Box mb={3}>
                <Typography variant="subtitle2" fontWeight={500} gutterBottom>
                    Prioridad
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {priorities.map(({ label, value, icon }) => {
                        const isSelected = priorityFilter.includes(value);
                        return (
                            <Chip
                                key={value}
                                label={<>{icon} {label}</>}
                                clickable
                                color={isSelected ? "primary" : "default"}
                                variant={isSelected ? "filled" : "outlined"}
                                onClick={() => {
                                    if (isSelected) {
                                        setPriorityFilter(priorityFilter.filter(p => p !== value));
                                    } else {
                                        setPriorityFilter([...priorityFilter, value]);
                                    }
                                }}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    '& .MuiChip-label': {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }
                                }}
                            />
                        );
                    })}

                </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle2" fontWeight={500}>
                    Mostrar solo mis tareas
                </Typography>
                <ToggleButtonGroup
                    value={onlyMine}
                    exclusive
                    onChange={toggleOnlyMine}
                    size="small"
                >
                    <ToggleButton value={true} selected={onlyMine}>
                        <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                        Sí
                    </ToggleButton>
                    <ToggleButton value={false} selected={!onlyMine}>
                        No
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Paper>
    );
};

export default TaskFilters;