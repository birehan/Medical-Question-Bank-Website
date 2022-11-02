import React from 'react'
import {Stack} from '@mui/material'
import CourseCard from './CourseCard'

const CoursesBar = ({courses}) => {
  return (
    <Stack sx={{flexDirection:'row', flexWrap:'wrap', height:'100%', background:'', padding:'20px 10px',gap:{lg:'50px', md:'35px', xs:'30px'}, overflowY:'auto',
     justifyContent:{lg:'center', md:'center', xs:'center'}}}>
   {courses.length !== 0 ? courses.map((course)=>
   (<CourseCard key={course.id} course={course}/>)
   ):''}
  </Stack>
  )
}

export default CoursesBar
