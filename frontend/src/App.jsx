import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProjectDashboard from "./components/project/ProjectDashboard";
import TaskDetail from "./components/task/TaskDetail";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentManagement from "./components/teacher/StudentManagement";
import ProjectSupervision from "./components/teacher/ProjectSupervision";
import GlobalStats from "./components/teacher/GlobalStats";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = localStorage.getItem("userRole");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />

      {userRole === "teacher" ? (
        <>
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/students" element={<StudentManagement />} />
          <Route path="/teacher/projects" element={<ProjectSupervision />} />
          <Route path="/teacher/stats" element={<GlobalStats />} />
        </>
      ) : (
        <Route path="/dashboard" element={<Dashboard />} />
      )}

      <Route path="/projects/:projectId" element={<ProjectDashboard />} />
      <Route path="/tasks/:taskId" element={<TaskDetail />} />
    </Routes>
  );
}

export default App;