import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProjectDashboard from "./components/project/ProjectDashboard";
import TaskDetail from "./components/task/TaskDetail";
function App() {
  const user = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects/:projectId" element={<ProjectDashboard />} />
      <Route path="/tasks/:taskId" element={<TaskDetail />} />
    </Routes>
  );
}

export default App;
