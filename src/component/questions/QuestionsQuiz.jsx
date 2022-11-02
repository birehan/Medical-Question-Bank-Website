import React, {useState} from 'react';
import {Box, Stack} from '@mui/material'
import QuestionQuizCard from './QuestionQuizCard';

const QuestionsQuiz = ({questions}) => {
    let questionsList = [];
    for (const [key, value] of Object.entries(questions)) {
        questionsList = value;
     }
  return (
    <Stack sx={{ margin:'20px auto',borderRadius:'10px', gap:'30px', width:{lg:'70%', xs:'60%', md:'90%', xs:'100%'}}}>

      {questionsList?.map((question, index)=> {

        return <QuestionQuizCard key={index} question={question} index={index}/>
      })}
    </Stack>
  )
}

export default QuestionsQuiz
