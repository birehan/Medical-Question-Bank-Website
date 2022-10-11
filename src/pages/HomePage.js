import React from 'react'
import {Box, Typography, Stack} from '@mui/material';
import HomeImg from '../assets/home-img.webp'

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import QuoteMark from '../assets/quote.svg';
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import { NearMeDisabledTwoTone } from '@mui/icons-material';

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
const testimonials = [
  {
    id:1,
    icon:QuoteMark,
    name: 'Casey Johnson',
    quote:'This is your Testimonial quote. Give your clients the stage to tell the world how great you are!'
  },
  {
    id:2,
    icon:QuoteMark,
    name: 'Robbie White',
    quote:'This is your Testimonial quote. Give your clients the stage to tell the world how great you are!'
  },
  {
    id:3,
    icon:QuoteMark,
    name: 'Riley Jones',
    quote:'This is your Testimonial quote. Give your clients the stage to tell the world how great you are!'
  },
  {
    id:4,
    icon:QuoteMark,
    name: 'Riley Jones',
    quote:'This is your Testimonial quote. Give your clients the stage to tell the world how great you are!'
  }
]

const HomePage = () => {
  return (
    <Box>
    <Box 
    style={styles.HomeImage} sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:"center",
      justifyContent:"center",


      minHeight: { xs: "400px", md: "500px", lg:'500px' },
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
        <Typography variant='h6' sx={{color:'white',fontWeight:'600', mt:{lg:'70px', xs:'50px'} }}>
        where practice is perfected.
        </Typography>
      </ThemeProvider>

      
      
    </Box>
      <Box sx={{margin:{xs:'100px 20px 0', lg:'100px 30px 0'}}}>
        <Stack gap='10px' sx={{}}> 
          <ThemeProvider theme={theme}>
          <Typography variant='h2' sx={{
            textAlign:'center',
            fontWeight:'550'

          }}>Reviews</Typography>
          <Typography sx={{
            textAlign:'center',
            fontSize:'1.3rem'
          }}>Hear from Former Students and Parents</Typography>
          </ThemeProvider>

        </Stack>
        <Stack  sx={{
          margin:{xs:'100px 0', lg:"100px 0"},
            gap:{lg:'100px', md:'50px', xs:'50px'},
            justifyContent:{md:'center', lg:'center', xs:'center'}
        }}
         flexDirection='row' flexWrap='wrap'>
          {
            testimonials.map(({id, name, quote, icon}, index)=>
            (
             <Stack
             gap='20px'
             width='300px'
              key={id}>
              <img height='100px'  src={icon} alt ='quote'/>
              <Typography sx={{textAlign:'center'}}>{quote}</Typography>
              <Typography sx={{textAlign:'center'}}>{name}</Typography>

            </Stack> 
            ))
          }

        </Stack>
      </Box>
  </Box>
  )
}

export default HomePage


