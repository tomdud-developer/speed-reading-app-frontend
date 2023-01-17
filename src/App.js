
import * as React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/common_components/Layout';
import { Routes, Route } from "react-router-dom";
import Login from './components/common_components/Login';
import RequireAuth from './components/common_components/RequireAuth';
import Dashboard from './components/dashboard/Dashboard';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Paper } from '@mui/material';
import Register from './components/common_components/Register';
import Speedmeter from './components/speedmeter/Speedmeter';
import Settings from './components/settings/Settings';
import Perception1 from './components/perception/excercise/Perception1';
import PointerBasic from './components/pointer/PointerBasic';
import PointerBasic2 from './components/pointer/PointerBasic2';
import FonetizationRemover from './components/fonetization_remover/FonetizationRemover';
import FastWords from "./components/perception/excercise/FastWords";
import SchultzArray from "./components/eyeshot/SchultzArray";
import PointerMedium from "./components/pointer/PointerMedium";
import ColumnsOfNumbers from "./components/perception/excercise/ColumnsOfNumbers";
import Pyramid from "./components/eyeshot/Pyramid";
import UnderstandMeter from "./components/understandmeter/UnderstandMeter";

export default function App() {

  let appTheme = createTheme({
    mode: "dark",
    palette: {
      primary: {
        main: '#263A52',
        text: '#fff',
        darkest: '#1A2027'
      },
      secondary: {
        main: '#66bb6a',
        text: "#000"
      },
      three: {
        main: '#101F33'
      },
      four: {
        main: '#f0ca62'
      },
      background: '#263A52'
    },
    typography: {
      allVariants: {
        fontFamily: 'Courgette',
        color: '#fff'
      },
      book: {
        color: '#000',
        fontFamily: 'Arial'
      }
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
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <div>
          <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'primary.dark'}} >
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                  <Route element={<RequireAuth allowedRoles={["ROLE_USER"]} />}>
                    <Route path="/dashboard/" exact element={<Dashboard />} />
                    <Route path="/speed-meter/" exact element={<Speedmeter />} />
                    <Route path="/understand-meter/" exact element={<UnderstandMeter />} />
                    <Route path="/perception-exercise-1/" exact element={<Perception1 />} />
                    <Route path="/perception-exercise-2/" exact element={<ColumnsOfNumbers />} />
                    <Route path="/settings/" exact element={<Settings />} />
                    <Route path="/pointer-basic/" exact element={<PointerBasic />} />
                    <Route path="/pointer-medium/" exact element={<PointerMedium />} />
                    <Route path="/fonetization-remover/" exact element={<FonetizationRemover />} />
                    <Route path="/fast-words/" exact element={<FastWords />} />
                    <Route path="/schultz-array/" exact element={<SchultzArray />} />
                    <Route path="/pyramid/" exact element={<Pyramid />} />
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