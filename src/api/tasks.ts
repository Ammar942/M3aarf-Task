import axios from 'axios';
import type { Task, TaskFormValues } from '../types/task';


// Use local URL for dev, and relative /api for production on Vercel
const BASE_URL = import.meta.env.DEV ? 'http://localhost:4000' : '';

const api = axios.create({ baseURL: BASE_URL });

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>('/tasks');
  return data;
};

export const createTask = async (values: TaskFormValues): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', values);
  return data;
};


export const updateTask = async (id: number, values: Partial<TaskFormValues>): Promise<Task> => {
  const { data } = await api.patch<Task>(`/tasks/${id}`, values);
  return data;
};


export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
