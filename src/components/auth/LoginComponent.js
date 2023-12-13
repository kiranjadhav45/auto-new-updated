// LoginComponent.js
import React from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";

const LoginComponent = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here
  };

  return (
    <Form className="text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile Pic"
        className="img-fluid rounded-circle mb-5"
      />

      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>

      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col>
          <Button variant="link">Forgot Password</Button>
        </Col>
        <Col>
          <Button variant="link">Create Account</Button>
        </Col>
      </Row>

      <Button
        variant='info'
        type="submit"
        color="white"
        className="mt-3 w-100"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginComponent;
