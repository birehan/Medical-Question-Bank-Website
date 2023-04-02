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
import LandingPage from "./pages/LandingPage";
import CoursePage from "./pages/CoursePage";
import { useSelector } from "react-redux";
import QuestionsPage from "./features/questionsets/pages/QuestionsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import UnitPage from "./pages/UnitPage";
import AboutPage from "./pages/AboutPage";
import QuizPage from "./pages/QuizPage";
import EmailSentSuccess from "./features/authentication/pages/EmailSentSuccess.js";
import ResetPassword from "./features/authentication/pages/ResetPassword";
import SendEmailToReset from "./features/authentication/pages/SendEmailToReset";
import TestimonialPage from "./pages/TestimonialPage";
import ContactPage from "./pages/ContactPage";

import QuestionExtractor from "./features/questionsets/components/QuestionExtractor";

import { useDispatch } from "react-redux";
import { getCourses } from "./features/courses/actions/courses";
import { getAllUnits } from "./features/units/actions/units";
import { getLoggedUser } from "./features/authentication/actions/users";

const App = () => {
  const { courses, units } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const hasFetchedData = localStorage.getItem("hasFetchedData");

  useEffect(() => {
    if (!hasFetchedData || !courses || !units) {
      dispatch(getCourses());
      dispatch(getAllUnits());

      localStorage.setItem("hasFetchedData", true);
      localStorage.setItem("lastFetchedTime", new Date().getTime());
    }
    if (courses && hasFetchedData) {
      const now = new Date().getTime();
      const twentyFourHoursInMs = 1 * 60 * 60 * 1000;
      const lastFetchedTime = localStorage.getItem("lastFetchedTime");

      if (lastFetchedTime && now - lastFetchedTime > twentyFourHoursInMs) {
        dispatch(getCourses());
        dispatch(getAllUnits());
        localStorage.setItem("hasFetchedData", true);
        localStorage.setItem("lastFetchedTime", new Date().getTime());
      }
    }
    if (!currentUser) {
      dispatch(getLoggedUser());
    }
  }, []);

  const { currentUser } = useSelector((state) => state.users);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/course/crud" exact element={<CoursePage />} />
        <Route path="/forget-password" exact element={<SendEmailToReset />} />
        <Route
          path="/reset-password/:token"
          exact
          element={<ResetPassword />}
        />

        <Route path="/email-sent" exact element={<EmailSentSuccess />} />

        <Route path="/unit/crud" exact element={<UnitPage />} />

        <Route path="/questions/crud" exact element={<QuestionsPage />} />
        <Route path="/questions/:id" exact element={<QuizPage />} />

        <Route path="/course/:id" exact element={<CourseDetailPage />} />
        <Route path="/about" exact element={<AboutPage />} />
        <Route path="/testimonials" exact element={<TestimonialPage />} />
        <Route path="/contact" exact element={<ContactPage />} />

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

        <Route path="/extractquestion" exact element={<QuestionExtractor />} />
      </Routes>
    </Router>
  );
};

export default App;
