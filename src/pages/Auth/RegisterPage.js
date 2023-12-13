// RegisterPage.js
import React, { useState } from "react";
import UserRegisterComponent from "../../components/auth/UserRegisterComponent";
import BusinessRegisterComponent from "./BusinessRegisterComponent";
import { Row, Col, Container } from "react-bootstrap";
const RegisterPage = () => {
  const [step, setStep] = useState(1);

  const handleUserRegisterNext = () => {
    setStep(2);
  };

  const handleBusinessSubmit = () => {
    // Implement logic to submit business registration data
    alert("Business Registration Submitted!");
  };
  return (
    <Container fluid>
      <Row>
        <Col className="col-18">
          <h2>Login image...</h2>
        </Col>
        <Col
          className="col  rounded p-5 shadow-lg bg-white rounded"
          style={{
            margin: 20,
            padding: 60,
            marginTop: 50,
            alignContent: "center",
          }}
        >
          {step === 1 ? (
            <UserRegisterComponent onNext={handleUserRegisterNext} />
          ) : (
            <BusinessRegisterComponent onSubmit={handleBusinessSubmit} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
