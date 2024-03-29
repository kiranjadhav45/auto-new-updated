// UserRegisterComponent.js
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { validateEmail, validatePassword, validateMobileNumber, validateConfirmPassword, validateText } from "../../utils/validationUtils"
import { click } from "@testing-library/user-event/dist/click";
import EyeCloseIcon from "../../icons/EyeCloseIcon";
import EyeOpenIcon from "../../icons/EyeOpenIcon";
import { ToastContainer, toast } from 'react-toastify';
import { AlertMessage } from "../../utils/constant"
const UserRegisterComponent = ({ onNext, formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isValidName, setIsValidName] = useState(true)
  const [isValidMobile, setIsValidMobile] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const { password } = formData
    if (name == "name") {
      setIsValidName(validateText(value))
    }
    if (name == "mobile") {
      setIsValidMobile(validateMobileNumber(value))
    }
    if (name == "email") {
      setIsValidEmail(validateEmail(value));
    }
    if (name == "password") {
      setIsValidPassword(validatePassword(value));
    }
    if (name == "confirmPassword") {
      setIsValidConfirmPassword(validateConfirmPassword(password, value));
    }
  }

  const handleNext = (e) => {
    const { name, mobile, email, password, confirmPassword } = formData
    e.preventDefault();
    // You can add validation logic here
    if (isValidName && isValidMobile && isValidEmail && isValidPassword && isValidConfirmPassword) {
      if (name.length > 0 && mobile.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
        onNext();
        console.log("clicked")
      } else {
        if (!email.length > 0) {
          setIsValidEmail(false)
        }
        if (!name.length > 0) {
          setIsValidName(false)
        }
        if (!mobile.length > 0) {
          setIsValidMobile(false)
        }
        if (!password.length > 0) {
          setIsValidPassword(false)
        }
        if (!confirmPassword.length > 0) {
          setIsValidConfirmPassword(false)
        }
      }
    }
    if (isValidName == false || isValidMobile == false || isValidEmail == false || isValidPassword == false || isValidConfirmPassword == false) {
      setTimeout(() => {
        toast.error("please fill required field", { AlertMessage });
      }, 100);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />

      <Form className="text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
          className="img-fluid rounded-circle mb-5"
        />
        <FloatingLabel className={`mb-3 ${isValidName ? '' : 'has-error'}`} controlId="formName" label="Name">
          <Form.Control
            type="text"
            // className="mb-3"
            placeholder=" "
            name="name"
            onChange={handleInput}
            value={formData.name}
          // onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="formMobile" className={`mb-3 ${isValidMobile ? '' : 'has-error'}`} label="Mobile">
          <Form.Control
            type="text"
            // className="mb-3"
            placeholder=" "
            name="mobile"
            onChange={handleInput}
            value={formData.mobile}
          // onChange={(e) => setMobile(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel className={`mb-3 ${isValidEmail ? '' : 'has-error'}`} controlId="formEmail" label="Email">
          <Form.Control
            type="email"
            // className="mb-3"
            placeholder=" "
            name="email"
            onChange={handleInput}
            value={formData.email}
          // onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel className={`mb-3 ${isValidPassword ? '' : 'has-error'}`} controlId="formPassword" label="Password">
          <Form.Control
            type={showPassword == true ? "text" : "password"}
            placeholder=" "
            name="password"
            onChange={handleInput}
            value={formData.password}
          />
          <div onClick={() => setShowPassword((prev) => !prev)} className="eyeButton">
            {showPassword == true ? < EyeOpenIcon width={22} height={22} /> : <EyeCloseIcon width={22} height={22} />}
          </div>
        </FloatingLabel>

        <FloatingLabel controlId="formConfirmPassword" className={`mb-3 ${isValidConfirmPassword ? '' : 'has-error'}`} label="Confirm Password">
          <Form.Control
            type={showPassword2 == true ? "text" : "password"}
            placeholder=" "
            // className="mb-3"
            name="confirmPassword"
            onChange={handleInput}
            value={formData.confirmPassword}
          // onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword2((prev) => !prev)} className="eyeButton">
            {showPassword2 == true ? < EyeOpenIcon width={22} height={22} /> : <EyeCloseIcon width={22} height={22} />}
          </div>
        </FloatingLabel>
        <Button
          variant="info"
          type="submit"
          className="mt-3 w-100"
          onClick={handleNext}
        >
          Create Account
        </Button>
      </Form>
    </>
  );
};

export default UserRegisterComponent;
