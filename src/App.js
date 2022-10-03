
import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import Dashboard from './components/Dashboard';
import { bgcolor } from '@mui/system';
import {red} from '@mui/material/colors';
//import theme from './theme/theme';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Paper } from '@mui/material';

export default function App() {

  let themeMy = createTheme({
    mode: "dark",
    palette: {
      primary: {
        main: '#001b29',
        text: '#fff'
      },
      secondary: {
        main: '#66bb6a',
      },
      three: '#101F33',
      background: '#263238'
    },
    typography: {
      allVariants: {
        fontFamily: 'Courgette',
        color: '#fff'
      },
    },
    tonalOffset: 0.2,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
  });

  return (
      <BrowserRouter>
      <ThemeProvider theme={themeMy}>
        <CssBaseline />
        <div>
          <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'primary.dark'}} >
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
          </div>
      </ThemeProvider>
      </BrowserRouter>
  );
}