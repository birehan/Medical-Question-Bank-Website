import React from 'react'

import {Box, Typography,Stack} from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider,  } from '@mui/material/styles';
import HorizontalScrollbar from '../component/HorizontalScrollbar.jsx'


let theme = createTheme();
theme = responsiveFontSizes(theme);

const QuestionsPage = () => {
  return (
    <Box id="Questions"  sx={{ width:{lg:"80%", md:'85%', xs:'90%'}, margin:{lg:'60px auto', md:'50px auto', xs:'20px auto', sm:'40px'},
     borderRadius:'10px'}}>
      <Stack gap='10px' sx={{mb:'20px'}}> 
          <ThemeProvider theme={theme}>
          <Typography variant='h2' sx={{
            textAlign:'center',
            fontWeight:'550'

          }}>Questions</Typography>
          <Typography sx={{
            textAlign:'center',
            fontSize:'1.3rem'
          }}>Select A Course To Do The Questions</Typography>
          </ThemeProvider>
        </Stack>
        <HorizontalScrollbar/>
      
    </Box>
  )
}


export default QuestionsPage
