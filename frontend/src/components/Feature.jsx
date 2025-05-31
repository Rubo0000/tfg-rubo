import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

function Feature({ icon, title, description, imgSrc }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, ease: "easeOut" }} // Transición de entrada
      whileHover={{
        scale: 1.15,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.5, ease: "easeOut" }, // Transición hover
      }}
      sx={{
        width: 220,
        height: 300,
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <img src={imgSrc} alt={icon} style={{ width: 64, height: 64 }} />
      </Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflowWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default Feature;
