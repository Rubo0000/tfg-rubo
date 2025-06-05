import { Box, Container, Typography, Link, Grid } from "@mui/material";
import LogoUPV from "../assets/LogoUPV.png";
import LogoETSINF from "../assets/LogoETSINF.png";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: "#699EEE",
        position: "relative",
        minHeight: 140,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Box display="flex" gap={3}>
                <Link href="#" underline="hover" color="inherit">
                  Cómo funciona
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Sobre la app
                </Link>
                <Link href="#" underline="hover" color="inherit">
                  Contacto
                </Link>
              </Box>
              <Typography variant="body2" align="center" color="white">
                Edificios 1G - 1E - 1H, ETS de Ingeniería Informática, Camí de Vera, s/n, Algirós,<br />
                46022 Valencia<br />
                © 2025 UPV.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            left: 30,
            bottom: 25,
          }}
        >
          <img src={LogoUPV} alt="UPV Logo" height={110} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: 30,
            bottom:25,
          }}
        >
          <img src={LogoETSINF} alt="ETSINF Logo" height={100} />
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
