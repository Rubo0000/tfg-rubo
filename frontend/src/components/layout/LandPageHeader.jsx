import React from 'react';
import { AppBar, Toolbar, Box, Stack, Button, Typography, useTheme, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ASSETS } from "../../utils/constants";

function LandPageHeader() {
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
                    <Box component="img" src={ASSETS.LogoTitulo} alt="Logo" sx={{ height: { xs: 30, sm: 40 } }} />
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

                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        color="primary"
                        sx={{
                            minWidth: { xs: 0, sm: 'auto' },
                            px: { xs: 1.5, sm: 2.5 },
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

export default LandPageHeader;