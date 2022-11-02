import React, {useState} from 'react'
import { DialogContent, Button, IconButton, TextField, 
        FormControl, InputLabel, OutlinedInput, InputAdornment,Typography } from '@mui/material'

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, createUserProfileDocument} from '../firebase/firebase.utils';
import {toast} from '../redux/toast/toast.action'
import { connect } from 'react-redux';

const Signup = ({setOpen, toast}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



  
    const handleSubmit =  async (event) => {
      event.preventDefault();
      if (password !== confirmPassword){
        alert("password don't match");
        return;
      }
      try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfileDocument(user, {displayName});
        setDisplayName('')
        setEmail('');
        setPassword('');
        setConfirmPassword('')
        setOpen(false);
      }
      catch(error){
        // let e = error.message;
        // e = e.replace('Firebase: ', '')
        //   console.log(e);
        toast("Error on the inputs or server.", "error");
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
        

        <Typography sx={{textAlign:'center', fontSize:'1.5rem', fontWeight:'550'}}>Signup Page</Typography>  
    
        <TextField
  autoComplete="off"   
     value={displayName} 
    onChange={(e)=> setDisplayName(e.target.value)}
     sx={{width:'100%' ,marginTop:'20px'}}  id="outlined-basic" label="Username" variant="outlined" />

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
            onChange={(e)=> setPassword(e.target.value)}
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


      
    <FormControl
    autoComplete="off"
     sx={{width:'100%',  m:'0px 0 20px'}} variant="outlined">
          <InputLabel >
            ConfirmPassword
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
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
            marginTop:'30px',
            marginBottom:'10px'
           
        }}>
            Signup
        </Button>


            </DialogContent>
         
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
    toast: (message, error) => dispatch(toast(message, error))
})
export default connect(null, mapDispatchToProps)(Signup)
