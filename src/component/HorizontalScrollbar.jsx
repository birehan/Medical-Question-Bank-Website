import React from 'react'
import {Box} from '@mui/material';

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel, Keyboard } from "swiper";
import CourseCard from './course/CourseCard';
import {connect} from 'react-redux'


import Loader from './Loader';

const HorizontalScrollbar = ({courses}) => {
if (!courses.length) return (<Loader/>)
  return (
        
 <Swiper 
        navigation={true}
        mousewheel={true}
        spaceBetween={30}
        slidesPerView={'auto'}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
      >
        {
         courses.slice(0,6).map((course, index)=>{
          return (<SwiperSlide key={index}>
          {<CourseCard key={index} course={course}/>}
          </SwiperSlide>)
         }) 
        }
     
      </Swiper>
   

  )
}
const mapStateToProps = (state) => ({
    courses: state.course.courses
  })
  

export default connect(mapStateToProps, null)(HorizontalScrollbar)