import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import Image from 'mui-image'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ApprovalIcon from '@mui/icons-material/Approval';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import DataArrayIcon from '@mui/icons-material/DataArray';
import DetailsIcon from '@mui/icons-material/Details';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import DashboardIcon from '@mui/icons-material/Dashboard';

let categories = [
  {
    id: 'Mierniki',
    children: [
      { id: 'Prędkości czytania', icon: <SpeedIcon sx={{color: 'secondary.main'}} />, active: false, path: '/speed-meter' },
      { id: 'Zrozumienia tekstu', icon: <PsychologyIcon sx={{color: 'secondary.main'}} />, active: false, path: '/understand-meter' },
    ],
  },
  {
    id: 'Percepcja wzrokowa',
    children: [
      { id: 'Znikające liczby', icon: <ApprovalIcon sx={{color: 'secondary.main'}} />, active: false, path: '/perception-exercise-1'},
      { id: 'Kolumny liczb', icon: <ViewWeekIcon sx={{color: 'secondary.main'}} />, active: false, path: '/perception-exercise-2'},
      { id: 'Eliminacja fonetyzacji', icon: <LayersClearIcon sx={{color: 'secondary.main'}} />, active: false, path: '/fonetization-remover' },
      { id: 'Szybkie słowa', icon: <SwitchAccessShortcutAddIcon sx={{color: 'secondary.main'}} />, active: false, path: '/fast-words' },
    ],
  },
  {
    id: 'Pole widzenia',
    children: [
      {id: 'Tablice Schultza', icon: <DataArrayIcon sx={{color: 'secondary.main'}} />, active: false, path: '/schultz-array'},
      {id: 'Piramida liczbowa', icon: <DetailsIcon sx={{color: 'secondary.main'}} />, active: false, path: '/pyramid'},
    ],
  },
  {
    id: 'Czytanie ze wskaźnikiem',
    children: [
      {id: 'Podstawowy', icon: <GpsFixedIcon sx={{color: 'secondary.main'}} />, active: false, path: '/pointer-basic'},
      { id: 'Średni', icon: <GpsFixedIcon sx={{color: 'secondary.main'}} />, active: false, path: '/pointer-medium' },
    ],
  },
  {
    id: 'Ustawienia',
    children: [
      {id: 'Ustawienia Aplikacji', icon: <SettingsApplicationsIcon sx={{color: 'secondary.main'}} />, active: false, path: '/settings'},
    ],
  },
];


const item = {
  py: '0px',
  px: '3px',
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  color: 'rgba(255, 255, 255, 0.7)',
  py: '1px',
  px: 3,
};


export default function Navigation(props) {
  const { onComponentChange,...other } = props;
  const [categoriesHook, setCategoriesHook] = React.useState(categories);
  const [dasboardActive, setDashboardActive] = React.useState(true);
  
  const toogleActiveCategory = function(id, chId) {
    console.log(id + "   " + chId)
    console.log(categoriesHook)
    for(let i = 0; i < Object.keys(categories).length; i++) {
      setDashboardActive(false);
      for(let j = 0; j < Object.keys(categories[i].children).length; j++) {
        categories[i].children[j].active = false;
        if(categories[i].id === id && categories[i].children[j].id === chId)
          categories[i].children[j].active = true;
      }
    }
    console.log(categories)
    

    setCategoriesHook(categories);
  }  
  
  return (
    <Drawer variant="permanent" {...other}  sx={{borderColor: 'green', }}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 18, color: '#fff' }}>
          <Image src={process.env.PUBLIC_URL + '/logo.png'} />
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <Link to={'/dashboard'}>
            <ListItemButton
                selected={dasboardActive}
                sx={item}
                onClick={() => { props.onComponentChange(`Panel główny`); toogleActiveCategory("dashboard", "dashboard"); setDashboardActive(true) }}
            >
              <ListItemIcon> <DashboardIcon sx={{color: 'secondary.main'}} /> </ListItemIcon>
              <ListItemText>Panel główny</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        {categoriesHook.map(({ id, children }) => (
          <Box key={id} variant="secondary">
            <ListItem sx={{ py: 1, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
                    <ListItem disablePadding key={childId}>
                        <Link to={path}>
                            <ListItemButton
                                selected={active}
                                sx={item}
                                onClick={() => {props.onComponentChange(`${id}: ${childId}`); toogleActiveCategory(id, childId) }}
                            >
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText>{childId}</ListItemText>
                            </ListItemButton>
                        </Link>
                    </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}