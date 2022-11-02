import React, {useState, useEffect} from 'react'
import { Stack, Box, Button, Typography } from '@mui/material'
import AddCourse from '../component/course/AddCourse'

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase.utils';

import CoursesBar from '../component/course/CoursesBar';
import ToastAlert from '../component/ToastAlert';

import {connect} from 'react-redux';
import Loader from '../component/Loader';


const AdminPage = ({toast}) => {
  const [openAddCourse, setOpenAddCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  console.log(courses);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "courses"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCourses(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [])

  

  
  return (
   <Box sx={{width:{lg:'90%', md:'90%', xs:'90%', margin:'50px auto 200px'}}}>
      <AddCourse openAddCourse={openAddCourse} setOpenAddCourse={setOpenAddCourse}/>
      {toast?.openToast ?  <ToastAlert /> :''}    


    <Stack sx={{flexDirection:'row',width:'100%',gap:'10%', position:'relative', alignItems:'center', marginBottom:'50px',
    justifyContent:{lg:'center', md:'center', sm:'center', xs:'left'}
  }}>
    <Typography sx={{fontSize:{lg:"30px", md:'25px', xs:'18px'}, textAlign:'center', fontWeight:'bold'}}>Medical Courses</Typography>
    <Button className='create-course-btn' onClick={()=> setOpenAddCourse(true)} sx={{ 
      background:'#61dafb', color:'black', position:'absolute', right:'20px', padding:{lg:'8px 15px', xs:'6px 12px'}, fontWeight:'bold'}}>Add Course</Button>
    </Stack>

     <Stack
      sx={{
    }}>
   {courses.length?  <CoursesBar courses={courses}/> : <Loader/>}

     
    </Stack>
   </Box>

  )
}

const mapStateToProps = (state) => ({
  toast: state.toast,
})

export default (connect(mapStateToProps, null)(AdminPage))
