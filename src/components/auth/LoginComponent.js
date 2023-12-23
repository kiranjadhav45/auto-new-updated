// LoginComponent.js
import React from "react";
import { PostApi } from "../../utils/PostApi";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import axios from 'axios';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const postDataApi = async (data) => {
  const response = await axios.post('https://urchin-app-kcgxp.ondigitalocean.app/v1/login', data)
  const result = await response.data
  return result
}
const LoginComponent = () => {
  const queryClient = useQueryClient()
  const paylosdasd = {
    url: "/v1/login",
    data: {
      "email": "akashh111111@gmail.com",
      "password": "Akash@2151"
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    mutation.mutate(paylosdasd)
  };
  const mutation = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log('Mutation was successful:', data);
    },
  })
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
      // onClick={(e) => mutation.mutat("/v1/login", postData)}
      // onClick={(e) => loginMutation.mutate()}
      // onClick={(e) => PostApi("/v1/login", postData)}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginComponent;
