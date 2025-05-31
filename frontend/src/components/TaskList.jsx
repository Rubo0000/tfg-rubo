import { useEffect, useState } from "react";
import axios from "axios";

function TaskList({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (projectId) {
      axios
        .get(`http://127.0.0.1:8000/tasks/by_project/${projectId}`)
        .then((res) => setTasks(res.data));
    }
  }, [projectId]);

  if (!projectId) return <p>Selecciona un proyecto</p>;

  return (
    <div>
      <h2>📝 Tareas del Proyecto</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> – {task.status} – {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
