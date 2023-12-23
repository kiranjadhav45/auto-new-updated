// BusinessRegisterComponent.js
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const BusinessRegisterComponent = ({ onSubmit }) => {
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessContactNumber, setBusinessContactNumber] = useState("");

  const handleSubmit = () => {
    // You can add validation logic here
    onSubmit();
  };

  return (
    <Form className="text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Pic"
        className="img-fluid rounded-circle mb-5"
      />
      <FloatingLabel controlId="formBusinessType" label="Choose Business Type">
        <Form.Control
          as="select"
          className="mb-3"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
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
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessEmail" label="Business Email">
        <Form.Control
          type="email"
          placeholder=" "
          className="mb-3"
          value={businessEmail}
          onChange={(e) => setBusinessEmail(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formBusinessAddress" label="Business Address">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="formBusinessContactNumber"
        label="Business Contact Number"
      >
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          value={businessContactNumber}
          onChange={(e) => setBusinessContactNumber(e.target.value)}
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
