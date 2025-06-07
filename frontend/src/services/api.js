import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const fetchProjects = async () => {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
};

export const fetchTasks = async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
};

export const fetchTasksByProject = async (projectId) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/by_project/${projectId}`);
    return response.data;
};

export const fetchTasksByUser = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/by_user/${userId}`);
    return response.data;
};
export const fetchProjectsByUser = async (userId) => {
    const response = await axios.get(`http://localhost:8000/projects/by_user/${userId}`);
    return response.data;
};

export const fetchProjectById = async (projectId) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
    return response.data;
};

export const fetchUserById = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
};

export const fetchTaskById = async (taskId) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
};

export const fetchCommentsByTaskId = async (taskId) => {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/comments`);
    return response.data;
};

export const addCommentToTask = async (taskId, commentData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/comments`, commentData);
    return response.data;
};

export const fetchAttachmentsByTaskId = async (taskId) => {
    const response = await axios.get(`/tasks/${taskId}/attachments`);
    return response.data;
};

export const uploadAttachmentToTask = async (taskId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`/tasks/${taskId}/attachments`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchUsersByProject = async (projectId) => {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/users`);
    return response.data;
};

export const removeUserFromProject = async (projectId, userId) => {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/users/${userId}`);
    return response.data;
};
export const addUserToProject = async (projectId, userId) => {
    const response = await axios.post(`${API_BASE_URL}/projects/${projectId}/users/${userId}`);
    return response.data;
};
export const logoutUser = async () => {
    try {
        await axios.post(`${API_BASE_URL}/logout`);
    } catch (err) {
        console.warn("Logout local sin respuesta del servidor");
    } finally {
        localStorage.clear();
    }
};
