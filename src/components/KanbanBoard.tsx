import React, { useState } from 'react';
import {
  Box, CircularProgress, Alert, AlertTitle,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button,
} from '@mui/material';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { useUIStore } from '../store/useUIStore';
import type { Task, ColumnId, Column as ColumnType, TaskFormValues } from '../types/task';

const COLUMNS: ColumnType[] = [
  { id: 'todo',        label: 'To Do',       color: '#3b82f6' },
  { id: 'in_progress', label: 'In Progress',  color: '#f97316' },
  { id: 'review',      label: 'In Review',    color: '#ae0ff8ff' },
  { id: 'done',        label: 'Done',         color: '#22c55e' },
];

const KanbanBoard: React.FC = () => {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { searchQuery } = useUIStore();

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultColumn, setDefaultColumn] = useState<ColumnId>('todo');
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const q = searchQuery.toLowerCase().trim();
  const filteredTasks = q
    ? tasks.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    : tasks;

  const tasksByColumn = (columnId: ColumnId) =>
    filteredTasks.filter((t) => t.column === columnId);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isOverColumn = COLUMNS.some((c) => c.id === over.id);
    const targetColumn: ColumnId = isOverColumn
      ? (over.id as ColumnId)
      : (tasks.find((t) => t.id === over.id)?.column ?? 'todo');

    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    if (draggedTask.column !== targetColumn) {
      updateTask.mutate({ id: draggedTask.id, values: { column: targetColumn } });
    }
  };

  const openCreateModal = (columnId: ColumnId) => {
    setEditingTask(null);
    setDefaultColumn(columnId);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSave = (values: TaskFormValues) => {
    if (editingTask) {
      updateTask.mutate({ id: editingTask.id, values });
    } else {
      createTask.mutate(values);
    }
    setModalOpen(false);
  };

  const handleDeleteRequest = (id: number) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete !== null) {
      deleteTask.mutate(taskToDelete);
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ m: 4 }}>
        <Alert severity="error">
          <AlertTitle>Could not load tasks</AlertTitle>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            p: 3,
            overflowX: 'auto',
            alignItems: 'flex-start',
          }}
        >
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={tasksByColumn(col.id)}
              onAddTask={() => openCreateModal(col.id)}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteRequest}
            />
          ))}
        </Box>
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onEdit={() => {}} onDelete={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        open={modalOpen}
        task={editingTask}
        defaultColumn={defaultColumn}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDeleteCancel} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KanbanBoard;
