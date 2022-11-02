import React from 'react'
import {Box, Stack, Typography} from '@mui/material'

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import QuoteMark from '../assets/quote.svg';
import HomeImg from '../assets/home-img.webp'




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
    name: 'Melat Tamiru',
    quote:'This is a good initiative. It will definitely help a lot of medical students for years to come.'
  },
  {
    id:2,
    icon:QuoteMark,
    name: 'Aleb Girmachew',
    quote:'To be honest, I’m really impressed by how relatable the questions are. I hope to see more of them in the future. Great job.'
  },
  {
    id:3,
    icon:QuoteMark,
    name: 'Bereket Sisay',
    quote:'Well done guys! I was thinking recently how to develop my habit of doing questions and this website looks promising.'
  },
  {
    id:4,
    icon:QuoteMark,
    name: 'Yodit Berhanu',
    quote:'I like that the questions are more challenging rather just being easy like other websites.'
  },
]

const TestimonialsPage = () => {
  return (
    <Box id='Testimonials' sx={{ width:{lg:"80%", md:'85%', xs:'90%'}, margin:'0px auto 0px',
    minHeight:'400px', padding:"30px 20px", borderRadius:'10px',  }}>
        <Stack gap='10px' sx={{mb:'30px'}}>
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
            gap:{lg:'80px', md:'50px', xs:'50px'},
            justifyContent:{md:'center', lg:'center', xs:'center'}
        }}
         flexDirection='row' flexWrap='wrap'>
          {
            testimonials.map(({id, name, quote, icon}, index)=>
            (
             <Stack
             className='testimonials-card'
             sx={{margin:'',background:'white', padding:"30px", borderRadius:'10px',
             minWidth:'280px', 
             color:'', maxWidth:'300px'
            }}
             gap='20px'
              key={id}>
              <img height='100px' style={{}}  src={icon} alt ='quote'/>
              <Typography sx={{textAlign:'center', minHeight:'100px'}}>{quote}</Typography>
              <Typography sx={{textAlign:'center'}}>{name}</Typography>

            </Stack> 
            ))
          }

        </Stack>
      </Box>
  )
}

export default TestimonialsPage
