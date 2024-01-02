// BusinessRegisterComponent.js
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap"
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { validateEmail, validateMobileNumber, validateText } from "../../utils/validationUtils"
import { IoIosArrowBack } from "react-icons/io";
const BusinessRegisterComponent = ({ onSubmit, formData, setFormData, mutation, setStep }) => {
  const [isValidBusinessName, setIsValidBusinessName] = useState(true)
  const [isValidBusinessMobile, setIsValidBusinessMobile] = useState(true)
  const [isValidBusinessEmail, setIsValidBusinessEmail] = useState(true)
  const [isValidBusinessAddress, setIsValidBusinessAddress] = useState(true)
  const [isValidBusinessType, setIsValidBusinessType] = useState(true)


  const handleSubmit = (e) => {
    const { businessName, businessMobile, businessEmail, businessAddress, businessType } = formData
    e.preventDefault();


    // You can add validation logic here
    if (isValidBusinessName && isValidBusinessMobile && isValidBusinessEmail && isValidBusinessAddress && isValidBusinessType) {
      if (businessName.length > 0 && businessMobile.length > 0 && businessEmail.length > 0 && businessAddress.length > 0 && businessType.length > 0) {
        onSubmit(e);
        console.log("clicked")
      } else {
        if (!businessName.length > 0) {
          setIsValidBusinessName(false)
        }
        if (!businessMobile.length > 0) {
          setIsValidBusinessMobile(false)
        }
        if (!isValidBusinessEmail.length > 0) {
          setIsValidBusinessEmail(false)
        }
        if (!isValidBusinessAddress.length > 0) {
          setIsValidBusinessAddress(false)
        }
        if (!isValidBusinessType.length > 0) {
          setIsValidBusinessType(false)
        }
      }
    }
    // You can add validation logic here

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
          onChange={handleInputChange}
          name="businessType"
          value={formData.businessType}
        >
          <option value="">Select</option>
          <option value="resto">Restaurant</option>
          <option value="hotel">Hotel</option>
        </Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessName" className={`mb-3 ${isValidBusinessName ? '' : 'has-error'}`} label="Business Name">
        <Form.Control
          type="text"
          placeholder=" "
          name="businessName"
          onChange={handleInputChange}
          value={formData.businessName}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessEmail" className={`mb-3 ${isValidBusinessEmail ? '' : 'has-error'}`} label="Business Email">
        <Form.Control
          type="email"
          placeholder=" "
          name="businessEmail"
          value={formData.businessEmail}
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessAddress" className={`mb-3 ${isValidBusinessAddress ? '' : 'has-error'}`} label="Business Address">
        <Form.Control
          type="text"
          placeholder=""
          name="businessAddress"
          value={formData.businessAddress}
          onChange={handleInputChange}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="formBusinessContactNumber"
        label="Business Contact Number"
        className={`mb-3 ${isValidBusinessMobile ? '' : 'has-error'}`}
      >
        <Form.Control
          type="text"
          placeholder=""
          name="businessMobile"
          onChange={handleInputChange}
          value={formData.businessMobile}
        />
      </FloatingLabel>
      <Row>
        <Col style={{ display: "flex", alignItems: "center", justifyContent: "center" }} className="col-2">
          <div onClick={() => setStep(1)} className="back-button">
            <IoIosArrowBack size={22} />
          </div>
        </Col>
        <Col>
          <Button
            variant="info"
            type="submit"
            className="mt-3 w-100"
            onClick={handleSubmit}
            disabled={mutation.isPending == true}
          >
            {mutation.isPending == true ? "Loading" : "Create My Account"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BusinessRegisterComponent;
