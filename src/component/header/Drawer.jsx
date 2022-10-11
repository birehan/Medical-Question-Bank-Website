import React, { useState } from "react";
import {
  Drawer,IconButton, List, ListItemButton, ListItemIcon, ListItemText,
  Divider, ListItem, Box, Button, Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HomeIcon from '@mui/icons-material/Home';


const pages = [
    {
      name: "Home",
     icon: HomeIcon
    },
     {  name: "Questions",
     icon: HelpIcon
    },
     {
      name: "About",
     icon: InfoIcon
    },
     { 
      name: "Testimonials",
     icon: PeopleIcon},
     {
      name: "Contact",
      icon: RecentActorsIcon
     }
]

function SvgIconsColor({Icon}){
  return (
    <Box sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <Icon />
    </Box>
  );
}

const DrawerComp = ({selected, setSelected}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
      
<List>
        {pages.map((item, index) => (
          <Link onClick={() => {
            setOpenDrawer(!openDrawer);
            setSelected(item.name.toLowerCase());
          }} 
          to={`/${item.name=='Home'? '': item.name.toLowerCase()}`} 
          className= {`drawer-links`} 
          sx={{textDecoration:'none'}}>
          <ListItem
              className= {`${selected==item.name.toLowerCase() ? 'selected': ''}`} 
           key={item.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <SvgIconsColor
               Icon={item.icon}/>
              </ListItemIcon>
              <ListItemText
                primary={item.name} />
            </ListItemButton>
          </ListItem>
      <Divider />
          </Link>

      
        ))}
        <Stack flexDirection='row' sx={{marginTop:'10px'}} justifyContent='space-around'>
        <Button className='header-buttom' sx={{
              color:"white",
              padding:'6px 10px',
              background:'black'
            }}>Login</Button>
            <Button  className='header-buttom'  sx={{
              color:"black",
              padding:'6px 10px',
              background:'#ffc107'
            }}
            >SignUp</Button>
        </Stack>
        
      </List>
     
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;






