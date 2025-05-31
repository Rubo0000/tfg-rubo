import { Paper, Typography, Box } from "@mui/material";

function Feature({ icon, title, description, imgSrc }) {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 220 }}>
      <img
        src={imgSrc}
        alt={icon}
        style={{ width: 64, height: 64, marginBottom: 12 }}
      />
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}

export default Feature;
