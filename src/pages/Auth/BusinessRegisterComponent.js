// BusinessRegisterComponent.js
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { validateEmail, validateMobileNumber, validateText } from "../../utils/validationUtils"

const BusinessRegisterComponent = ({ onSubmit, formData, setFormData }) => {
  const [isValidBusinessName, setIsValidBusinessName] = useState(true)
  const [isValidBusinessMobile, setIsValidBusinessMobile] = useState(true)
  const [isValidBusinessEmail, setIsValidBusinessEmail] = useState(true)
  const [isValidBusinessAddress, setIsValidBusinessAddress] = useState(true)
  const [isValidBusinessType, setIsValidBusinessType] = useState(true)


  const handleSubmit = (e) => {
    const { businessName, businessMobile, businessEmail, businessAddress, businessType } = formData
    e.preventDefault();
    // You can add validation logic here
    onSubmit();
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(name, value)
    const { password } = formData
    if (name == "businessName") {
      setIsValidBusinessName(validateText(value))
    }
    if (name == "businessMobile") {
      setIsValidBusinessMobile(validateMobileNumber(value))
    }
    if (name == "businessEmail") {
      setIsValidBusinessEmail(validateEmail(value));
    }
    if (name == "businessAddress") {
      setIsValidBusinessAddress(validateText(value));
    }
    if (name == "businessType") {
      setIsValidBusinessType(validateText(password, value));
    }
  }
  return (
    <Form className="text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Pic"
        className="img-fluid rounded-circle mb-5"
      />
      <FloatingLabel controlId="formBusinessType" className={`mb-3 ${isValidBusinessType ? '' : 'has-error'}`} label="Choose Business Type">
        <Form.Control
          as="select"
          // className="mb-3"
          onChange={handleInputChange}
          name="businessType"
        >
          <option value="">Select</option>
          <option value="resto">Restaurant</option>
          <option value="hotel">Hotel</option>
        </Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessName" label="Business Name">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          name="businessName"
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessEmail" label="Business Email">
        <Form.Control
          type="email"
          placeholder=" "
          className="mb-3"
          name="businessEmail"
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessAddress" label="Business Address">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=""
          name="businessAddress"
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="formBusinessContactNumber"
        label="Business Contact Number"
      >
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=""
          name="businessMobile"
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <Button
        variant="info"
        type="submit"
        className="mt-3 w-100"
        onClick={handleSubmit}
      >
        Create My Account
      </Button>
    </Form>
  );
};

export default BusinessRegisterComponent;
