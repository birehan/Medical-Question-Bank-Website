import React from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, DialogContent} from '@mui/material'

import { storage, db} from '../../firebase/firebase.utils';
import { ref,deleteObject } from "firebase/storage";
import { doc, deleteDoc} from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';


import {connect} from 'react-redux';
import { toastDeleteCourse } from '../../redux/toast/toast.action';

const extractFileName = (fileURL) => {
  const fSlashes = fileURL.split('/');
  const fQuery = fSlashes[fSlashes.length - 1].split('?');
  const segments = fQuery[0].split('%2F');
  const fileName = segments.join('/');
  return fileName;
}


const DeleteCourse = ({openDeleteCourse, setOpenDeleteCourse,course,toastDeleteCourse }) => {

   
    const deleteCourse = async () => {
        // const fileName = extractFileName(course.imageUrl);
        // const desertRef = ref(storage, fileName);
  
        // deleteObject(desertRef).then(()=>{
        //   //Success
        //   console.log('deleted successfully')
        // }).catch((error)=> {
        //   //error
        //   console.log('delete error: ', error)
        // })
      
        const courseDoc = doc(db, 'courses', course.id);

        await deleteDoc(courseDoc);
        setOpenDeleteCourse(false);
        toastDeleteCourse();

        


      };   

  return (
    <div>
      <Dialog  open={openDeleteCourse} onClose={()=> setOpenDeleteCourse(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:{lg:'18px', xs:'15px'}, fontWeight:'550',}}>Delete Course {course.courseName}</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenDeleteCourse(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'250px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >

        <Typography sx={{color:'red'}}>
          Are you sure to delete this course.
          Note the units and questions under this course also will be deleted.
        </Typography>
        
     
    
  <Button
          onClick={deleteCourse}
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
             Delete Course
          </Button>

              </DialogContent>

      </Dialog>
  </div>
    )
  }


  const mapDispatchToProps = dispatch => ({
    toastDeleteCourse: ()=> dispatch(toastDeleteCourse())
  })


export default (connect(null, mapDispatchToProps)(DeleteCourse))
