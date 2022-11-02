
import React, {useState} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, 
        DialogContent, TextField, Stack, Box, TextareaAutosize } from '@mui/material'


import {db} from '../../firebase/firebase.utils';
import { collection, getDoc, addDoc,doc } from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';

import {connect} from 'react-redux';
import { toastAddUnit } from '../../redux/toast/toast.action';
import {useParams} from 'react-router-dom';


const AddUnit = ({openAddUnit, setOpenAddUnit, toastAddUnit}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {courseId} = useParams();
    
  
    const addUnit = async (e) => {
        e.preventDefault();
       
        if (!title || !description) {
            alert('no title or description');
            return 
        }
      
        const ref = await addDoc(collection(db,  `courses/${courseId}/units`), {
            title: title,
            description:description,
        })
        setOpenAddUnit();
        toastAddUnit();
        setTitle('');
        setDescription('');
       
      };   

  return (
    <div>
      <Dialog  open={openAddUnit} onClose={()=> setOpenAddUnit(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'600'}}>Add new unit</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenAddUnit(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'200px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >
        
      

    
      <form onSubmit={addUnit}>

    
      <TextField
    autoComplete="off"   
      value={title} 
      onChange={(e)=>setTitle(e.target.value)}
      sx={{width:'100%', margin:"auto" ,marginTop:'20px'}}  id="outlined-basic" label="Unit Name" variant="outlined" />

<TextareaAutosize
    value={description}
    onChange={(e)=>setDescription(e.target.value)}

    aria-label="minimum height"
    minRows={3}
    maxLength="100"
    placeholder="Unit description"

  style={{ width:'100%', margin:"auto",marginTop:'20px', padding:'7px'}}
/>
      

  <Button
          type='submit'
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
            Add Unit
          </Button>
      </form>

              </DialogContent>

      </Dialog>
  </div>
    )
  }

 
  const mapDispatchToProps = dispatch => ({
    toastAddUnit: ()=> dispatch(toastAddUnit())
  })



export default (connect(null, mapDispatchToProps)(AddUnit))
