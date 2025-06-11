// src/Home.jsx
import React from 'react';
import { Box, Container, CssBaseline, Grid, Typography, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import customTheme from "../theme/customTheme";
import LandPageHeader from "../components/LandPageHeader";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import AppFooter from "../components/AppFooter";
import { FEATURES } from "../utils/constants";

function Home() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ bgcolor: customTheme.palette.background.default, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <LandPageHeader />
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, flexGrow: 1 }}>
          <HeroSection />
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
              {FEATURES.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" key={index}>
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    imgSrc={feature.imgSrc}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        <AppFooter />
      </Box>
    </ThemeProvider>
  );
}

export default Home;