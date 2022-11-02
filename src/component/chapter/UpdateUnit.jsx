
import React, {useState, useEffect} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, 
        DialogContent, TextField, Stack, Box, TextareaAutosize } from '@mui/material'


import {db} from '../../firebase/firebase.utils';
import { collection, getDoc, addDoc,doc, updateDoc } from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';

import {connect} from 'react-redux';
import { toastUpdateUnit } from '../../redux/toast/toast.action';
import {useParams} from 'react-router-dom';
import {setSelectedUnit} from '../../redux/course/course.action';

const UpdateUnit = ({openUpdateUnit, setOpenUpdateUnit, toastUpdateUnit, unit, setSelectedUnit}) => {
    console.log(unit);

    const [title, setTitle] = useState(unit.title);
    const [description, setDescription] = useState(unit.description);
    const {courseId} = useParams();

    useEffect(() => {
      setTitle(unit.title)
      setDescription(unit.description);
    }, [unit])
    

 
  
    const updateUnit = async (e) => {
        e.preventDefault();
       
        if (!title || !description) {
            alert('no title or description');
            return 
        }
        if(title===unit.title && description === unit.description){
            alert('No changes have been made.');
            return
        }
        // const courseRef = doc(db, 'courses', courseId);
        // const snapshot = await getDoc(courseRef);
        // if (!snapshot.exists()){
        //     alert('The course with the given id does not exist.')
        //     return 
        // }
      
        const unitDoc = doc(db, `courses/${courseId}/units`, unit.id);

        const ref = await updateDoc(unitDoc, {title:title, description:description});   
        const Unitref = doc(db, `courses/${courseId}/units`, unit.id);
        const courseSnapShop = await getDoc(Unitref);
        setSelectedUnit({id:unit.id, ...courseSnapShop.data()})
        setOpenUpdateUnit();
        toastUpdateUnit();

       
        
       
      };   

  return (
    <div>
      <Dialog  open={openUpdateUnit} onClose={()=> setOpenUpdateUnit(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'600'}}>Update Unit</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenUpdateUnit(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'200px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >
        
      
    
      <form onSubmit={updateUnit}>

    
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
            Update Unit
          </Button>
      </form>

              </DialogContent>

      </Dialog>
  </div>
    )
  }

  const mapStateToProps = (state) => ({
    unit: state.course.selectedUnit,
  })
  
 
  const mapDispatchToProps = dispatch => ({
    toastUpdateUnit: ()=> dispatch(toastUpdateUnit()),
    setSelectedUnit: unit => dispatch(setSelectedUnit(unit))


  })

  


export default (connect(mapStateToProps, mapDispatchToProps)(UpdateUnit))
