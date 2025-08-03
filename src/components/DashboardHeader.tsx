import React from 'react';
import { Typography, Button } from '@mui/material';
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
  <div className="dashboard-header">
    <div className={`dashboard-header__container ${isMobile ? 'dashboard-header__container--mobile' : ''}`}>
      <Typography 
        variant={isMobile ? 'h5' : 'h4'} 
        component="h1"
        className="dashboard-header__title"
      >
        {title}
      </Typography>
      <Button 
        variant="outlined" 
        color="error" 
        startIcon={<Logout />}
        onClick={onLogout}
        size={isMobile ? 'small' : 'medium'}
        className="dashboard-header__logout-btn"
      >
        {isMobile ? 'Logout' : 'Sign Out'}
      </Button>
    </div>
  </div>
);