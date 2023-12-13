// LoginPage.js
import React from "react";
import LoginComponent from "../../components/auth/LoginComponent";
import { Container, Row, Col } from "react-bootstrap";

const LoginPage = () => {
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
            marginTop: 120,
            alignContent: "center",
          }}
        >
          <LoginComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
