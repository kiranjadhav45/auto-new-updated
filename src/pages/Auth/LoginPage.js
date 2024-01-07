// LoginPage.js
import React from "react";
import LoginComponent from "../../components/auth/LoginComponent";
import { Container, Row, Col } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="col-16">
          <h2>Login image...</h2>
        </Col>
        <Col
          className="col"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            minHeight: "100vh",
            paddingRight: 60,
            width: "100%",
            alignContent: "center",
          }}
        >
          <div style={{ width: "100%" }} className="rounded p-5 shadow-lg bg-white rounded">
            <LoginComponent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
