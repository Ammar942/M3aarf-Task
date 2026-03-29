import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import type { Task, Column as ColumnType } from '../types/task';
import { useUIStore } from '../store/useUIStore';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const { visibleCount, showMore } = useUIStore();
  const visible = visibleCount[column.id];

  const visibleTasks = tasks.slice(0, visible);
  const hiddenCount = tasks.length - visibleTasks.length;

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 270,
        maxWidth: 300,
        flex: 1,
        p: 2,
        backgroundColor: '#ebebeba5',
        borderRadius: 2,
      }}
    >
      {/* Column header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: column.color,
            flexShrink: 0,
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {column.label}
        </Typography>
        <Box
          sx={{
            ml: 0.5,
            bgcolor: '#e5e7eb',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.65rem', lineHeight: 1 }}>
            {tasks.length}
          </Typography>
        </Box>
      </Box>

      {/* Droppable task list — minHeight keeps the drop zone alive even when empty */}
      <Box
        ref={setNodeRef}
        sx={{
          minHeight: visibleTasks.length === 0 ? 4 : 'auto',
          p: visibleTasks.length === 0 ? 0 : 1,
          borderRadius: 2,
          bgcolor: isOver ? '#f0f4ff' : 'transparent',
          transition: 'background-color 0.15s',
        }}
      >
        <SortableContext items={visibleTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </SortableContext>

        {hiddenCount > 0 && (
          <Button
            fullWidth
            size="small"
            startIcon={<ExpandMoreIcon />}
            onClick={() => showMore(column.id)}
            sx={{ mt: 0.5, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            Load {Math.min(hiddenCount, 5)} more ({hiddenCount} remaining)
          </Button>
        )}
      </Box>

      <Button
        fullWidth
        startIcon={<AddIcon />}
        onClick={onAddTask}
        sx={{
          mt: 1,
          color: 'text.secondary',
          fontSize: '1rem',
          border: '1.5px dashed #d1d5db',
          borderRadius: 2,
          py: 1,
        }}
      >
        Add task
      </Button>
    </Box>
  );
};

export default Column;
