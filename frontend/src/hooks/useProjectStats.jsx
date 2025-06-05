// hooks/useProjectStats.js
import { useState, useEffect } from "react";
import { fetchTasksByProject, fetchUserById } from "../services/api";

// hooks/useProjectStats.js
export const useProjectStats = (projectId) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetch = async () => {
        try {
            const tasks = await fetchTasksByProject(projectId);
            const userId = parseInt(localStorage.getItem("userId"));
            const isCompleted = status => ["completada", "finalizada"].includes(status);
            const inProgressCount = tasks.filter(t => t.status === "en progreso").length;

            const assignedUserIds = [...new Set(tasks.map(t => t.assigned_to).filter(Boolean))];
            const userNamesMap = {};
            await Promise.all(
                assignedUserIds.map(async (id) => {
                    const user = await fetchUserById(id);
                    userNamesMap[id] = user.name;
                })
            );

            const contributions = tasks.reduce((acc, t) => {
                if (!t.assigned_to) return acc;
                const key = userNamesMap[t.assigned_to] || `Usuario ${t.assigned_to}`;
                acc[key] = (acc[key] || 0) + (isCompleted(t.status) ? 1 : 0);
                return acc;
            }, {});

            contributions.__enProgreso = inProgressCount;

            setStats({
                totalTasks: tasks.length,
                completedTasks: tasks.filter(t => isCompleted(t.status)).length,
                userTasks: tasks.filter(t => t.assigned_to === userId).length,
                recentActivity: tasks
                    .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
                    .slice(0, 5)
                    .map(task => `Tarea '${task.title}' con estado '${task.status}'`),
                contributions
            });
        } catch (err) {
            setError("No se pudieron cargar las estadísticas del proyecto.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetch(); }, [projectId]);

    return { stats, loading, error, refetchStats: fetch };
};
export default useProjectStats;