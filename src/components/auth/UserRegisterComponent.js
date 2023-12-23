// UserRegisterComponent.js
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { validateEmail, validatePassword, validateMobileNumber, validateConfirmPassword } from "../../utils/validationUtils"

const UserRegisterComponent = ({ onNext, formData, setFormData }) => {
  const [isValidMobile, setIsValidMobile] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true)
  const handleInput = async (e) => {
    const { name, value } = e.target;
    await setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const { mobile, email, password, confirmPassword } = await formData
    setIsValidPassword(validatePassword(password));
    setIsValidEmail(validateEmail(email));
    setIsValidMobile(validateMobileNumber(mobile));
    setIsValidConfirmPassword(validateConfirmPassword(confirmPassword));
  }
  console.log(formData)
  const handleNext = () => {
    // You can add validation logic here
    onNext();
  };
  console.log(isValidMobile, "isValidMobile")
  return (
    <Form className="text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Pic"
        className="img-fluid rounded-circle mb-5"
      />
      {isValidMobile && isValidMobile == true ? "true" : "false"}
      <FloatingLabel controlId="formName" label="Name">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          name="name"
          onChange={handleInput}
        // value={name}
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
        // value={mobile}
        // onChange={(e) => setMobile(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formEmail" label="Email">
        <Form.Control
          type="email"
          className="mb-3"
          placeholder=" "
          name="email"
          onChange={handleInput}
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formPassword" label="Password">
        <Form.Control
          type="password"
          className="mb-3"
          placeholder=" "
          name="password"
          onChange={handleInput}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formConfirmPassword" label="Confirm Password">
        <Form.Control
          type="password"
          placeholder=" "
          className="mb-3"
          name="confirmPassword"
          onChange={handleInput}
        // value={confirmPassword}
        // onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
  );
};

export default UserRegisterComponent;
