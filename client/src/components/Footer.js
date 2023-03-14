import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate("/");
  };
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/medical_question_bank_et"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://t.me/+HonxuA44U_IxY2Jk"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa fa-telegram"></i>
          </a>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="#Home" onClick={handleClick}>
                Home
              </a>
            </li>
            <li>
              <a href="#About" onClick={handleClick}>
                About
              </a>
            </li>
            <li>
              <a href="#Questions" onClick={handleClick}>
                Questions
              </a>
            </li>
            <li>
              <a href="#Testimonials" onClick={handleClick}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#Contact" onClick={handleClick}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="row">
          Copyright © 2022 || Designed By:{" "}
          <a target="_blank" rel="noreferrer" href="https://birehan.com">
            Birehan Anteneh
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
