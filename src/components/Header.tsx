import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputAdornment,
  TextField,
  Box,
} from '@mui/material';
import { Search as SearchIcon, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useUIStore } from '../store/useUIStore';
import { useTasks } from '../hooks/useTasks';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useUIStore();
  const { data: tasks = [] } = useTasks();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#F0F2F5',
        borderBottom: '1px solid #c4c4c4ff',
        color: '#000',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 2,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DashboardIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontWeight: 700, fontSize: 14 }}>
              KANBAN BOARD
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {tasks.length} tasks
            </Typography>
          </Box>
        </Box>

        <TextField
          size="small"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 240,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#9d9d9dff',
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
