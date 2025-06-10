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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  CircularProgress,
  IconButton, // Importar IconButton
  InputAdornment, // Importar InputAdornment
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility"; // Icono de ojo abierto
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Icono de ojo cerrado
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Nuevos estados para la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (e.target.name === "confirmPassword" && e.target.value !== form.password) {
        setPasswordError("Las contraseñas no coinciden");
      } else if (e.target.name === "password" && e.target.value !== form.confirmPassword && form.confirmPassword !== "") {
        setPasswordError("Las contraseñas no coinciden");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setSnackbarMessage("Las contraseñas no coinciden");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
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
          role: form.role,
        }),
      });

      if (res.ok) {
        setSnackbarMessage("Registro exitoso");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2500);
      } else {
        const error = await res.json();
        setSnackbarMessage(error.detail || "Error al registrarse");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage("Fallo de conexión con el servidor");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 8, overflow: 'hidden' }}>
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
            InputProps={{
              startAdornment: <AccountCircleIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
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
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />

          {/* CAMPO DE CONTRASEÑA CON BOTÓN DE VISIBILIDAD */}
          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
              endAdornment: ( // Añadir al final del input
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />

          {/* CAMPO DE CONFIRMAR CONTRASEÑA CON BOTÓN DE VISIBILIDAD */}
          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} // Cambia el tipo según el estado
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
              endAdornment: ( // Añadir al final del input
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
          />

          <FormControl fullWidth variant="outlined" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}>
            <InputLabel id="role-label">Tipo de usuario</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={form.role}
              label="Tipo de usuario"
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 4,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    marginTop: 1,
                  },
                },
              }}
            >
              <MenuItem
                value="student"
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#bbdefb',
                    fontWeight: 'bold',
                  },
                }}
              >
                Estudiante
              </MenuItem>
              <MenuItem
                value="teacher"
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#bbdefb',
                    fontWeight: 'bold',
                  },
                }}
              >
                Docente
              </MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" color="text.secondary" align="center">
            Al registrarte, aceptas nuestros{" "}
            <Link href="/terms" underline="hover">
              Términos y condiciones
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              borderRadius: 5,
              background: "linear-gradient(to right, #74ebd5, #9face6)",
              fontWeight: "bold",
              color: "#000",
              "&:hover": {
                background: "linear-gradient(to right, #9face6, #74ebd5)",
              },
              position: 'relative',
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : "REGISTRARSE"}
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
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}