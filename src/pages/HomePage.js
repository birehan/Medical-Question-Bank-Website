import React, {useState} from 'react'
import {Box, Typography} from '@mui/material';
import HomeImg from '../assets/home-img.webp'
import {connect} from 'react-redux';

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

import TestimonialsPage from './TestimonialsPage';
import AboutPage from './AboutPage'
import QuestionsPage from './QuestionsPage'
import ContactPage from './ContactPage'

import ToastAlert from '../component/ToastAlert'

let theme = createTheme();
theme = responsiveFontSizes(theme);
const styles= {
  HomeImage:{
    backgroundImage: `url(${HomeImg}), linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.3)) `,
    backgroundBlendMode: "overlay",
    backgroundRepeat:'no-repeat',
    backgroundSize:'cover',
  }, 
}


const HomePage = ({openToast}) => {

  return (
  
  <Box

   sx={{overflow:'auto', 
  mt:{lg:'90px', md:'60px', sm:'60px', xs:'50px'}}}>
      {openToast ?  <ToastAlert /> :''}    
    <Box id="Home"   style={styles.HomeImage} sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:"center",
      justifyContent:"center",
      height: { xs: "400px", md: "500px", lg:'500px'},
      width: "100%",
    }}
   >

    <ThemeProvider theme={theme}>
        <Typography
        sx={{
          mt:'50px',
          textAlign:'center',
          color:'white',
          fontWeight:'500',
          fontFamily: ["Dancing Script","cursive"].join(','),          
    
      }} variant="h2">Welcome To Medical</Typography><br/>
        <Typography
        sx={{
          textAlign:'center',
          color:'white',
          fontWeight:'500',
          fontFamily: ["Dancing Script","cursive"].join(','),
    
      }}variant="h2">Question Bank</Typography>
        <Typography variant='h6' sx={{color:'white',fontWeight:'600', mt:{lg:'70px', xs:'50px'}, pb:{xs:'20px', md:'10px'}, fontFamily:'sans-serif'}}>
        where practice is perfected.
        </Typography>
      </ThemeProvider>      
    </Box>
    <AboutPage/>
    <QuestionsPage/>
    <TestimonialsPage/>
    <ContactPage/>
  </Box>
  )
}

const mapStateToProps = (state) => ({
  openToast: state.toast.openToast
})

export default connect(mapStateToProps, null)(HomePage)


