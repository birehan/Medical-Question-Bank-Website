import React, {useState} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, DialogContent, TextField, Stack, Box } from '@mui/material'
import CircularProgress, {
} from '@mui/material/CircularProgress';

import { storage, db} from '../../firebase/firebase.utils';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, getDoc, addDoc,doc } from "firebase/firestore";

import CloseIcon from '@mui/icons-material/Close';
import CourseImg from '../../assets/addcourse.png';

import {connect} from 'react-redux';
import { toastAddCourse } from '../../redux/toast/toast.action';


const AddCourse = ({openAddCourse, setOpenAddCourse, toastAddCourse}) => {
    const [courseTitle, setcourseTitle] = useState('');
    const [courseImage, setCourseImage] = useState(CourseImg);
    const [courseImageName, setcourseImageName] = useState('');
    const [progress, setProgress] = useState(0);
    const [Imagefile, setImagefile] = useState('');


    
    const CoursesCollectionRef = collection(db, "courses");

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
  
    const addCourse = async (e) => {
        e.preventDefault();
        const file = Imagefile;
        const name = courseTitle;
        if (!file || !courseTitle) {
            alert('no image or course name');
            return 
        }

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
                const courseRef = await addDoc(CoursesCollectionRef, 
            { courseName: name, imageUrl: downloadURL });
                  const ref = doc(db, "courses", courseRef.id);
                 const courseSnapShop = await getDoc(ref);
                 console.log("course: ", courseSnapShop); 

              });
          setOpenAddCourse(false);
          setCourseImage(CourseImg);
          setcourseImageName('');
          setcourseTitle('');
          setProgress(0);
          toastAddCourse();

            }
          );
      };   

  return (
    <div>
      <Dialog  open={openAddCourse} onClose={()=> setOpenAddCourse(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'550'}}>Add New Course</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenAddCourse(false)}
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

    
      <form onSubmit={addCourse}>
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
             { progress === 0 ? 'Add Course' : 
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
    toastAddCourse: ()=> dispatch(toastAddCourse())
  })


export default (connect(null, mapDispatchToProps)(AddCourse))