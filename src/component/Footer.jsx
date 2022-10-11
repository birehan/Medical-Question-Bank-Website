import React from 'react'
import {Box} from '@mui/material'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
    <div class="footer">
    <div class="row">
    <a href="#"><i class="fa fa-facebook"></i></a>
    <a href="#"><i class="fa fa-instagram"></i></a>
    <a href="#"><i class="fa fa-telegram"></i></a>
    </div>
    
    <div class="row">
    <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Questions</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Testimonials</a></li>
    <li><a href="#">Contact</a></li>
    </ul>
    </div>
    
    <div class="row">
    Copyright © 2022 || Designed By: <a
    target="_blank" 
     href='birehan.com'>Birehan Anteneh</a> 
    </div>
    </div>
    </footer>
  )
}

export default Footer




