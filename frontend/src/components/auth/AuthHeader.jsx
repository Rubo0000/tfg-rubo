import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useNavigate } from "react-router-dom";

export default function AuthHeader() {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                borderBottom: "1px solid #e2e8f0",
                mb: 4
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TaskAltIcon sx={{ color: "#3b82f6", fontSize: 28 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#1e293b",
                            fontFamily: "'Poppins', sans-serif"
                        }}
                    >
                        Project Manager
                    </Typography>
                </Box>
                <Button
                    startIcon={<HomeIcon />}
                    onClick={() => navigate("/")}
                    sx={{
                        color: "#64748b",
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 3,
                        px: 3,
                        "&:hover": {
                            backgroundColor: "#f1f5f9",
                            color: "#3b82f6",
                        },
                    }}
                >
                    Volver al inicio
                </Button>
            </Toolbar>
        </AppBar>
    );
}