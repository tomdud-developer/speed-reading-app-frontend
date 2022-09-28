import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { deepOrange, green } from '@mui/material/colors';
import useAuth from '../hooks/useAuth';
const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;
  const { auth } = useAuth();
  const [date, setDate] = React.useState("");

  function startTime() {
    const today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yy = String(today.getFullYear());
    let h = String(today.getHours());
    let m = String(today.getMinutes());
    let s = String(today.getSeconds());
    m = checkTime(m);
    s = checkTime(s);
    dd = checkTime(dd);
    mm = checkTime(mm);
    setDate(`Aktualna data ${dd}.${mm}.${yy}  ${h}:${m}:${s}`)
  }

  function checkTime(i) {
    if (i.length < 2) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  
  React.useEffect(() => {
    const myTimeout = setTimeout(() => startTime(), 1000);
    return () => clearTimeout(myTimeout);
  })

  return (
    <React.Fragment >
      <AppBar  position="sticky" elevation={0}>
        <Toolbar >
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Typography sx={{fontWeight: 'bold', border: 1, borderColor: 'primary.airfoil', borderRadius: 1, padding: '3px' }}>
                {date}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
              <Avatar sx={{ bgcolor: '#95c23d' }} />
              <Typography sx={{ color: '#95c23d', marginLeft: '5px' }} > {auth.firstname} {auth.lastname}</Typography>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {props.currentcomponentname}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;