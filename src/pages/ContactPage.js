import React, { useRef }  from 'react'
import {Box, Typography,Stack, Button} from '@mui/material';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

import emailjs from '@emailjs/browser';


import './contact.css';
import {toast} from '../redux/toast/toast.action';
import {connect} from 'react-redux';



let theme = createTheme();
theme = responsiveFontSizes(theme);


const ContactPage = ({toast}) => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_uwpfnfa', 'template_hzhsqyy', form.current, 'HEwb4bF2KTC5uNuRZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      toast('Message send Successfully, Thank You.')

  };

  return (
    <Box id="Contact" sx={{ width:{lg:"50%", md:'60%', sm:'80%', xs:'90%'}, margin:{lg:'0px auto 120px', md:'0px auto 100px', xs:'0px auto 100px'},
    borderRadius:'10px'}}>
        <Stack gap='10px' sx={{mb:'20px'}}> 
          <ThemeProvider theme={theme}>
          <Typography variant='h2' sx={{
            textAlign:'center',
            fontWeight:'550'}}>Contact</Typography>
          <Typography sx={{
            textAlign:'center',
            fontSize:{lg:'1.3rem', md:'1.3rem', xs:'1.1rem'},
          }}>Get In Touch With us</Typography>
          </ThemeProvider>
        </Stack>
        
        <Box  sx={{textAlign: "left"}}>
       
        <form className='contact-form' ref={form} onSubmit={sendEmail}>
         <Stack sx= {{flexDirection:{lg:'row', md:'column'}, gap:'20px'}}>
          <input className='input-username' type="text" name="name" placeholder='Username' required/>
          <input className='input-username' type="email" name="email" placeholder='Email' required/>
         </Stack>

          <input className='input-username'   type="subject" name="subject" placeholder='Subject' required/>
          <textarea className='contact-message'  type="text" name="message" rows='5' placeholder='Your Message'required></textarea>
          <Button sx={{width:'200px', margin:'auto', background:"rgb(97, 218, 251)", color:'black', fontSize:'17px', 
          "&:hover":{background:'transparent', color:'black', border:'1px solid black'}}} type="submit" className='btn btn-primary'>Send Message</Button>
        </form>        
        </Box>
      
    </Box>
  )
}

const mapDispatchToProps = (dispatch) =>({
  toast: (message) => dispatch(toast(message))
})
export default connect(null, mapDispatchToProps)(ContactPage)