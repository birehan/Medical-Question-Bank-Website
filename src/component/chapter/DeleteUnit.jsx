import React from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, DialogContent} from '@mui/material'

import { db} from '../../firebase/firebase.utils';
import { doc, deleteDoc} from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';

import {connect} from 'react-redux';
import { toast } from '../../redux/toast/toast.action';
import { setSelectedUnit } from '../../redux/course/course.action';
import {useParams} from 'react-router-dom';

const DeleteUnit = ({openDeleteUnit, setOpenDeleteUnit, unit,units, toast, setSelectedUnit }) => {

    const {courseId} = useParams(); 
    const deleteUnit = async () => {     
    const UnitDoc = doc(db, `courses/${courseId}/units`, unit.id);
    setSelectedUnit(null);
    await deleteDoc(UnitDoc)
    setOpenDeleteUnit(false);
    toast('Unit Deleted Successfully');
  

      };   

 

  return (
    <div>
      <Dialog  open={openDeleteUnit} onClose={()=> setOpenDeleteUnit(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:{lg:'18px', xs:'15px'}, fontWeight:'550',}}>Delete Unit {unit?.title?.slice(0, 20)}</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenDeleteUnit(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'250px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >

        <Typography sx={{color:'red'}}>
          Are you sure to delete this Unit.
          Note the questions under this unit also will be deleted.
        </Typography>
        
     
    
  <Button
          onClick={deleteUnit}
          className='login-submit' sx={{
              background:'Red',
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
             Delete Unit
          </Button>

              </DialogContent>

      </Dialog>
  </div>
    )
  }

  const mapStateToProps = state => ({
    unit: state.course.selectedUnit,
    units: state.course.units
  })
  const mapDispatchToProps = dispatch => ({
    toast: (message)=> dispatch(toast(message)),
    setSelectedUnit: (unit) => dispatch(setSelectedUnit(unit))
  })


export default (connect(mapStateToProps, mapDispatchToProps)(DeleteUnit))
