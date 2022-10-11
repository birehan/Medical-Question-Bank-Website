import React, {useState} from 'react'
import {Dialog, DialogTitle, DialogContent, DialogContentText,
        DialogActions, Button, IconButton, TextField, 
        FormControl, InputLabel, OutlinedInput, InputAdornment,
        Typography, Divider
        
    } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from '@mui/icons-material/Google';

const Login = ({open, setOpen}) => {


    const [selectedButton, setSelectededButton] = useState('login-btn');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
    }
    // const handleMouseDownPassword = (
    //     event: MouseEvent<HTMLButtonElement>
    //   ) => {
    //     event.preventDefault();
    //   };
  return (
    <div>
        <Dialog 
        open={open} onClose={()=> setOpen(false)}>
            <DialogTitle>
                <Button 
                onClick={()=>setSelectededButton('login-btn')}
                className='popup-buttons'
                 sx={{
                    background:`${selectedButton==='login-btn' ? "#ffc107":"#E6EDf5"}`,
                    color:'black',
                    fontSize:'1.1rem',
                    borderRadius:'0',
                    padding:{lg:'8px 24px', xs:'8px 16px', md:'8px 20px'},
                    borderTopLeftRadius:'5px',
                    borderBottomLeftRadius:'5px',
                    width:'40%'


                }}>Login</Button> 
                <Button
                onClick={()=>setSelectededButton('signup-btn')}


                className='popup-buttons'
                sx={{
                    background:`${selectedButton==='signup-btn' ? "#ffc107":"#E6EDf5"}`,

                    color:'black',
                    borderRadius:'0',
                    fontSize:'1.1rem',
                    padding:{lg:'8px 24px', md:'8px 20px', xs:'8px 16px'},
                   
                    borderTopRightRadius:'5px',
                    borderBottomRightRadius:'5px',
                    width:'40%'



                }}>SignUp</Button>              

                <IconButton
          aria-label="close"
          onClick={()=>setOpen(false)}
          sx={{

            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon color='white' />
        </IconButton>
            </DialogTitle>
            <Divider light={false}></Divider>
            <DialogContent
            sx={{
                
                minWidth:{lg:'350px', md:'350px', xs:'300px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'}
            }}
             >
        

        <Typography sx={{textAlign:'center', fontSize:'1.5rem', fontWeight:'550'}}>Login Page</Typography>  
    <TextField sx={{width:'100%' ,marginTop:'20px'}}  id="outlined-basic" label="Email" variant="outlined" />

    
    <FormControl sx={{width:'100%',  m:'20px 0'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=> setShowPassword(!showPassword)}
                //   onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
    </FormControl>

        <Button className='login-submit' sx={{

            background:'black',
            width:'100%',
            color:'white',
            fontSize:'1rem',
            fontWeight:'bold',
            textAlign:'center',
            margin:'auto',
            display:'block',
            marginTop:'40px'
           
        }}>
            Login
        </Button>

<Divider sx={{margin:'20px 0 0px', fontSize:'18px'}}>Or</Divider>



            </DialogContent>
            <DialogActions>
            <Button sx={{

background:'green',
width:'100%',
color:'white',
fontSize:'1rem',
fontWeight:'bold',
textAlign:'center',
margin:'auto',
display:'block',
marginBottom:'20px'

}}>
 <GoogleIcon></GoogleIcon> Login With Goolge
</Button>
            </DialogActions>

        </Dialog>
    </div>
  )
}

export default Login
