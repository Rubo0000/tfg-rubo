import { Box } from "@mui/material";
import Landpage from "../assets/LandPage.png";

function HeroSection() {
  return (
    <Box
      component="img"
      src={Landpage}
      alt="Landpage"
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
