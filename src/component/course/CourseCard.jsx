import React, {useState} from 'react'
import {Box, Stack, Typography, Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateCourse from './UpdateCourse';
import DeleteCourse from './DeleteCourse';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';

const CourseCard = ({course, currentUser}) => {
  const [openUpdateCourse, setOpenUpdateCourse] = useState(false)
  const [openDeleteCourse, setOpenDeleteCourse] = useState(false)

  
  return (
    <Card  className='course-card' sx={{width:'300px', color:"black", minHeight: "370px", outline:'none'}}>
    {
      (openUpdateCourse && currentUser?.role==='admin') ?  
       <UpdateCourse openUpdateCourse={openUpdateCourse} setOpenUpdateCourse={setOpenUpdateCourse} course={course} />: ""
    }
     {
      (openDeleteCourse && currentUser?.role==='admin') ?  
       <DeleteCourse openDeleteCourse={openDeleteCourse} setOpenDeleteCourse={setOpenDeleteCourse} course={course} />: ""
    }

    <CardActionArea>
   <Link to={`/${course.id}`}>

      <CardMedia
      className='course-image'
        component="img"
        minWidth="100%"
        image={course.imageUrl}
        alt="green iguana"
        sx={{ objectFit:'fill', height:'330px', minWidth:'100%'}}
      />
      </Link>
      <CardContent sx={{background:'', opacity:'0.9', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column',}}>
   <Link className='course-card'  to={`/admin/${course.id}`}>
 
        <Typography className='course-title' sx={{ color:'black', textTransform:'capitalize', fontSize:'22px', textAlign:'center', fontFamily:"sans-serif"}} gutterBottom variant="h5" component="div">

          {course.courseName}
        </Typography>
   </Link>

   {currentUser?.role==='admin' ? <Stack flexDirection='row'>
        <Button onClick={()=>setOpenUpdateCourse(true)} sx={{background:"", fontSize:'1rem'}} ><EditIcon sx={{marginRight:'10px'}}/>Edit</Button>
        <Button onClick={()=>setOpenDeleteCourse(true)} sx={{color:'red', fontSize:'1rem'}}><DeleteIcon sx={{marginRight:'10px'}}/>Delete</Button>

       </Stack>: ""}


      </CardContent>
    </CardActionArea>
  </Card>

  )
}

const mapStateToProps = (state) =>({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, null)(CourseCard)

