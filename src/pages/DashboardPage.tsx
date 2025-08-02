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
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, md: 4 },
        px: { xs: 1.5, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
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