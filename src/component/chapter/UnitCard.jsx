import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Stack, Divider} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import UpdateUnit from './UpdateUnit';
import DeleteUnit from './DeleteUnit';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import QuestionsQuiz from '../questions/QuestionsQuiz';


import AddQuestion from '../questions/AddQuestion';


const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

const UnitCard = ({selectedUnit}) => {
  const [openUpdateUnit, setOpenUpdateUnit] = useState(false);
  const [openDeleteUnit, setOpenDeleteUnit] = useState(false);
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [selectedPart, setSelectedPart] = useState(1);
  const [startQuiz, setStartQuiz] = useState(false);


  const handleChange = (event) => {
    setSelectedPart(event.target.value);
  };




  
  
  return (
    (startQuiz && selectedUnit?.parts?.length) ?
    <QuestionsQuiz questions={selectedUnit.parts[selectedPart-1]} />
    
    
    : 

    <Card sx={{ width:{lg:'400px', md:"350px", sm:'320px', xs:'290px'}, alignSelf:'center', margin:'50px auto 0',
    pb:'20px'
     }}>
      {
        setOpenUpdateUnit? <UpdateUnit openUpdateUnit={openUpdateUnit} setOpenUpdateUnit={setOpenUpdateUnit} />: ""
      }
       {
        setOpenDeleteUnit?  <DeleteUnit openDeleteUnit={openDeleteUnit} setOpenDeleteUnit={setOpenDeleteUnit} /> : ""
      }

{
        setOpenAddQuestion?  <AddQuestion openAddQuestion={openAddQuestion} setOpenAddQuestion={setOpenAddQuestion} />: ""
      } 
    <CardContent sx={{}}>
      
      <Stack sx={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Typography variant="h5" component="div" sx={{ mb: 1 }} >
        {selectedUnit?.title}
      </Typography>

      <Stack sx={{flexDirection:'row', gap:'10px', position:'relative'}}>
       <EditIcon onClick={()=> setOpenUpdateUnit(true)} className='edit-unit' sx={{color:'#1976d2', fontSize:'1.6rem'}}/>
       <div className='edit-hidden'>Edit</div>
      <DeleteIcon onClick={()=> setOpenDeleteUnit(true)} className='delete-unit' sx={{color:'red', fontSize:'1.6rem'}} />
      <div className='delete-hidden'>delete</div>

      
      </Stack>

      </Stack>
      <hr/>
      <Typography sx={{ mb: 1.5, wordWrap: 'break-word'}} color="text.secondary">
        {selectedUnit?.description}
      </Typography>

      <Stack flexDirection="column" sx={{alignItems:'left',justifyContent:'space-between' }}>
        {
          selectedUnit?.parts ? 
          <Stack flexDirection='row' gap='20px' sx={{alignItems:'center',}}>
            <Typography sx={{ml: 1}}>Select Part :</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">Part</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedPart}
            onChange={handleChange}
            autoWidth
            label="Age"
          >

            {selectedUnit?.parts?.map((part, index)=>{
            return <MenuItem divider='true' sx={{padding:'10px 25px'}} value={index+1}>{   index+1   }  </MenuItem>

            }) }

           
          </Select>
        </FormControl>
            </Stack>
          :<Typography>No questions yet.</Typography>
        }
      </Stack>
      {selectedUnit?.parts?.length ?
       <Stack flexDirection='row' gap="20px" sx={{mt:'20px'}}>
       <Button sx={{background:"", fontSize:'1rem'}} ><EditIcon sx={{marginRight:'10px'}}/>Edit</Button>
       <Button  sx={{color:'red', fontSize:'1rem'}}><DeleteIcon sx={{marginRight:'10px'}}/>Delete</Button>

      </Stack>: "" }
     
      <hr/>

      <Button sx={{display:'flex', justifyContent:'center', textAlign:'center', margin:'auto', background:'#ffc107', color:'black', fontWeight:'bold', width:'60%'}} 
      onClick={()=> setOpenAddQuestion(true)} size="large" >Add Question</Button>  

    </CardContent>
    <CardActions>
      <Button onClick={()=> setStartQuiz(true)}
      size="large" sx={{margin:'auto', background:'#61dafb', color:'black', fontWeight:'bold', width:'60%'}}>Start</Button>
    </CardActions>
  </Card>
  )
}


const mapStateToProps = (state) => ({
  selectedUnit: state.course.selectedUnit,
})



export default (connect(mapStateToProps, null)(UnitCard))