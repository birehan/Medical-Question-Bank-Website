import './header.style.css'

import {connect} from 'react-redux';

import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import MedicalM from '../../assets/medical-m.webp';
import Login from '../Login';

import {Stack, AppBar,
  Button,

  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box} from '@mui/material';
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import DrawerComp from "./Drawer";

const Header = ({currentUser, hidden}) => {
  const [selected, setSelected] = useState('home');
  const [open, setOpen] = useState(false);


  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    setTimeout(()=>{
      setOpen(true)
    }, 5000);
  }, [])
  
  return (
    <React.Fragment>
      <Login open={open} setOpen={setOpen} />
      <AppBar className='header' sx={{
      
        height:{lg:'100px', md:'70px', xs:'70px'}}}>
        
        <Toolbar sx={{width:{lg:"90%",md:'100%', xs:"100%"},margin:'auto'}}>
          <Stack  flexDirection='row'>
        <Box sx={{
          marginTop:{xs:'0', lg:'0'},

                 width:{lg:'90px', sm:'50px', xs:'40px', md:'55px'},
                 height:{lg:'90px',sm:'50px',xs:'40px',  md:"55px"}
              }}>
              <img width='100%'  alt='medical m' src={MedicalM}/>

              </Box>
              <Typography sx={{alignSelf:'center', fontWeight:'bold', color:'white', 
                    fontSize:{lg:'1.6rem', sm:'1.4rem', md:'1.3rem', xs:'1rem'}, 
                    marginBottom:{lg:'-40px', xs:'-20px'}}} variant='span'>edical Question Bank</Typography>
         </Stack>
          {isMatch ? (
            <>
            
              <DrawerComp selected={selected} setSelected={setSelected} />
            </>
          ) : (
            <>
              <Stack  sx={{
          
                gap:{md:'0.7rem', lg:'0.7rem'}, marginBottom:{lg:'-40px', md:'-20px'}, marginLeft:{md:'20px', lg:'40px'}}} flexDirection='row'>
                    <Link
                    onClick={() => {
                      setSelected('home');
                    }} 
                      className={`header-link ${selected=='home'? "selected-link":""}`} to ='/'>
                       <Typography sx={{
                        fontSize:{lg:'1.2rem', md:'1rem'}
                       }} variant='span'>
                       Home
                       </Typography>
                      </Link>
                    <Link 
                      onClick={() => {
                        setSelected('questions');
                      }} 
                     className={`header-link ${selected=='questions'? "selected-link":""}`} to ='/questions'>
                        <Typography sx={{
                        fontSize:{lg:'1.2rem', md:'1rem'}
                       }} variant='span'>
                       Questions
                       </Typography>
                      </Link>
                    <Link
                      onClick={() => {
                        setSelected('about');
                      }} 
                      className={`header-link ${selected=='about'? "selected-link":""}`}  to ='/about'>
                         <Typography sx={{
                        fontSize:{lg:'1.2rem', md:'1rem'}
                       }} variant='span'>
                       About
                       </Typography>
                      </Link>
                    <Link
                      onClick={() => {
                        setSelected('testimonials');
                      }} 
                      className={`header-link ${selected=='testimonials'? "selected-link":""}`}  to ='/testimonials'>
                         <Typography sx={{
                        fontSize:{lg:'1.2rem', md:'1rem'}
                       }} variant='span'>
                       Testimonials
                       </Typography>
                      </Link>
                    <Link 
                      onClick={() => {
                        setSelected('contact');
                      }} 
                     className={`header-link ${selected=='contact'? "selected-link":""}`}  to ='/contact'>
                       <Typography sx={{
                        fontSize:{lg:'1.2rem', md:'1rem'}
                       }} variant='span'>
                       Contact
                       </Typography>
                     </Link>
              </Stack>
           
               <Stack gap='15px' flexDirection='row' sx={{marginTop:{md:"10px", lg:'30px'},  marginLeft: "auto" }} justifyContent='space-around'>
              <Button
              onClick={()=>setOpen(true)}
             className="header-btn show-modal" dataToggle="modal" dataTarget="#myModal"
             sx={{
              color:"black",
              padding:'6px 10px',
              background:'white'
            }}>Login</Button>
            <Button  className='header-btn'  sx={{
              color:"black",
              padding:'6px 10px',
              background:'#ffc107'
            }}
            >SignUp</Button>
        </Stack>
        
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(Header);

