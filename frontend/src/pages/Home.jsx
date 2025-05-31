import { Box, Container, Stack } from "@mui/material";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
import AuthButtons from "../components/AuthButtons";
import GestionDeTareas from "../assets/GestionDeTareas.png";
import SeguimientoDelProgreso from "../assets/SeguimientoDelProgeso.png";
import SupervisionDocente from "../assets/SupervisionDocente.png";

function Home() {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={6}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: 600,
            }}
          >
            <HeroSection />
          </Box>

          <Box>
            <Stack direction="row" spacing={4} alignItems="flex-start">
              <Feature
                icon="clipboard"
                title="Gestión de tareas"
                description="Crea, asigna y supervisa tareas con claridad y roles definidos"
                imgSrc={GestionDeTareas}
              />
              <Feature
                icon="bar-chart"
                title="Seguimiento del progreso"
                description="Visualiza el avance individual y grupal con estadísticas a tiempo real"
                imgSrc={SeguimientoDelProgreso}
              />
              <Feature
                icon="graduation"
                title="Supervisión docente"
                description="Facilita la evaluación justa con herramientas específicas para profesores"
                imgSrc={SupervisionDocente}
              />
            </Stack>

            <AuthButtons />
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
