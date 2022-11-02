import React, { useState } from "react";
import {
  Drawer,IconButton, List, ListItemButton, ListItemIcon, ListItemText,
  Divider, ListItem, Box, Button, Stack
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import HelpIcon from '@mui/icons-material/Help';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HomeIcon from '@mui/icons-material/Home';

import { auth } from "../../firebase/firebase.utils";
import { useNavigate } from "react-router-dom";


const pages = [
    {
      name: "Home",
     icon: HomeIcon
    },
    {
      name: "About",
     icon: InfoIcon
    },
     {  name: "Questions",
     icon: HelpIcon
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

const DrawerComp = ({selected, setSelected, currentUser,setSelectededButton, setOpen}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  let navigate = useNavigate();

  const handleChange = () => {
    setOpen(true);
    setSelectededButton('login-btn');
  }


  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
      
<List>
        {pages.map((item, index) => (
          <a href={`#${item.name}`} key={index} onClick={() => {
            setOpenDrawer(!openDrawer);
            navigate('/');               
            setSelected(`#${item.name}`);
          }} 
          className= {`drawer-links`} 
          sx={{textDecoration:'none'}}>
          <ListItem
              className= {`${selected===(`#${item.name}`) ? 'selected': ''}`} 
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
          </a>

      
        ))}
       {
        currentUser ?
        <Stack
        onClick={()=>auth.signOut()}

         flexDirection='row' sx={{marginTop:'10px'}} justifyContent='space-around'>
            <Button  className=''  sx={{
              color:"black",
              padding:'6px 10px',
              background:'#ffc107',
              textTransform: 'capitalize'
            }}
            >Sign Out</Button>
        </Stack>:
        <Stack flexDirection='row' sx={{marginTop:'10px'}} justifyContent='space-around'>
        <Button
        onClick={handleChange}
         className='header-buttom' sx={{
              color:"white",
              padding:'6px 10px',
              background:'black'
            }}>Login</Button>
            <Button  
              onClick={()=>([setOpen(true), setSelectededButton('signup-btn')])}

            className='header-buttom'  sx={{
              color:"black",
              padding:'6px 10px',
              background:'#ffc107'
            }}
            >SignUp</Button>
        </Stack>
       }
        
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






