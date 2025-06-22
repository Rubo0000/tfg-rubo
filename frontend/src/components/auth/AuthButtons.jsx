// components/AuthButtons/AuthButtons.jsx

import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

function AuthButtons() {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 4,
        mt: 4,
      }}
    >
      <MotionBox
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        sx={{ borderRadius: 2 }}
      >
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            background: "linear-gradient(to right, #f6d365, #fda085)",
            color: "black",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          INICIO SESIÓN
        </Button>
      </MotionBox>

      <MotionBox
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        sx={{ borderRadius: 2, mr: 27.5 }}
      >
        <Button
          component={Link}
          to="/registro"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            background: "linear-gradient(to right, #74ebd5, #9face6)",
            color: "black",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          REGISTRO
        </Button>
      </MotionBox>
    </MotionBox>
  );
}

export default AuthButtons;
