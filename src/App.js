import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from './firebase/firebase.utils';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'

import {selectCurrentUser} from './redux/user/user.selectors'
import HomePage from './pages/HomePage';
import Footer from './component/Footer';
import CoursePage from './pages/CoursePage';

import {Box} from '@mui/material';
import AdminPage from './pages/AdminPage';
import Error404Page from './pages/Error404Page';
import { setCourses } from './redux/course/course.action';

const App = ({setCurrentUser, currentUser, setCourses}) => {
  let unsubscribeFromAuth = null
  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (doc) =>{
          setCurrentUser({
            id: doc.id,
             ...doc.data()
          });
       
        }); 
      }
      setCurrentUser(userAuth);
    }); 
    const sortCourses = (courses) => {
      courses.sort((a, b) => {
        let fa = a.courseName.toLowerCase(),
            fb = b.courseName.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    return courses;
    }


    const unsub = onSnapshot( 
      collection(db, "courses")
    ,(snapShot) => {
        let list = [];

        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCourses(sortCourses(list));
      },
      (error) => {
        console.log(error);
      }
    );

  
    return () => {
      unsubscribeFromAuth();
      unsub();
    }
  }, [])
  
    return(
            <Router>
              <Header />
              <Box className='main-body'>
             <Routes>
                <Route  path='/' element= {<HomePage />}/>
                <Route  path='/admin' element= {currentUser?.role === 'admin' ? <AdminPage/>:  <Error404Page/>}/>
                <Route  path='/:courseId'  element={<CoursePage/>} />
             </Routes>
             </Box>
          <Footer/>
          </Router> 
        );

  
      }

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCourses: courses => dispatch(setCourses(courses))

});

export default connect(
  mapStateToProps, 
    mapDispatchToProps)(App);
