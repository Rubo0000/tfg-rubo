export const createProject = async (projectData) => {
    try {
        const response = await fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData),
        });

        if (!response.ok) throw new Error(await response.text());

        return { success: true };
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        return { success: false };
    }
};

export const fetchUserProjects = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8000/projects/by_user/${userId}`);
        if (!response.ok) throw new Error("Error al obtener proyectos");
        return await response.json();
    } catch (error) {
        console.error("Error al cargar proyectos:", error);
        return [];
    }
};