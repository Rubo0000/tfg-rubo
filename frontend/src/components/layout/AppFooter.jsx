// src/components/AppFooter.jsx
import React from 'react';
import { Box, Container, Stack, Typography, Grid, Link as MuiLink, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ASSETS, FOOTER_LINKS } from "../../utils/constants";

function AppFooter() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 6 },
        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: theme.shape.borderRadius * 2,
        borderTopRightRadius: theme.shape.borderRadius * 2,
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center" justifyContent="center">
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
                {FOOTER_LINKS.map((link) => (
                  link.external ? (
                    <MuiLink key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" underline="none">
                      {link.name}
                    </MuiLink>
                  ) : (
                    <MuiLink key={link.name} component={RouterLink} to={link.path} underline="none">
                      {link.name}
                    </MuiLink>
                  )
                ))}
              </Stack>
              <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.8)">
                Edificios 1G - 1E - 1H, ETS de Ingeniería Informática, Camí de Vera, s/n, Algirós,<br />
                46022 Valencia<br />
                © {new Date().getFullYear()} UPV. Todos los derechos reservados.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: { xs: 4, md: 6 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 3, sm: 0 }
        }}>
          <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
            <img src={ASSETS.LogoUPV} alt="Logo UPV" style={{ height: 80, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
          </Box>
          <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
            <img src={ASSETS.LogoETSINF} alt="Logo ETSINF" style={{ height: 70, filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.2))' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AppFooter;