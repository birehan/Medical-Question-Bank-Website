import React, {useState} from 'react'
import {Stack, Box, Typography} from "@mui/material"
import Card from '@mui/material/Card';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const QuestionQuizCard = ({question, index}) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [radioDisabled, setRadioDisabled] = useState(false);

    const handleChange= (e) =>{
        if(selectedValue){
            return
        }
       setSelectedValue(e.target.value);
    }

 

  return (
   <Card>
     <Stack sx={{background:'white', padding:"30px 15px 30px 30px", borderRadius:'10px'}}>
        <Typography sx={{fontWeight:'bold', mb:"10px", fontSize:'22px', fontFamily:'sans-sarif'}}>{index+1}. {question?.description}</Typography>
        
     <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedValue}
        name="radio-buttons-group"
        onChange={handleChange}
        
      >
       <Stack sx={{gap:'10px'}}>
       {question?.choices.map((choice)=>{
                let v = ""
                let k = ""
                for (const [key, value] of Object.entries(choice)) {
                    v = value;
                    k = key;
                 }
                return <FormControlLabel
                key={k}
                    className={`question-choice
                    ${selectedValue===k && k !==question.answer ? 'wrong-choice': ""}
                    ${selectedValue!== null && k===question.answer ? 'correct-choice': ""}
                    `}  sx={{p:'7px 15px', border:'1px solid silver', borderRadius:'5px', fontFamily:'sans-sarif',
                color:selectedValue !== null && k !== question.answer? 'rgba(0, 0, 0, 0.38)': 'black'
                }}
                    disabled={selectedValue !== null && k !== question.answer? true:false }
                     value={k} control={<Radio />} 
                label={<Typography  sx={{fontSize:'20px', fontFamily:'sans-sarif'}}>{v}</Typography>} />
                

            })}
       </Stack>
        
      </RadioGroup>
    </FormControl>
    
    </Stack>
   </Card>
  )
}

export default QuestionQuizCard