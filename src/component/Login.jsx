import React, {useState} from 'react'
import { DialogContent,
        DialogActions, Button, IconButton, TextField, 
        FormControl, InputLabel, OutlinedInput, InputAdornment,
        Typography, Divider } from '@mui/material'

import { useTheme } from '@mui/material/styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from '@mui/icons-material/Google';

import {signInWithEmailAndPassword} from 'firebase/auth'
import { signInWithGoogle, auth } from '../firebase/firebase.utils';

const Login = ({setOpen}) => {


    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit =  async (event) => {
      event.preventDefault();
      try{
          await signInWithEmailAndPassword(auth, email, password);
          setEmail('');
          setPassword('');
          setOpen(false);
      }
      catch(error){
          console.log(error);
      }

    };

  return (
    <div>
            <DialogContent
            sx={{
                
                minWidth:{lg:'350px', md:'350px', xs:'300px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'}
            }}
             >
        

        <Typography sx={{textAlign:'center', fontSize:'1.5rem', fontWeight:'550'}}>Login Page</Typography>  
    <TextField
  autoComplete="off"   
     value={email} 
    onChange={(e)=> setEmail(e.target.value)}
     sx={{width:'100%' ,marginTop:'20px'}}  id="outlined-basic" label="Email" variant="outlined" />

    
    <FormControl
    autoComplete="off"
     sx={{width:'100%',  m:'20px 0'}} variant="outlined">
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
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
    </FormControl>

        <Button
        onClick={handleSubmit}
         className='login-submit' sx={{

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
            <Button
            onClick={signInWithGoogle} 
            className='login-submit'
            sx = {{
            background:'#4285f4',
            width:'92%',
            color:'white',
            fontSize:'1rem',
            fontWeight:'bold',
            textAlign:'center',
            margin:'auto',
            display:'block',
            marginBottom:'20px' }}>
 <GoogleIcon sx={{height:'20px', paddingBottom:'5px'}}></GoogleIcon> Login With Goolge 
</Button>
            </DialogActions>

    </div>
  )
}

export default Login
