// LoginComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../../utils/PostApi";
import { jwtDecode } from "jwt-decode";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { validateEmail, validatePassword } from "../../utils/validationUtils"
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const LoginComponent = () => {
  const [show, setShow] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const paylosdasd = {
    url: "/v1/login",
    // data: {
    //   "email": "akashh111111@gmail.com",
    //   "password": "Akash@2151"
    // }
    // data: {
    //   "email": "shop@gmail.com",
    //   "password": "shop@111"
    // }
    data: formData
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.length > 0 && !formData.email.length > 0) {
      setIsValidPassword(false)
      setIsValidEmail(false)
    } else {
      if (isValidEmail == true && isValidPassword == true) {
        mutation.mutate(paylosdasd)
      }
    }
  };
  const mutation = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log(data, "data")
      if (data) {
        setShow(true)
        if (data.statusCode < 400 && data.status == "success") {
          if (data?.access_token) {
            localStorage.setItem("token", data.access_token)
            if (data.body.bundle) {
              localStorage.setItem("bundle", data.body.bundle)
              const decoded = jwtDecode(data.body.bundle);
              if (decoded.bundle[0]) {
                dispatch(updateBusiness(decoded.bundle[0]))
              }
              console.log(decoded?.bundle[0], "decoded")
            }
            navigate("/vendors")
          }
        }
      } else {
        return null
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const { email, password } = formData
    setIsValidPassword(validatePassword(password));
    setIsValidEmail(validateEmail(email));
  };

  // console.log(mutation)
  // console.log(isValidPassword, "isValidPassword")
  // console.log(isValidEmail, "isValidEmail")
  return (
    <>
      <div className="alert-position" >
        {show && (
          <Alert variant="danger" onClose={() => setShow(false)}>
            <p>{mutation.data && mutation.data.message}</p>
          </Alert>
        )}
      </div>
      <Form className="text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
          className="img-fluid rounded-circle mb-5"
        />
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-3 ${isValidEmail ? '' : 'has-error'}`}
        >
          <Form.Control
            // onChange={handleEmailChange}
            onChange={handleInputChange}
            name="email"
            type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className={`mb-3 ${isValidPassword ? '' : 'has-error'}`}>
          <Form.Control
            // onChange={handlePasswordChange} 
            onChange={handleInputChange}
            type="password" name="password" placeholder="Password" />
        </FloatingLabel>
        <Row style={{ marginTop: 10, marginBottom: 10 }}>
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <Button style={{ fontSize: "14px" }} variant="link">Create Account</Button>
            <Button style={{ fontSize: "14px" }} variant="link">Forgot Password</Button>
          </Col>
        </Row>
        <Button
          variant='info'
          type="submit"
          color="white"
          className="mt-3 w-100"
          onClick={handleLogin}
          disabled={mutation.isPending == true}
        >
          {mutation.isPending == true ? "loading" : "Login"}
        </Button>
      </Form>
    </>
  );
};

export default LoginComponent;
