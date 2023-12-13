// UserRegisterComponent.js
import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const UserRegisterComponent = ({ onNext }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNext = () => {
    // You can add validation logic here
    onNext();
  };

  return (
    <Form className="text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Pic"
        className="img-fluid rounded-circle mb-5"
      />

      <FloatingLabel controlId="formName" label="Name">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formMobile" label="Mobile">
        <Form.Control
          type="text"
          className="mb-3"
          placeholder=" "
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formEmail" label="Email">
        <Form.Control
          type="email"
          className="mb-3"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formPassword" label="Password">
        <Form.Control
          type="password"
          className="mb-3"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel controlId="formConfirmPassword" label="Confirm Password">
        <Form.Control
          type="password"
          placeholder=" "
          className="mb-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
