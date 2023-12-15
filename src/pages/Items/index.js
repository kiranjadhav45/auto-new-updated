import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";

import Layout from "../../components/common/Layout";
import { Col, Row, Button } from "react-bootstrap";
import ItemsMaster from "../../components/masters/items";
import TaxMaster from "../../components/masters/tax";
import CustomerMaster from "../../components/masters/customer";
import EmployeeMaster from "../../components/masters/employee";
import ItemsComponent from "../../components/items";
import EditItems from "../../components/items/editItems";
import { useSelector } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
import Input from "../../components/common/Input";
import CommonTable from "../../components/common/commonTable";
const Items = () => {
  const businessData = useSelector((state) => state.business.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });


  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Items");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "items");
  const submenuArray = employeeSubmenu?.subMenu;
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const data = [
    {
      Name: "kiran jadhav",
      Age: 25,
      Email: "kiran@gmail.com",
      Usename: "data",
      name: "nansnas",
    },
    {
      Name: "kiran jadhav",
      Age: 25,
      Email: "kiran@gmail.com",
      Usename: "data",
      name: "Nwe nanasn",
    },
    {
      Name: "kiran jadhav",
      Age: 26,
      Email: "kiran@gmail.com",
      Usename: "data",
    },
    {
      Name: "kiran jadhav",
      Age: 27,
      Email: "kiran@gmail.com",
      Usename: "data",
    },
    {
      Name: "kiran jadhav",
      Age: 28,
      Email: "kiran@gmail.com",
      Usename: "data",
    },
    {
      Name: "shiv shingan",
      Age: 29,
      Email: "kiran@gmail.com",
      Usename: "data",
    },
    { Name: "kiran jadhav", Age: 31, Email: "shiv@gmail.com", Usename: "data" },
    { Name: "kiran jadhav", Age: 32, Email: "shiv@gmail.com", Usename: "data" },
    { Name: "kiran jadhav", Age: 33, Email: "shiv@gmail.com", Usename: "data" },
    { Name: "kiran jadhav", Age: 34, Email: "shiv@gmail.com", Usename: "data" },
    { Name: "kiran jadhav", Age: 35, Email: "shiv@gmail.com", Usename: "data" },
    { Name: "kiran jadhav", Age: 35, Email: "shiv@gmail.com", Usename: "data" },
    {
      Name: "kiran jadhav",
      Age: 36,
      Email: "jane@example.com",
      usename: "data",
    },
  ];
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Items</h2>
            <EditItems items={submenuArray} />
          </div>
        </Col>
        <Col className="col">
          {/* <ItemsComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          <CommonTable data={data} title={"Items Data"} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Items;
