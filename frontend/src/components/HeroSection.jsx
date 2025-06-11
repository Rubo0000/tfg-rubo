// src/components/HeroSection.jsx
import React from 'react';
import { Box, Stack, Button, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import { ASSETS } from "../utils/constants";

function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        py: { xs: 4, md: 8 },
        gap: { xs: 4, md: 8 },
        textAlign: { xs: 'center', md: 'left' },
        px: { xs: 2, md: 0 }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          flex: 1,
          maxWidth: { md: '50%' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              lineHeight: 1.1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Organiza, Colabora, Triunfa.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400 }}>
            La plataforma definitiva para equipos educativos y proyectos universitarios.
            Gestiona tareas, sigue el progreso y facilita la supervisión docente con Project Manager.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowRight />}
            sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 10 }}
          >
            Empieza Gratis
          </Button>
        </motion.div>
      </Stack>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: 'relative',
          width: "100%",
          maxWidth: { xs: 450, md: 600 },
          minHeight: { xs: 250, sm: 350, md: 450 },
        }}
      >
        <motion.img
          src={ASSETS.Landpage}
          alt="Maqueta de la aplicación en dispositivos"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: theme.shape.borderRadius * 2,
            boxShadow: `0px 20px 40px rgba(0, 0, 0, 0.15), 0px 5px 15px rgba(0, 0, 0, 0.1)`,
            objectFit: 'contain',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </Box>
    </Box>
  );
}

export default HeroSection;