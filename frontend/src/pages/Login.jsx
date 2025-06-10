// Login.jsx
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
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader"; // Importa el nuevo componente

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const validateForm = () => {
      const { email, password } = form;
      const allFieldsFilled = email.trim() !== "" && password.trim() !== "";
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      return allFieldsFilled && isEmailValid;
    };

    setIsFormValid(validateForm());
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) {
      setSnackbarMessage("Por favor, ingrese un email y contraseña válidos.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("userId", data.user_id);

        setSnackbarMessage("Inicio de sesión exitoso");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const err = await res.json();
        setSnackbarMessage(err.detail || "Error al iniciar sesión. Verifique sus credenciales.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setSnackbarMessage("Fallo de conexión con el servidor. Intente de nuevo más tarde.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <AuthHeader />

      <Container maxWidth="sm" sx={{ pt: 4 }}>
        <Paper elevation={8} sx={{ p: 5, borderRadius: 8, overflow: 'hidden', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
          <Stack spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ bgcolor: "#FFC107", width: 64, height: 64, boxShadow: '0px 4px 15px rgba(255, 193, 7, 0.4)' }}>
              <LockOpenIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              Bienvenido
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Accede a tu cuenta
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
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 5 } }}
            />

            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
                endAdornment: (
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

            <Box sx={{ alignSelf: 'flex-end', mt: -2 }}>
              <Link href="/forgot-password" variant="body2" underline="hover" color="primary.main">
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading || !isFormValid}
              sx={{
                mt: 1,
                borderRadius: 5,
                background: "linear-gradient(to right, #f6d365, #fda085)",
                fontWeight: "bold",
                color: "#000",
                boxShadow: '0px 4px 10px rgba(253, 160, 133, 0.4)',
                transition: 'transform 0.2s ease-in-out',
                "&:hover": {
                  background: "linear-gradient(to right, #fda085, #f6d365)",
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 6px 15px rgba(253, 160, 133, 0.6)',
                },
                "&:disabled": {
                  background: '#e0e0e0',
                  color: '#a0a0a0',
                  boxShadow: 'none',
                },
                position: 'relative',
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : "INICIAR SESIÓN"}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" underline="hover">
                Regístrate aquí
              </Link>
            </Typography>
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
    </Box>
  );
}