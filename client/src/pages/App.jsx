import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ErrorBoundary from './component/ErrorBoundary';
import  Dashboard from './pages/Dashboard';
const App = () => {

  return (
    <Router>
      <Header/>
      <Box sx={{ mt: 8 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Router>
  );
};

export default App;