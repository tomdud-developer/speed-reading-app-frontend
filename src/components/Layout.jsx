import { Outlet } from "react-router-dom"
import React from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigation from "./Navigation";
import Header from "./Header";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";


const Layout = () => {

  const drawerWidth = 256;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [navigatorElement, setNavigatorElement] = React.useState('Panel główny');
  const fromNavigatorComponent = (name) => {
    setNavigatorElement(name);
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © Tomasz Dudzik'}
        <Link color="inherit">
          Speed Reading App
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
  }

    return (
        <>
            <CssBaseline />
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>

            <Navigation PaperProps={{ style: { width: drawerWidth } }} sx={{ display: { sm: 'block', xs: 'none' } }} onComponentChange={fromNavigatorComponent} />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle} currentcomponentname={navigatorElement} />
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <main className="App">
                  <Outlet />
                </main>
            </Box>
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
              <Copyright />
            </Box>
            </Box>
        </>
    )
}

//<Copyright />


export default Layout

