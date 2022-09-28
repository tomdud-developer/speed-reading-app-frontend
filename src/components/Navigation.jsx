import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { Link } from "react-router-dom";
import Image from 'mui-image'


let categories = [
  {
    id: 'Sprawy',
    children: [
      {id: 'Formularz', icon: <PeopleIcon />, active: false, path: '/case-form'},
      { id: 'Baza danych', icon: <DnsRoundedIcon />, active: false, path: '/case-table' },
      { id: 'Generator oferty', icon: <PhonelinkSetupIcon />, active: false, path: '/offer-generator' },
    ],
  },
  {
    id: 'Firmy',
    children: [
      {id: 'Formularz', icon: <PeopleIcon />, active: false, path: '/company-form'},
      { id: 'Baza danych', icon: <DnsRoundedIcon />, active: false, path: '/company-table' },
    ],
  },
  {
    id: 'Kontakty',
    children: [
      {id: 'Formularz', icon: <PeopleIcon />, active: false, active: false, path: '/worker-form'},
      { id: 'Baza danych', icon: <DnsRoundedIcon />, active: false, path: '/worker-table' },
    ],
  },
];


const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};


export default function Navigation(props) {
  const { onComponentChange,...other } = props;
  const [categoriesHook, setCategoriesHook] = React.useState(categories);
  const [dasboardActive, setDashboardActive] = React.useState(true);
  
  const toogleActiveCategory = function(id, chId) {
    console.log(id + "   " + chId)
    console.log(categoriesHook)
    //let copy =  JSON.parse(JSON.stringify(categories));
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
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
        <Image src={process.env.PUBLIC_URL + '/img/logo_planetfan.png'} />
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <Link to={'/dashboard'}>
            <ListItemButton selected={dasboardActive} sx={item} onClick={() => { props.onComponentChange(`Panel główny`); toogleActiveCategory("dashboard", "dashboard"); setDashboardActive(true) }}>
              <ListItemIcon> <HomeIcon /> </ListItemIcon>
              <ListItemText>Panel główny</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        {categoriesHook.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, path }) => (
                    <ListItem disablePadding key={childId}>
                        <Link to={path}>
                            <ListItemButton selected={active} sx={item} onClick={() => {props.onComponentChange(`${id}: ${childId}`); toogleActiveCategory(id, childId) }}>
                                <ListItemIcon >{icon}</ListItemIcon>
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