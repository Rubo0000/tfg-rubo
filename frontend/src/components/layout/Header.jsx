import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LogoTitulo from "../assets/LogoTitulo.png";

function Header() {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box display="flex" alignItems="center" gap={2} width="100%" justifyContent="center">
          <img src={LogoTitulo} alt="Logo" height={40} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Project Manager
          </Typography>
          <img src={LogoTitulo} alt="Logo" height={40} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
