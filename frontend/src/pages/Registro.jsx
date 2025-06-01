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
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setOpenSnackbar(true);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        setErrorMessage("");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2500);
      } else {
        const error = await res.json();
        setErrorMessage(error.detail || "Error al registrarse");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setErrorMessage("Fallo de conexión con el servidor");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 8 }}>
        <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Crear cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comienza a gestionar tus proyectos fácilmente
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box
          component="form"

          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Nombre completo"
            name="nombre"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />
          <TextField
            label="Email institucional"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 1,
              borderRadius: 5,
              background: "linear-gradient(to right, #74ebd5, #9face6)",
              fontWeight: "bold",
              color: "#000",
              "&:hover": {
                background: "linear-gradient(to right, #9face6, #74ebd5)",
              },
            }}
          >
            REGISTRARSE
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || "Registro exitoso"}
        </Alert>
      </Snackbar>
    </Container>
  );
}
