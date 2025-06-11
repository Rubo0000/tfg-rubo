import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Stack,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Button,
  Typography,
  useTheme,
  Paper,
  Grid,
  Link as MuiLink
} from "@mui/material";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clipboard as ClipboardIcon,
  BarChart as BarChartIcon,
  GraduationCap as GraduationCapIcon,
  ArrowRight
} from 'lucide-react';

import GestionDeTareas from "../assets/GestionDeTareas.png";
import SeguimientoDelProgreso from "../assets/SeguimientoDelProgeso.png";
import SupervisionDocente from "../assets/SupervisionDocente.png";
import Landpage from "../assets/LandPage.png";
import LogoTitulo from "../assets/LogoTitulo.png";
import LogoUPV from "../assets/LogoUPV.png";
import LogoETSINF from "../assets/LogoETSINF.png";


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#4A5BFF',
      light: '#6F7EFF',
      dark: '#2A3A9E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8E44AD',
      light: '#A86ED4',
      dark: '#6A2A82',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
        },
        containedPrimary: {
          boxShadow: '0px 8px 15px rgba(74, 91, 255, 0.3)',
          transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 12px 20px rgba(74, 91, 255, 0.4)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px !important',
          '&:hover': {
            backgroundColor: 'rgba(74, 91, 255, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
  },
});


function AppHeader() {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ py: 1, bgcolor: theme.palette.background.default }}>
      <Toolbar sx={{
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, md: 4 },
        maxWidth: 1400,
        mx: 'auto',
        width: '100%',
      }}>
        <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: theme.spacing(1) }}>
          <Box component="img" src={LogoTitulo} alt="Logo" sx={{ height: { xs: 30, sm: 40 } }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: theme.palette.text.primary,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Project Manager
          </Typography>
        </RouterLink>

        <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
          <MuiLink component={RouterLink} to="/how-it-works" color="text.secondary" underline="hover" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Cómo funciona
          </MuiLink>
          <MuiLink component={RouterLink} to="/about" color="text.secondary" underline="hover" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Sobre la app
          </MuiLink>
          <MuiLink component={RouterLink} to="/contact" color="text.secondary" underline="hover" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Contacto
          </MuiLink>
          {/* Placeholder para AuthButtons, podrías pasar props a un componente AuthButtons real */}
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="primary"
            sx={{
              minWidth: { xs: 0, sm: 'auto' }, // Ajusta el ancho para móviles
              px: { xs: 1.5, sm: 2.5 }, // Ajusta el padding
              py: { xs: 0.5, sm: 1 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            color="primary"
            sx={{
              minWidth: { xs: 0, sm: 'auto' },
              px: { xs: 1.5, sm: 2.5 },
              py: { xs: 0.5, sm: 1 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Registro
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// =================================================================================================
// 3. Componente HeroSection (Re-imaginado con texto y CTA)
// =================================================================================================
function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        py: { xs: 4, md: 8 },
        gap: { xs: 4, md: 8 },
        textAlign: { xs: 'center', md: 'left' },
        px: { xs: 2, md: 0 } // Padding horizontal para móviles
      }}
    >
      {/* Contenido de texto */}
      <Stack
        spacing={3}
        sx={{
          flex: 1,
          maxWidth: { md: '50%' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: theme.palette.text.primary,
              lineHeight: 1.1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Organiza, Colabora, Triunfa.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400 }}>
            La plataforma definitiva para equipos educativos y proyectos universitarios.
            Gestiona tareas, sigue el progreso y facilita la supervisión docente con Project Manager.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            component={RouterLink}
            to="/registro"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowRight />}
            sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 10 }} // Botón redondeado
          >
            Empieza Gratis
          </Button>
        </motion.div>
      </Stack>

      {/* Imagen */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: 'relative',
          width: "100%",
          maxWidth: { xs: 450, md: 600 },
          minHeight: { xs: 250, sm: 350, md: 450 }, // Asegura una altura mínima
        }}
      >
        <motion.img
          src={Landpage}
          alt="Maqueta de la aplicación en dispositivos"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: theme.shape.borderRadius * 2, // Más redondeado
            boxShadow: `0px 20px 40px rgba(0, 0, 0, 0.15), 0px 5px 15px rgba(0, 0, 0, 0.1)`, // Sombra más pronunciada
            objectFit: 'contain',
            position: 'absolute', // Permite que el Box contenedor controle el tamaño
            top: 0,
            left: 0,
          }}
        />
      </Box>
    </Box>
  );
}

// =================================================================================================
// 4. Componente Feature (Mejorado)
// =================================================================================================
function Feature({ icon, title, description, imgSrc }) {
  const theme = useTheme();

  // Decide qué icono usar: Lucide (si se pasa 'icon') o la imagen (si se pasa 'imgSrc')
  const IconComponent = ({ name }) => {
    switch (name) {
      case 'clipboard': return <ClipboardIcon size={48} color={theme.palette.primary.main} />;
      case 'bar-chart': return <BarChartIcon size={48} color={theme.palette.primary.main} />;
      case 'graduation': return <GraduationCapIcon size={48} color={theme.palette.primary.main} />;
      default: return null;
    }
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.05, // Menor escala para ser más sutil
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)', // Sombra más suave
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      sx={{
        width: '100%', // Ocupa el 100% del ancho disponible en su columna de grid
        maxWidth: 320, // Max-width para evitar que se estire demasiado en pantallas grandes
        minHeight: 280, // Altura mínima para consistencia
        p: 3, // Mayor padding
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
        bgcolor: theme.palette.primary.light + '20', // Un fondo suave para el icono
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {imgSrc ? (
          <img src={imgSrc} alt={title} style={{ width: 64, height: 64, objectFit: 'contain' }} />
        ) : (
          <IconComponent name={icon} />
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

// =================================================================================================
// 5. Componente Footer (Mejorado)
// =================================================================================================
function AppFooter() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`, // Gradiente
        color: 'white',
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: theme.shape.borderRadius * 2, // Bordes superiores redondeados
        borderTopRightRadius: theme.shape.borderRadius * 2,
        mt: 8 // Margen superior para separarlo del contenido
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" justifyContent="center">
          {/* Sección de Enlaces y Contacto */}
          <Grid item xs={12} md={8}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{
                textAlign: 'center',
                '& a': {
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  transition: 'color 0.2s ease-in-out',
                  '&:hover': {
                    color: theme.palette.secondary.light,
                  }
                }
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 3 }}
                justifyContent="center"
                flexWrap="wrap"
              >
                <MuiLink component={RouterLink} to="/how-it-works" underline="none">
                  Cómo funciona
                </MuiLink>
                <MuiLink component={RouterLink} to="/about" underline="none">
                  Sobre la app
                </MuiLink>
                <MuiLink component={RouterLink} to="/contact" underline="none">
                  Contacto
                </MuiLink>
                <MuiLink href="https://www.upv.es/" target="_blank" rel="noopener noreferrer" underline="none">
                  UPV
                </MuiLink>
                <MuiLink href="https://www.etsinf.upv.es/" target="_blank" rel="noopener noreferrer" underline="none">
                  ETSINF
                </MuiLink>
              </Stack>
              <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.8)">
                Edificios 1G - 1E - 1H, ETS de Ingeniería Informática, Camí de Vera, s/n, Algirós,<br />
                46022 Valencia<br />
                © {new Date().getFullYear()} UPV. Todos los derechos reservados.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Logos de las universidades - Posicionamiento más flexible */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: { xs: 4, md: 6 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 3, sm: 0 }
        }}>
          <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
            <img src={LogoUPV} alt="Logo UPV" style={{ height: 80, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
          </Box>
          <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
            <img src={LogoETSINF} alt="Logo ETSINF" style={{ height: 70, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// =================================================================================================
// 6. Componente Home (Contenedor principal con theme)
// =================================================================================================
function Home() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline /> {/* Resetea CSS y aplica estilos base del tema */}
      <Box sx={{ bgcolor: customTheme.palette.background.default, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppHeader />
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flexGrow: 1 }}>
          {/* Sección Hero */}
          <HeroSection />

          {/* Sección de Características */}
          <Box sx={{ my: { xs: 6, md: 10 }, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{
              fontWeight: 700,
              mb: 4,
              color: customTheme.palette.text.primary,
              background: `linear-gradient(45deg, ${customTheme.palette.primary.dark} 30%, ${customTheme.palette.secondary.dark} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Potencia tu Gestión de Proyectos
            </Typography>
            <Grid container spacing={{ xs: 3, md: 5 }} justifyContent="center">
              <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                <Feature
                  icon="clipboard"
                  title="Gestión de Tareas"
                  description="Crea, asigna y supervisa tareas con claridad y roles definidos para mantener todo bajo control."
                  imgSrc={GestionDeTareas} // Se mantiene imgSrc si prefieres las imágenes originales
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                <Feature
                  icon="bar-chart"
                  title="Seguimiento de Progreso"
                  description="Visualiza el avance individual y grupal con estadísticas en tiempo real y reportes claros."
                  imgSrc={SeguimientoDelProgreso}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
                <Feature
                  icon="graduation"
                  title="Supervisión Docente"
                  description="Facilita la evaluación justa con herramientas específicas para profesores y tutores."
                  imgSrc={SupervisionDocente}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <AppFooter />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
