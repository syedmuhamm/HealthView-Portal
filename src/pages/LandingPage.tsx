import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../styles/pages/_landing-page.scss';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});

const LandingPage: React.FC = () => {
  const { login, authError, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        formik.setStatus({
          isError: true,
          message: 'Login failed. Please try again.',
        });
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" className="landing-page__container">
      <Box className="landing-page__content">
        <Avatar className="landing-page__avatar">
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h4" className="landing-page__title">
          Clinical Study Portal
        </Typography>
        
        <Paper elevation={3} className="landing-page__paper">
          {authError && (
            <Alert severity="error" className="landing-page__error">
              {authError}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              margin="normal"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={authLoading}
              autoComplete="email"
              autoFocus
              className="landing-page__input"
            />
            
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={authLoading}
              autoComplete="current-password"
              className="landing-page__input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      className="landing-page__password-toggle"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!formik.isValid || authLoading}
              className="landing-page__button"
            >
              {authLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LandingPage;