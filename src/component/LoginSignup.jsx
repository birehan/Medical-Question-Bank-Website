import React, {useEffect} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';
import Signup from './Signup';
import Login from './Login';

const LoginSignup = ({open, setOpen, currentUser, selectedButton, setSelectededButton}) => {
    useEffect(() => {
        if (currentUser && setOpen){
         setOpen(false);
        }
       }, [currentUser])

  return (
     <div>
        <Dialog 
        sx={{color:'silver'}}
        open={open} onClose={()=> setOpen(false)}>
            <DialogTitle sx={{background:"rgba(0, 0, 0, 0.02)"}}>
                <Button 
                onClick={()=>setSelectededButton('login-btn')}
                className='popup-buttons'
                 sx={{
                    background:`${selectedButton==='login-btn' ? "black":"#E6EDf5"}`,
                    color:`${selectedButton==='login-btn' ? "white":"black"}`,
                    fontSize:'1.1rem',
                    borderRadius:'0',
                    padding:{lg:'8px 24px', xs:'8px 16px', md:'8px 20px'},
                    borderTopLeftRadius:'5px',
                    borderBottomLeftRadius:'5px',
                    width:'40%',
                    "&:hover":{
                      background:`${selectedButton==='login-btn' ? "black":"#E6EDf5"}`,
                      color:`${selectedButton==='login-btn' ? "white":"black"}`,
                      
                    }

                }}>Login</Button> 
                <Button
                onClick={()=>(
                 [ setSelectededButton('signup-btn'),<Signup setOpen={setOpen} /> ]
                )}
                className='popup-buttons'
                sx={{
                    background:`${selectedButton==='signup-btn' ? "black":"#E6EDf5"}`,

                    color:`${selectedButton==='signup-btn' ? "white":"black"}`,
                    borderRadius:'0',
                    fontSize:'1.1rem',
                    padding:{lg:'8px 24px', md:'8px 20px', xs:'8px 16px'},
                   
                    borderTopRightRadius:'5px',
                    borderBottomRightRadius:'5px',
                    width:'40%',
                    "&:hover":{
                      background:`${selectedButton==='signup-btn' ? "black":"#E6EDf5"}`,
                      color:`${selectedButton==='signup-btn' ? "white":"black"}`,
                      
                    }
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
            {
                selectedButton === 'login-btn' ? 
                <Login  open={open} />:
                <Signup  open={open} />
            }
        </Dialog>
    </div>
  )
}

export default LoginSignup
