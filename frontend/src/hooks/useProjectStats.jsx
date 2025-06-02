import { useState, useEffect } from "react";
import { fetchTasksByProject } from "../services/api";

const COMPLETED_STATUSES = ["completada", "finalizada", "cerrada"];

const isTaskCompleted = (status) =>
    COMPLETED_STATUSES.includes(status?.toLowerCase().trim());

export const useProjectStats = (projectId) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projectId) return;

        const fetch = async () => {
            setLoading(true);
            setError(null);

            try {
                const tasks = await fetchTasksByProject(projectId);
                const userId = parseInt(localStorage.getItem("userId"));

                const totalTasks = tasks.length;
                const completedTasks = tasks.filter((t) => isTaskCompleted(t.status)).length;
                const userTasks = tasks.filter((t) => t.assigned_to === userId).length;

                const contributions = tasks.reduce((acc, t) => {
                    if (!t.assigned_to) return acc;
                    const key = `Usuario ${t.assigned_to}`;
                    acc[key] = (acc[key] || 0) + (isTaskCompleted(t.status) ? 1 : 0);
                    return acc;
                }, {});

                const recentActivity = tasks
                    .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
                    .slice(0, 5)
                    .map((task) => `Tarea '${task.title}' con estado '${task.status}'`);

                setStats({
                    totalTasks,
                    completedTasks,
                    userTasks,
                    contributions,
                    recentActivity,
                });
            } catch (err) {
                console.error("Error en useProjectStats:", err);
                setError("Error al cargar estadísticas del proyecto.");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [projectId]);

    return { stats, loading, error };
};
