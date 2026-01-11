import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import  TeacherDashboard from "./pages/TeacherDashboard";


import Header from './component/Header.jsx';
const App = () => {

  return (
    <Router>
      <Header/>
      <Box>         
         <Routes>

            <Route path="/dashboard" element={<TeacherDashboard />} />
          </Routes>
      </Box>
    </Router>
  );
};

export default App;