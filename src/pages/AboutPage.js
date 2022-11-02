import React from 'react'
import {Box, Typography,Stack, Card, Button} from '@mui/material';
import Med from '../assets/med1_.png';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const AboutPage = () => {
  return (
    <Box id="About"  sx={{ width:{lg:"80%", md:'85%', xs:'90%'}, margin:{lg:'60px auto', md:'50px auto', xs:'20px auto', sm:'40px'},
     borderRadius:'10px'}}>
        <Stack gap='10px' sx={{mb:'20px'}}> 
          <ThemeProvider theme={theme}>
          <Typography variant='h2' sx={{
            textAlign:'center',
            fontWeight:'550'}}>About </Typography>
          <Typography sx={{
            textAlign:'center',
            fontSize:{lg:'1.3rem', md:'1.3rem', xs:'1.1rem'},
          }}>Get To Know More About Us</Typography>
          </ThemeProvider>
        </Stack>

        <Card  sx={{height:{lg:'600px', md:'550px', xs:'500px',
       position: "relative", textAlign: "left", color: "black"}}}>
          <Box sx={{height:{lg:'600px', md:'550px', xs:'500px'}}} >
            <img width='100%' height='100%' style={{objectFit:'cover'}} src={Med} alt='med'/>
          </Box>

         <Stack sx={{width:{xs:'60%', md:"50%"},position: "absolute", bottom:'0',top:'0', left:"50px", margin:'auto', display:'flex', justifyContent:'center'}}>
         <Typography sx={{fontFamily:'sans-serif', fontSize:{sm:'16px', md:'18px', lg:'20px'}, mb:'10px', fontWeight:'bold'}}>
          we are a group of medical students with an initiative to be of help to other medical students out there.
          </Typography>
          <Typography sx={{fontFamily:'sans-serif', fontSize:{sm:'16px', md:'18px', lg:'20px'}, mb:'10px', fontWeight:'bold'}}>
          Our website is currently free of charge and provides organized questions on some of the major courses taken in medical school.
          </Typography>
          <Typography sx={{fontFamily:'sans-serif', fontSize:{sm:'16px', md:'18px', lg:'20px'},mb:'20px', fontWeight:'bold',
        display:{xs:'none', md:'block'} }}>
          we are continuously working to update the website with more valuable questions and files. your suggestions and comments are very well appreciated.
</Typography>
          <Button className='contact-btn' sx={{ background:'#61dafb', color:'black', fontWeight:'bold', fontSize:{xs:'1rem', md:'1.1rem'}, width:{xs:'150x', md:'200px'}, margin:'0 auto'}}><a style={{textDecoration:'none', color:'black'}} href='#Contact'>contact us</a></Button>
         </Stack>
        </Card>
      
      
    </Box>
  )
}

export default AboutPage
