// LoginComponent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../../utils/PostApi";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import EyeCloseIcon from "../../icons/EyeCloseIcon";
import EyeOpenIcon from "../../icons/EyeOpenIcon";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { validateEmail, validatePassword } from "../../utils/validationUtils"
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
import { AlertMessage } from "../../utils/constant"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
// import { relative } from "path";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const paylosdasd = {
    url: "/v1/login",
    data: formData
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && newErrors.hasOwnProperty(key)) {
        if (formData[key] === "") {
          newErrors[key] = true;
        }
      }
    }
    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      mutation.mutate(paylosdasd)
    } else {
      setTimeout(() => {
        toast.error("please enter email and password", { AlertMessage });
      }, 100);
    }
  };
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
        if (data?.status == "success" && data?.statusCode == 200) {
          if (data?.access_token) {
            localStorage.setItem("token", data.access_token)
            if (data?.body && data?.body?.bundle) {
              try {
                const bundleFromData = data.body.bundle;
                // Storing the bundle directly in localStorage
                localStorage.setItem("bundle", bundleFromData);
                // Attempting to decode the JWT token
                const decoded = jwtDecode(bundleFromData);
                if (decoded && decoded.bundle && decoded.bundle[0]) {
                  dispatch(updateBusiness(decoded.bundle[0]));
                  console.log(decoded.bundle[0], "decoded");
                } else {
                  // Handle the case where the decoded data doesn't have the expected structure
                  console.error("Decoded data doesn't contain the expected bundle structure.");
                }
              } catch (error) {
                // Catching potential errors during decoding or dispatching
                console.error("Error while decoding or dispatching:", error);
                // Handle the error gracefully or log additional debugging information
              }
            } else {
              // Handle the case where data.body.bundle is not available
              console.error("Missing or invalid data.body.bundle");
            }
            navigate("/home")
          }
        }
      } else {
        return null
      }
    },
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    let isValid = true;
    switch (type) {
      case "email":
        isValid = validateEmail(value);
        break;
      case "password":
        isValid = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Form className="text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
          className="img-fluid rounded-circle mb-5"
        />
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`mb-3 ${!errors.email ? '' : 'has-error'}`}
        >
          <Form.Control
            onChange={handleInputChange}
            name="email"
            type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <FloatingLabel style={{ position: "relative" }} controlId="floatingPassword" label="Password" className={`mb-3 ${!errors.password ? '' : 'has-error'}`}>
          <Form.Control
            onChange={handleInputChange}
            type={showPassword == true ? "text" : "password"} name="password" placeholder="Password" />
          <div onClick={() => setShowPassword((prev) => !prev)} className="eyeButton">
            {showPassword == true ? < EyeOpenIcon width={22} height={22} /> : <EyeCloseIcon width={22} height={22} />}
          </div>
        </FloatingLabel>
        <Row style={{ marginTop: 10, marginBottom: 10 }}>
          <Col style={{ display: "flex", justifyContent: "space-between" }}>
            <Button style={{ fontSize: "14px" }} onClick={() => navigate('/register')} variant="link">Create Account</Button>
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
