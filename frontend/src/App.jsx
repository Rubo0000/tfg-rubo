import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProjectDashboard from "./components/project/ProjectDashboard";
import TaskDetail from "./components/task/TaskDetail";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      {/* Ruta condicional basada en el rol del usuario */}
      <Route
        path="/dashboard"
        element={user?.role === "teacher" ? <TeacherDashboard /> : <Dashboard />}
      />

      <Route path="/projects/:projectId" element={<ProjectDashboard />} />
      <Route path="/tasks/:taskId" element={<TaskDetail />} />
    </Routes>
  );
}

export default App;