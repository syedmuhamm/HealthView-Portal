import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DashboardView } from '../components/DashboardView';
import { DashboardHeader } from '../components/DashboardHeader';
import '../styles/pages/_dashboard-page.scss';

const DashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return (
      <Box className="loading-container">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <DashboardHeader 
        title="Blood Pressure Monitoring" 
        onLogout={logout} 
        isMobile={isMobile} 
      />
      <DashboardView isMobile={isMobile} />
    </Container>
  );
};

export default DashboardPage;