// RegisterPage.js
import React, { useState } from "react";
import { PostApi } from "../../utils/PostApi";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import UserRegisterComponent from "../../components/auth/UserRegisterComponent";
import BusinessRegisterComponent from "./BusinessRegisterComponent";
import { Row, Col, Container } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient, } from '@tanstack/react-query'
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
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
      console.log(data, "data")
      setShow(true)
      if (data.status == "success" && data.statusCode == "200") {
        navigate("/")
      }
      // if (data) {
      //   setShow(true)
      //   if (data.statusCode < 400 && data.status == "success") {
      //     if (data?.access_token) {
      //       localStorage.setItem("token", data.access_token)
      //       if (data.body.bundle) {
      //         localStorage.setItem("bundle", data.body.bundle)
      //         const decoded = jwtDecode(data.body.bundle);
      //         if (decoded.bundle[0]) {
      //           dispatch(updateBusiness(decoded.bundle[0]))
      //         }
      //         console.log(decoded?.bundle[0], "decoded")
      //       }
      //       navigate("/vendors")
      //     }
      //   }
      // } else {
      //   return null
      // }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })





  const handleUserRegisterNext = () => {
    setStep(2);
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    // if (!formData.email.length > 0 && !formData.email.length > 0) {
    //   setIsValidPassword(false)
    //   setIsValidEmail(false)
    // } else {
    //   if (isValidEmail == true && isValidPassword == true) {
    //   }
    // }
    mutation.mutate(paylosdasd)
    // Implement logic to submit business registration data

    // alert("Business Registration Submitted!");
  };
  return (
    <Container fluid>
      <div className="alert-position" >
        {show && (
          <Alert variant="danger" onClose={() => setShow(false)}>
            <p style={{ textAlign: "center" }}>{mutation.data && mutation.data.message}</p>
          </Alert>
        )}
      </div>
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
              <BusinessRegisterComponent formData={formData} setFormData={setFormData} onSubmit={handleBusinessSubmit} mutation={mutation} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
