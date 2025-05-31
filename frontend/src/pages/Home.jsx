import { Box, Container, Stack, Button } from "@mui/material";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Feature from "../components/Feature";
import Footer from "../components/Footer";
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
          {/* Hero image más grande */}
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

          {/* Features + Botones a la derecha */}
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

            {/* Botones debajo, alineados a la derecha */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 4,
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(to right, #f6d365, #fda085)",
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                INICIO SESIÓN
              </Button>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  background: "linear-gradient(to right, #74ebd5, #9face6)",
                  color: "black",
                  marginRight: 15,
                  fontWeight: "bold",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                REGISTRO
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
}

export default Home;
