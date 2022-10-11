import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {onSnapshot} from 'firebase/firestore';


import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action'

import {selectCurrentUser} from './redux/user/user.selectors'
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import QuestionsPage from './pages/QuestionsPage';
import AboutPage from './pages/AboutPage';
import Footer from './component/Footer';

import {Box} from '@mui/material';

class App extends React.Component{
constructor(props){
    super(props);
}
  
  unsubscribeFromAuth = null

  componentDidMount(){

    
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
        <Box sx={{ marginTop:'4.4rem'}}>

            <Router>
              <Header/>
             <Routes>
                <Route  path='/' element= {<HomePage/>}/>
                <Route  path='/contact' element= {<ContactPage/>}/>
                <Route  path='/testimonials' element= {<TestimonialsPage/>}/>
                <Route  path='/questions' element= {<QuestionsPage/>}/>
                <Route  path='/about' element= {<AboutPage/>}/>

             </Routes>
             <Footer/>
          </Router> 
        </Box>
        );
  }
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
    mapDispatchToProps)(App);
