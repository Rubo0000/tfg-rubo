import { Box, Typography } from "@mui/material";

function ProjectDetailsHeader({ name, description }) {
    return (
        <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                {name}
            </Typography>
            {description && (
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            )}
        </Box>
    );
}

export default ProjectDetailsHeader;
