import { useState } from "react";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";

function Dashboard() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📚 Gestor de Proyectos Académicos</h1>
      <div style={{ display: "flex", gap: "3rem" }}>
        <ProjectList onSelectProject={setSelectedProjectId} />
        <TaskList projectId={selectedProjectId} />
      </div>
    </div>
  );
}

export default Dashboard;
