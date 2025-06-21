// src/components/FeatureCard.jsx
import React from 'react';
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import {
  Clipboard as ClipboardIcon,
  BarChart as BarChartIcon,
  GraduationCap as GraduationCapIcon,
} from 'lucide-react';

const IconComponent = ({ name, color }) => {
  switch (name) {
    case 'clipboard': return <ClipboardIcon size={48} color={color} />;
    case 'bar-chart': return <BarChartIcon size={48} color={color} />;
    case 'graduation': return <GraduationCapIcon size={48} color={color} />;
    default: return null;
  }
};

function FeatureCard({ icon, title, description, imgSrc }) {
  const theme = useTheme();

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)',
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      sx={{
        width: '100%',
        maxWidth: 320,
        p: 3,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: 'pointer',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{
        mb: 2,
        p: 1.5,
        bgcolor: theme.palette.primary.light + '20',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {imgSrc ? (
          <img src={imgSrc} alt={title} style={{ width: 64, height: 64, objectFit: 'contain' }} />
        ) : (
          <IconComponent name={icon} color={theme.palette.primary.main} />
        )}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Paper>
  );
}

export default FeatureCard;