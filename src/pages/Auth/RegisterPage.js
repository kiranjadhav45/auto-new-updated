// RegisterPage.js
import React, { useState } from "react";
import UserRegisterComponent from "../../components/auth/UserRegisterComponent";
import BusinessRegisterComponent from "./BusinessRegisterComponent";
import { Row, Col, Container } from "react-bootstrap";
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({})

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
        <Col className="col-15">
          <h2>Login image...</h2>
        </Col>
        <Col
          className="col"
          style={{
            // marginRight: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            minHeight: "100vh",
            paddingRight: 60,
            width: "100%",
            // marginTop: 120,
            alignContent: "center",
          }}
        >
          <div style={{ width: "100%" }} className="rounded p-5 shadow-lg bg-white rounded">
            {step === 1 ? (
              <UserRegisterComponent formData={formData} setFormData={setFormData} onNext={handleUserRegisterNext} />
            ) : (
              <BusinessRegisterComponent formData={formData} setFormData={setFormData} onSubmit={handleBusinessSubmit} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
