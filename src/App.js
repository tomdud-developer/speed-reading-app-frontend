
import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import Dashboard from './components/Dashboard';


export default function App() {
  return (
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                  <Route path="/dashboard/" exact element={<Dashboard />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
  );
}