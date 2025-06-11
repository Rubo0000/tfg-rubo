import { Box, Typography } from "@mui/material";

function ProjectDetailsHeader({ name, description }) {
    return (
        <Box
            sx={{
                mb: 6, // Mayor margen inferior
                textAlign: "center",
                p: 3, // Añadir padding
                backgroundColor: 'rgba(25, 118, 210, 0.05)', // Un fondo suave de color primario
                borderRadius: 2, // Bordes ligeramente redondeados
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)' // Sombra sutil
            }}
        >
            <Typography
                variant="h3" // Tamaño de fuente más grande para el título
                fontWeight="bold"
                gutterBottom
                color="primary.dark" // Color del tema
                sx={{ letterSpacing: 1 }} // Espaciado de letras
            >
                {name}
            </Typography>
            {description && (
                <Typography
                    variant="h6" // Un poco más grande para la descripción
                    color="text.secondary"
                    sx={{ maxWidth: '70%', mx: 'auto', lineHeight: 1.6 }} // Ancho limitado y altura de línea
                >
                    {description}
                </Typography>
            )}
        </Box>
    );
}

export default ProjectDetailsHeader;