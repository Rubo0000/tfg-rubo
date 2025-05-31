import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Avatar,
  Divider,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        setError("");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const err = await res.json();
        setError(err.detail || "Error al iniciar sesión");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError("Fallo de red");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
            <LockOpenIcon />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Iniciar sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Accede a tu espacio de proyectos
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            onChange={handleChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 1,
              background: "linear-gradient(to right, #f6d365, #fda085)",
              fontWeight: "bold",
              color: "#000",
              "&:hover": {
                background: "linear-gradient(to right, #fda085, #f6d365)",
              },
            }}
          >
            INICIAR SESIÓN
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error || "Inicio de sesión exitoso"}
        </Alert>
      </Snackbar>
    </Container>
  );
}
