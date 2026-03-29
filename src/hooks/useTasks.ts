import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import type { TaskFormValues } from '../types/task';

// The cache key for the tasks list — used to invalidate after mutations
const TASKS_KEY = ['tasks'] as const;


/**
 * Fetches the full task list and caches it.
 * Data stays "fresh" for 30 seconds before a background refetch is triggered.
 */
export const useTasks = () =>
  useQuery({
    queryKey: TASKS_KEY,
    queryFn: fetchTasks,
    staleTime: 30_000,
  });

/** Creates a new task and refreshes the task list */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: TaskFormValues) => createTask(values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
};

/** Updates an existing task (e.g. title, column, priority) and refreshes */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: Partial<TaskFormValues> }) =>
      updateTask(id, values),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
};

/** Deletes a task by id and refreshes the list */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TASKS_KEY }),
  });
};
