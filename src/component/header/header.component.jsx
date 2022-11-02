import './header.style.css'

import {connect} from 'react-redux';

import MedicalM from '../../assets/medical-m.webp';
import LoginSignup from '../LoginSignup';
import {Stack, AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme, Box} from '@mui/material';
import { Link } from 'react-router-dom';

import React, { useState, useEffect} from "react";
import DrawerComp from "./Drawer";
import { auth } from '../../firebase/firebase.utils'; 
import { useNavigate } from "react-router-dom";

const Header = ({currentUser, courses}) => {
  
  let navigate = useNavigate();
 
  const [selected, setSelected] = useState('#Home');
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectededButton] = useState('login-btn');
  

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  
  useEffect(() => {
    setTimeout(()=>{
      if (!currentUser){
          setOpen(true);
      }
    }, 10000);
  }, [])

var contact = document.getElementById('Contact');
var home = document.getElementById('Home');
var about = document.getElementById('About');
var testimonials = document.getElementById('Testimonials');
var questions = document.getElementById('Questions');

const pages = ["Home", "About", "Questions", "Testimonials", "Contact"]
const parts = [{"Contact":contact}, {"Home":home}, {"About":about}, {"Testimonials":testimonials}, {"Questions":questions}];

parts.forEach(part => {
  for (const [key, value] of Object.entries(part)) {
    if(value){
      ['mouseover','ontouchstart'].forEach( function(evt) {
        value.addEventListener(evt, () => {
          setSelected(`#${key}`);
      });
    });
    }
 }
 
});

  const handleClick = (page) => {
    navigate('/');               
    setSelected(`#${page}`);
  }

  return (
   <Box x={{miHeight:{lg:'100px', md:'70px', xs:'70px'}}}>
      <AppBar

      sx={{miHeight:{lg:'100px', md:'70px', xs:'70px'}, 
      background: "#20232a",
      position: "fixed",
      display:"block",
      width:"100%",
      top: 0,
      PaddingBottom:"500px",
 }}>
         <LoginSignup selectedButton={selectedButton} setSelectededButton={setSelectededButton} 
                  currentUser={currentUser} open={open} setOpen={setOpen} />
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
              <DrawerComp currentUser={currentUser} selected={selected} setSelected={setSelected} 
                  setOpen={setOpen} setSelectededButton={setSelectededButton}
              />
            </>
          ) : (
            <>
              <Stack  sx={{height:'30px' ,gap:{md:'0.7rem', lg:'1rem'}, marginBottom:{lg:'-50px', md:'-30px'}, marginLeft:{md:'20px', lg:'40px'}}} flexDirection='row'>
                  {
                    pages.map((page, index)=>{
                      if(page==="Questions"){
                        return   <div className='dropdown'>
                          <a key={index} href={`#${page}`} onClick={()=> handleClick(page)} 
                          className={`header-link ${selected=== `#${page}`? "selected-link":""} dropbtn`} >
                           <Typography sx={{fontSize:{lg:'1.2rem', md:'1rem'}}} variant='span'>
                           {page} <i className="fa fa-caret-down"></i>
                           </Typography>
                          </a>
                            <div class="dropdown-content">
                              {courses.length ? 
                              courses.map((course)=> {
                            return  <Link className='dropdown-link' to={`/${course.id}`} key={course?.id} >{course?.courseName}</Link>
                              })
                              
                              :""}
                         


                            
                            </div>
                        </div>
                      }
                      else{
                        return   <a key={index} href={`#${page}`}
                      onClick={()=> handleClick(page)} 
                        className={`header-link ${selected=== `#${page}`? "selected-link":""}`} >
                         <Typography sx={{
                          fontSize:{lg:'1.2rem', md:'1rem'},
                        
                         }} variant='span'>
                         {page}
                         </Typography>
                        </a>
                      }
                      
                     
                    })
                  }
                   
                   
                   
                     {currentUser?.role === 'admin' ? 
                     <Link 
                     onClick={() => {
                       setSelected('admin');
                     }} 
                    className={`header-link ${selected==='admin'? "selected-link":""}`}  to ='/admin'>
                      <Typography sx={{
                       fontSize:{lg:'1.2rem', md:'1rem'}
                      }} variant='span'>
                      Admin
                      </Typography>
                    </Link>: ""}
              </Stack>
           
              {currentUser ?
               <Stack gap='15px' flexDirection='row' sx={{marginTop:{md:"20px", lg:'40px'},  marginLeft: "auto" }} justifyContent='space-around'>
             <Button 
             onClick={()=>auth.signOut()}
              className='header-btn-signout'  
              sx={{
               color:"rgb(97, 218, 251)",
               padding:'6px 10px',
              //  background:'rgb(97, 218, 251)',
               fontSize:'15px',
               fontWeight:'bold',
             }}
            >Sign Out</Button>
         </Stack>
              :
               <Stack gap='15px' flexDirection='row' sx={{marginTop:{md:"10px", lg:'30px'},  marginLeft: "auto" }} justifyContent='space-around'>
               <Button
               onClick={()=>([setOpen(true), setSelectededButton('login-btn')])}
              className="header-btn show-modal" dataToggle="modal" dataTarget="#myModal"
              sx={{
               color:"black",
               padding:'6px 10px',
               background:'white'
             }}>Login</Button>
             <Button 
              onClick={()=>([setOpen(true), setSelectededButton('signup-btn')])}
              className='header-btn'  sx={{
               color:"black",
               padding:'6px 10px',
               background:'#ffc107'
             }}
             >SignUp</Button>
         </Stack>
            }
        
            </>
          )}
        </Toolbar>
      </AppBar>
      </Box>
  );
};
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  courses: state.course.courses
})

export default connect(mapStateToProps,null)(Header);

