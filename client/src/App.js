import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import LogInPage from "./features/authentication/pages/LoginPage.js";
import SignUpPage from "./features/authentication/pages/SignupPage.js";
import ForgetPasswordPage from "./features/authentication/pages/ForgetPasswordPage";
import LandingPage from "./pages/LandingPage";
import CoursePage from "./pages/CoursePage";
import { useSelector } from "react-redux";
import QuestionsPage from "./features/questionsets/pages/QuestionsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import UnitPage from "./pages/UnitPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import SendMail from "./pages/SendMail";
import EmailSent from "./pages/EmailSent";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  const { currentUser } = useSelector((state) => state.users);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/course/crud" exact element={<CoursePage />} />
        <Route path="/forget-password" exact element={<SendMail />} />
        <Route
          path="/reset-password/:token"
          exact
          element={<ResetPassword />}
        />

        <Route path="/email-sent" exact element={<EmailSent />} />

        <Route path="/unit/crud" exact element={<UnitPage />} />

        <Route path="/questions/crud" exact element={<QuestionsPage />} />
        <Route path="/questions/:id" exact element={<QuizPage />} />

        <Route path="/course/:id" exact element={<CourseDetailPage />} />
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/testimonials" exact element={<HomePage />} />
        <Route path="/contact" exact element={<HomePage />} />

        <Route
          path="/login"
          exact
          element={currentUser ? <Navigate to="/home" /> : <LogInPage />}
        />
        <Route
          path="/signup"
          exact
          element={currentUser ? <Navigate to="/home" /> : <SignUpPage />}
        />
        <Route path="/forgetpassword" exact element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
