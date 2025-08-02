import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

interface DashboardHeaderProps {
  title: string;
  onLogout: () => void;
  isMobile: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  onLogout, 
  isMobile 
}) => (
  <Box sx={{ my: 2 }}>
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      mb={4}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={2}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} component="h1">
        {title}
      </Typography>
      <Button 
        variant="outlined" 
        color="error" 
        startIcon={<Logout />}
        onClick={onLogout}
        size={isMobile ? 'small' : 'medium'}
      >
        {isMobile ? 'Logout' : 'Sign Out'}
      </Button>
    </Box>
  </Box>
);