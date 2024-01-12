// RegisterPage.js
import React, { useState } from "react";
import { PostApi } from "../../utils/PostApi";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import UserRegisterComponent from "../../components/auth/UserRegisterComponent";
import BusinessRegisterComponent from "./BusinessRegisterComponent";
import { Row, Col, Container } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient, } from '@tanstack/react-query'
import { AlertMessage } from "../../utils/constant"
import { ToastContainer, toast } from 'react-toastify';
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessMobile: "",
    businessEmail: "",
    businessAddress: "",
    businessType: ""
  })
  const navigate = useNavigate();
  const data = {
    "name": "New Name",
    "mobile": "9787123211",
    "email": "newemai1fd11dsdl1@gmail.com",
    "password": "newsecurepasswor",
    "businessName": "XYZ Corporation",
    "businessMobile": "1237124579",
    "businessEmail": "newbusine1sfdadsdssem11ail1@gmail.com",
    "businessAddress": "456 Side Street, Townsville",
    "businessType": "resto"
  }
  const paylosdasd = {
    url: "/v1/register",
    data: formData
  }

  const mutation = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        if (data.status == "success") {
          setTimeout(() => {
            toast.success(data?.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "error") {
          setTimeout(() => {
            toast.error(data?.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "success" && data.statusCode == "200") {
          navigate("/")
        }
      }
    },
  })

  const handleUserRegisterNext = () => {
    setStep(2);
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(paylosdasd)
  };
  return (
    <Container fluid>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
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
            {step === 1 ? (
              <UserRegisterComponent formData={formData} setFormData={setFormData} onNext={handleUserRegisterNext} />
            ) : (
              <BusinessRegisterComponent setStep={setStep} formData={formData} setFormData={setFormData} onSubmit={handleBusinessSubmit} mutation={mutation} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
