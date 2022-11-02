import React, {useState, useEffect} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, 
        DialogContent, TextField, Stack, Box, TextareaAutosize } from '@mui/material'

import { connect } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { GolfCourse } from '@mui/icons-material';

const PreviewQuestions = ({previewQuestions, setPreviewQuestions, extractedQuestions, selectedUnit}) => {
  return (
    <div>
        <Dialog  open={previewQuestions} onClose={()=> setPreviewQuestions(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'600'}}>{selectedUnit?.title}</Typography> 
            <Typography sx={{textAlign:'left', fontSize:'18px', fontWeight:'600'}}>Part : {selectedUnit?.parts?.length+1 || 1}</Typography>           

            <IconButton aria-label="close" onClick={()=>setPreviewQuestions(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'550px', md:'400px', xs:'250px'},
                maxWidth:{lg:'750px', md:'500px', sm:'350px', xs:'300px'} }}  >
        
      

    {extractedQuestions.map((question, index)=>{
        return (<Box sx={{margin:'20px auto'}}>
            <Typography sx={{fontFamily:'sans-sarif', fontWeight:'bold'}}>
            <Typography variant='span' sx={{fontFamily:'sans-sarif', fontWeight:'bold'}}>{index+1}. </Typography> {question.description}
            </Typography>
            {
                question.choices.map((choice, index)=>{
                    let k = ""
                    let v = ""
                    for (const [key, value] of Object.entries(choice)) {
                         k = key;
                         v = value;
                      }
                    return(<Box sx={{fontFamily:'sans-sarif', fontWeight:'normal', textTransform:'',
                    background: k === question.answer ? 'green': 'white'
                    }}>
                        {k}) {v}
                    </Box>)
                })
            }
            </Box>)
    })}



    
     

  <Button
  onClick={()=>setPreviewQuestions(false)}
          className='login-submit' sx={{

              background:'black',
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
            Close
          </Button>

              </DialogContent>

      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
    selectedUnit: state.course.selectedUnit
})
export default connect(mapStateToProps, null)(PreviewQuestions)