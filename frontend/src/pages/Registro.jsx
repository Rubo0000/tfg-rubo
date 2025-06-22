// Registro.jsx
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFormContainer from "../components/auth/AuthFormContainer";
import AuthSnackbar from "../components/auth/AuthSnackbar";

export default function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    avatar: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
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

  useEffect(() => {
    const validateForm = () => {
      const { nombre, email, password, confirmPassword } = form;

      const allFieldsFilled = nombre.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "";

      const passwordsMatch = password === confirmPassword && passwordError === "";
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      return allFieldsFilled && passwordsMatch && isEmailValid;
    };

    setIsFormValid(validateForm());
  }, [form, passwordError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isFormValid) {
      setSnackbarMessage("Por favor, complete todos los campos correctamente.");
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
          avatar: form.avatar || undefined,
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <AuthHeader />

      <AuthFormContainer
        avatarIcon={
          form.avatar ? (
            <img
              src={form.avatar}
              alt="Avatar de usuario"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <PersonAddAltIcon sx={{ fontSize: 36 }} />
          )
        }
        avatarBgColor="#1976d2"
        title="Crear cuenta"
        subtitle="Comienza a gestionar tus proyectos fácilmente"
        titleColor="text.primary"
      >
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

          <TextField
            label="Confirmar contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
              endAdornment: (
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Foto de perfil (opcional)
            </Typography>

            <Button
              variant="outlined"
              component="label"
              sx={{ borderRadius: 5, textTransform: "none", mb: 2 }}
            >
              Seleccionar imagen
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </Button>

            {form.avatar && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>

                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => setForm(prev => ({ ...prev, avatar: "" }))}
                  sx={{ textTransform: "none", fontSize: "0.85rem" }}
                >
                  Quitar imagen
                </Button>
              </Box>
            )}
          </Box>


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
            disabled={loading || !isFormValid}
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

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" underline="hover">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </AuthFormContainer>

      <AuthSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
}