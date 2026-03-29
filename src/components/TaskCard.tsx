import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, Priority } from '../types/task';

const PRIORITY_CONFIG: Record<Priority, { label: string; bg: string; color: string }> = {
  high:   { label: 'HIGH',   bg: '#fee2e2', color: '#dc2626' },
  medium: { label: 'MEDIUM', bg: '#ffedd5', color: '#ea580c' },
  low:    { label: 'LOW',    bg: '#c7c7c7ff', color: '#707070ff' },
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const priorityCfg = PRIORITY_CONFIG[task.priority];

  return (
    <Card
      ref={setNodeRef}
      sx={{
        mb: 1.5,
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
      }}
    >
      <CardContent sx={{ p: '14px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
          <Box
            {...attributes}
            {...listeners}
            sx={{ mt: '2px', cursor: 'grab', color: '#d1d5db', flexShrink: 0 }}
          >
            <DragIcon fontSize="small" />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.2, fontSize: '0.8rem' }}>
              {task.description}
            </Typography>

            <Chip
              label={priorityCfg.label}
              size="small"
              sx={{
                bgcolor: priorityCfg.bg,
                color: priorityCfg.color,
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 20,
                borderRadius: 1,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Tooltip title="Edit task">
              <IconButton size="small" onClick={() => onEdit(task)} sx={{ p: 0.5 }}>
                <EditIcon sx={{ fontSize: 15, color: '#aac800ff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton size="small" onClick={() => onDelete(task.id)} sx={{ p: 0.5 }}>
                <DeleteIcon sx={{ fontSize: 15, color: '#ff3651ff' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
