import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import { db } from '../firebase/firebase.utils';
import {doc, getDoc} from 'firebase/firestore'
import { collection, onSnapshot } from "firebase/firestore";


import Loader from '../component/Loader';
import {Box, Stack, Typography, Button} from '@mui/material'
import AddUnit from '../component/chapter/AddUnit';
import ToastAlert from '../component/ToastAlert';
import { connect } from 'react-redux';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import UnitCard from '../component/chapter/UnitCard';

import {setCourse, setUnits, setSelectedUnit} from '../redux/course/course.action';
import Error404Page from './Error404Page';
import CoursesBar from '../component/course/CoursesBar';

const CoursePage = ({toast, course, setCourse, setUnits, setSelectedUnit}) => {
  // const {courseDetail, units, selectedUnit} = course;
  const {courseId} = useParams();
  const [openAddUnit, setOpenAddUnit] = useState(false);


    useEffect(() => {
      const fetchCourse = async () =>{
        const courseRef = doc(db, 'courses', courseId);
        const snapshot = await getDoc(courseRef);
        if (snapshot.exists()){
            setCourse({...snapshot.data(), id:courseId});
        }
       else{
        setCourse("Error");
       }
      }
      fetchCourse();

      const unsub = onSnapshot(
        collection(db, `courses/${courseId}/units`),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
          
            list.push({ id: doc.id, ...doc.data() });
          });
          setUnits(list);
          if (course?.selectedUnit === null && list.length > 0){
            setSelectedUnit(list[0]);
          }
        },
        (error) => {
          console.log(error);
        }
      );

     
  
      return () => {
        unsub();
      };


    }, [])

   

if (!course?.courseDetail || !course?.units?.length){
    return <Loader/>
}



  return (
    <Stack
    
     sx={{width:{lg:'90%', md:'90%', xs:'90%', margin:'150px auto 200px'}}}>
     <AddUnit openAddUnit={openAddUnit} setOpenAddUnit={setOpenAddUnit}/>
      {toast?.openToast ?  <ToastAlert /> :''}
      {/* {courseId}
      {course?.courseDetail} */}

      <Stack sx={{flexDirection:'row',width:'100%',gap:'10%', position:'relative', alignItems:'center', marginBottom:'50px',
    justifyContent:{lg:'center', md:'center', sm:'center', xs:'left'}
  }}>
    <Typography sx={{fontSize:{lg:"30px", md:'25px', xs:'18px'}, textAlign:'center', fontWeight:'bold'}}>{course?.courseDetail?.courseName}</Typography>
    <Button className='create-course-btn' onClick={()=> setOpenAddUnit(true)} sx={{ 
      background:'#61dafb', color:'black', position:'absolute', right:'20px', padding:{lg:'8px 15px', xs:'6px 12px'}, fontWeight:'bold'}}>Add Unit</Button>
    </Stack>
    {
      course?.units?.length ? 
      <Stack sx={{width:{xs:'80%', md:'50%', lg:'40%'}, justifyContent:'center' , margin:'auto'}}>
        <InputLabel sx={{marginBottom:'5px'}} id="demo-simple-select-label">Select a unit</InputLabel>
        <Select
        displayEmpty={true}  
        className='unit-drop-down'
      sx={{border:'none', width:'100%'}}

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value= {course?.selectedUnit?.id || course?.units[0]?.id}
          defaultValue={course?.selectedUnit?.id || course?.units[0]?.id}
        >
         {course?.units?.map((unit)=> {
          return ( <MenuItem
          onClick={()=>setSelectedUnit(unit)}
           key={unit.id} value={unit.id}>
            {unit.title}
          </MenuItem>)
         })}
        </Select>
    </Stack>
      : <Typography sx={{textAlign:'center', fontSize:'1.5rem'}}>No units added yet.</Typography>
    }
    {course?.selectedUnit ? <UnitCard/>
    :''}

    </Stack>
  )
}

const mapStateToProps = (state) => ({
  toast: state.toast,
  course: state.course,
})

const mapDispatchToProps = (dispatch) => ({
  setCourse: course => dispatch(setCourse(course)),
  setUnits: units => dispatch(setUnits(units)),
  setSelectedUnit: unit => dispatch(setSelectedUnit(unit))
})


export default (connect(mapStateToProps, mapDispatchToProps)(CoursePage))
