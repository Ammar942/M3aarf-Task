import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Stack, Typography,
} from '@mui/material';
import type { Task, ColumnId, Priority, TaskFormValues } from '../types/task';

const COLUMN_OPTIONS: { value: ColumnId; label: string }[] = [
  { value: 'todo',        label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review',      label: 'In Review' },
  { value: 'done',        label: 'Done' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'high',   label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low',    label: 'Low' },
];


interface TaskModalProps {
  open: boolean;
  task: Task | null;
  defaultColumn?: ColumnId;
  onClose: () => void;
  onSave: (values: TaskFormValues) => void;
}

const EMPTY_FORM: TaskFormValues = {
  title: '',
  description: '',
  column: 'todo',
  priority: 'medium',
};

// Modal dialog for creating or editing a task.
const TaskModal: React.FC<TaskModalProps> = ({ open, task, defaultColumn, onClose, onSave }) => {
  const [form, setForm] = React.useState<TaskFormValues>(EMPTY_FORM);

  useEffect(() => {
    if (task) {
      setForm({ title: task.title, description: task.description, column: task.column, priority: task.priority });
    } else {
      setForm({ ...EMPTY_FORM, column: defaultColumn ?? 'todo' });
    }
  }, [open, task, defaultColumn]);

  const handleChange = (field: keyof TaskFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onSave(form);
  };

  const isEditMode = Boolean(task);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          {/* Title */}
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={handleChange('title')}
            required
            autoFocus
            inputProps={{ maxLength: 100 }}
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange('description')}
            inputProps={{ maxLength: 300 }}
          />

          <Stack direction="row" spacing={2}>
            {/* Column select */}
            <TextField
              label="Column"
              select
              fullWidth
              value={form.column}
              onChange={handleChange('column')}
            >
              {COLUMN_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Priority select */}
            <TextField
              label="Priority"
              select
              fullWidth
              value={form.priority}
              onChange={handleChange('priority')}
            >
              {PRIORITY_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          {isEditMode ? `Editing task #${task?.id}` : 'New task will be added to the selected column'}
        </Typography>
        <Button onClick={onClose} sx={{ color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!form.title.trim()}>
          {isEditMode ? 'Save Changes' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
