// LoginPage.js
import React from "react";
import LoginComponent from "../../components/auth/LoginComponent";
import { Container, Row, Col } from "react-bootstrap";

const LoginPage = () => {
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
            padding: 60,
            // marginTop: 120,
            alignContent: "center",
          }}
        >
          <div className="rounded p-5 shadow-lg bg-white rounded">
            <LoginComponent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
