import { useEffect, useState } from "react";
import axios from "axios";

function ProjectList({ onSelectProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/projects")
      .then((res) => {
        console.log("🔍 Proyectos recibidos:", res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("❌ Error al obtener proyectos:", err);
      });
  }, []);

  return (
    <div>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>📁 Proyectos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {projects.map((project) => (
          <li key={project.id} style={{ marginBottom: "0.5rem" }}>
            <button
              onClick={() => onSelectProject(project.id)}
              style={{
                backgroundColor: "#1f2937",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "1px solid #4b5563",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              📌 {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
