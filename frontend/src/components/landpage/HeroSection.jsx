import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Landpage from "../assets/LandPage.png";

function HeroSection() {
  return (
    <Box
      component={motion.img}
      src={Landpage}
      alt="Landpage"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      sx={{
        borderRadius: 50,
        boxShadow: 20,
        width: "100%",
        maxWidth: { xs: 350, md: 500 },
        height: "auto",
      }}
    />
  );
}

export default HeroSection;
