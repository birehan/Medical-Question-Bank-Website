import React, {useState} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, DialogContent, TextField, Stack, Box } from '@mui/material'
import CircularProgress, {
} from '@mui/material/CircularProgress';

import { storage, db} from '../../firebase/firebase.utils';
import { ref, getDownloadURL, uploadBytesResumable,deleteObject } from "firebase/storage";
import {doc, updateDoc } from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';


import {connect} from 'react-redux';
import { toast } from '../../redux/toast/toast.action';



const extractFileName = (fileURL) => {
  const fSlashes = fileURL.split('/');
  const fQuery = fSlashes[fSlashes.length - 1].split('?');
  const segments = fQuery[0].split('%2F');
  const fileName = segments.join('/');
  return fileName;
}


const UpdateCourse = ({openUpdateCourse, setOpenUpdateCourse,course, toast }) => {

    const [courseTitle, setcourseTitle] = useState(course.courseName);
    const [courseImage, setCourseImage] = useState(course.imageUrl);
    const [courseImageName, setcourseImageName] = useState('');
    const [progress, setProgress] = useState(0);
    const [Imagefile, setImagefile] = useState('');


    const handleImageChange = () => {
    let uploadButton = document.getElementById('upload-image');
        let reader =  new FileReader();
          reader.readAsDataURL(uploadButton.files[0]);
          reader.onload = () => {
            setCourseImage(reader.result);
          }
          setcourseImageName(uploadButton.files[0].name);
          setImagefile(uploadButton.files[0]);
    }
  
    const updateCourse = async (e) => {
        e.preventDefault();
        const file = Imagefile;
        const name = courseTitle;
        if(courseImage === course.imageUrl && courseTitle=== course.courseName){
          alert('No change have been made!');
          return 
        }
        if(!courseTitle || !courseImage){
          alert('Invalid image or Course name!');
          return;
        }
        if(courseImage === course.imageUrl){
          const courseDoc = doc(db, 'courses', course.id);
          await updateDoc(courseDoc, {courseName: courseTitle});
          setOpenUpdateCourse(false);
          toast('Course Updated Successfully');

          

          return 
        }
        if(courseImage !== course.imageUrl){
        
      const fileName = extractFileName(course.imageUrl);
      const desertRef = ref(storage, fileName);

      // deleteObject(desertRef).then(()=>{
      //   //Success
      //   console.log('deleted successfully')
      // }).catch((error)=> {
      //   //error
      //   console.log('delete error: ', error)
      // })

        
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              const courseDoc = doc(db, 'courses', course.id);
              await updateDoc(courseDoc, {courseName: courseTitle, imageUrl:downloadURL});
              });
          setOpenUpdateCourse(false);
          toast('Course Updated Successfully');
          
            }
          );
        }

      };   

  return (
    <div>

 

      <Dialog  open={openUpdateCourse} onClose={()=> setOpenUpdateCourse(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'550'}}>Update Course</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenUpdateCourse(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'200px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >
        
        <figure class="course-image-container">
            <img alt='hello' src={courseImage} />
            <figcaption >
              {`${courseImageName.slice(0, 20)} ${courseImageName.length > 20 ? '...': ''}`}
            </figcaption>
        </figure> 

    
      <form onSubmit={updateCourse}>
      <input
      onChange={handleImageChange}
      id='upload-image'  style={{display:'none'}} type="file" className="input" />
      <label
      style={{
        display:' block',
        position:'relative',
        backgroundColor: '#025bee',
        color:'#ffffff',
        textAlign: 'center',
        fontSize: '18px',
        width:'100%',
        padding:'18px 0',
        margin: '60px auto 0',
        cursor: 'pointer',
        borderRadius:'5px'
        }}
      for="upload-image">
      <i className="fas fa-upload"></i> &nbsp;
              Choose A Photo
      </label>
    
      <TextField
    autoComplete="off"   
      value={courseTitle} 
      onChange={(e)=>setcourseTitle(e.target.value)}
      sx={{width:'100%', margin:"auto" ,marginTop:'20px'}}  id="outlined-basic" label="Course Name" variant="outlined" />

  <Button
          // onClick={handleSubmit}
          type='submit'
          className='login-submit' sx={{

              background:'#E6EDf5',
              width:'100%',
              color:'black',
              fontSize:'1rem',
              fontWeight:'bold',
              textAlign:'center',
              margin:'auto',
              display:'block',
              marginTop:'30px',
              marginBottom:'10px'
            
          }}>
             { progress === 0 ? 'Update Course' : 
             <Stack flexDirection='row' sx={{justifyContent:'center', alignItems:'center', gap:'15px'}}>
                <Typography>Uploading</Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
             </Stack>
             }
          </Button>
      </form>

              </DialogContent>

      </Dialog>
  </div>
    )
  }



 
  const mapDispatchToProps = dispatch => ({
    toast: (message)=> dispatch(toast(message))

  })

  


export default (connect(null, mapDispatchToProps)(UpdateCourse))