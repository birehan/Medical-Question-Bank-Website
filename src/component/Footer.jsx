import React from 'react'
import {Box,Stack, Link} from '@mui/material'

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
    <li><a href="#Home">Home</a></li>
    <li><a href="#About">About</a></li>
    <li><a href="#Questions">Questions</a></li>
    <li><a href="#Testimonials">Testimonials</a></li>
    <li><a href="#Contact">Contact</a></li>
    </ul>
    </div>
    
    <div class="row">
    Copyright © 2022 || Designed By: <a
    target="_blank" 
     href='https://birehan.com'>Birehan Anteneh</a> 
    </div>
    </div>
    </footer>
  )
}

export default Footer




