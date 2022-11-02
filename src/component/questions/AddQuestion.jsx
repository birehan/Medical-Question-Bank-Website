import React, {useState, useEffect} from 'react'
import {Dialog, DialogTitle,  Button, IconButton, Divider, Typography, 
        DialogContent, TextField, Stack, Box, TextareaAutosize } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

import PreviewQuestions from './PreviewQuestions';

import {db} from '../../firebase/firebase.utils';
import { collection, getDoc, addDoc,doc, updateDoc } from "firebase/firestore";
import { setSelectedUnit } from '../../redux/course/course.action';
import {toast} from '../../redux/toast/toast.action';
import { connect } from 'react-redux';

const AddQuestion = ({openAddQuestion, setOpenAddQuestion, course, setSelectedUnit, toast}) => {
  const {courseDetail, selectedUnit} = course;

  

    const [questions, setquestions] = useState(null);
    const [extractedQuestions, setExtractedQuestion] = useState([]);
    const [previewQuestions, setPreviewQuestions] = useState(false);

    

    const handleChange = async(e) => {
        let files = e.target.files;
            // 
        if(files.length == 0) return;
        const file = files[0];
        let reader = new FileReader();
        reader.onload = (f) => {
            const file = f.target.result;
            const lines = file.split(/\r\n|\n/);
            const res = lines.join('\n');
            setquestions(res);
        };
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    } 

    const extractQuestions = (questions) => {
        const theString = questions.replace(/^\s*$(?:\r\n?|\n)/gm, "");
            const q = theString.split(/[0-9]./)
            const filtered = q.filter((que)=>que.length !== 0)
            let extracted = []
            filtered.forEach(question => {
            const cur = question.split(/[a-zA-Z]\)/);
            const res = {"choices":[]}
            for(let i=0; i < cur.length; i++){
                if (i === 0){
                let d = cur[0].replace(/[\n\t]+/g, "").trim()
                let dec = d.replace(/^\./, "").trim()
                res["description"] = dec
                }
                else if (i === cur.length-1){
                  const last  = cur[i].split(/[A|a]nswer:/);
                  if (last.length !== 2){
                    alert("input file error, check your file");
                    return
                  }
                res["answer"] =  last[1].replace(/[\n\t]+/g, "").trim().toUpperCase();
                const ob = {};
                ob[(String.fromCharCode("A".charCodeAt(0)+res["choices"].length))] = last[0].replace(/[\n\t]+/g, "").replace(/^\./, "").trim()
                res["choices"].push(ob)

                }
                else{
                const ob = {};
                ob[(String.fromCharCode("A".charCodeAt(0)+res["choices"].length))] = cur[i].replace(/[\n\t]+/g, "").trim()
                res["choices"].push(ob)
                }
            }
                extracted.push(res);

            });
            return extracted;
    }
    useEffect(() => {
      if (questions){
        setExtractedQuestion(extractQuestions(questions))
      }
    
    }, [questions])
    

    

    const addQuestion = async() => {
      if(!extractedQuestions.length){
        alert('No questions added');
        return;
      }
      console.log('add question');

      const unitDoc = doc(db, `courses/${courseDetail.id}/units`, selectedUnit.id);
      let part = {}
      const key = selectedUnit?.parts?.length || 1;
      part[key] = extractedQuestions;
      let parts = selectedUnit?.parts || [];

      parts.push(part);


       
      const ref = await updateDoc(unitDoc, {parts:parts});   

      const Unitref = doc(db, `courses/${courseDetail.id}/units`, selectedUnit.id);
      const courseSnapShop = await getDoc(Unitref);
      setSelectedUnit({id:selectedUnit.id, ...courseSnapShop.data()})
      setOpenAddQuestion(false);
      toast('Question added Successfully');


    }

  return (
    <div>
      {
        extractedQuestions?.length ? 
        <PreviewQuestions previewQuestions={previewQuestions} setPreviewQuestions={setPreviewQuestions} extractedQuestions={extractedQuestions} />:
        ""
      }
         <Dialog  open={openAddQuestion} onClose={()=> setOpenAddQuestion(false)}>
        <DialogTitle>
            <Typography sx={{textAlign:'center', fontSize:'18px', fontWeight:'600'}}>Add Questions</Typography>           
            <IconButton aria-label="close" onClick={()=>setOpenAddQuestion(false)}
                         sx={{ position: 'absolute', right: 8, top: 8,}} >
              <CloseIcon color='white' />
            </IconButton>
        </DialogTitle>

        <Divider light={false}></Divider>

        <DialogContent sx={{ alignItems:'center',
                minWidth:{lg:'350px', md:'350px', xs:'200px'},
                maxWidth:{lg:'450px', md:'400px', xs:'350px'} }}  >
        
      

    
     

      <input type="file" onChange={handleChange}/>


    
      {extractedQuestions.length? 
      <Button onClick={()=> setPreviewQuestions(true)} className='preview-Questions' sx={{display:"flex", textAlign:'center', width:'70%', margin:'20px auto', background:'green', color:'white'}}>Preview Questions </Button> 
      : ""}
      

  <Button onClick={addQuestion}
          type='submit'
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
            Add Question
          </Button>
   

              </DialogContent>

      </Dialog>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  course: state.course,
})
const mapDispatchToProps = (dispatch) =>({
  setSelectedUnit: (unit) =>  dispatch(setSelectedUnit(unit)),
  toast: (message) => dispatch(toast(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion)
