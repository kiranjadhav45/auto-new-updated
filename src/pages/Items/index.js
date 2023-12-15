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
  console.log(submenuArray, "submenuArray")


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  const data = [
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
    },
    {
      "Food Code": "kiran jadhav",
      "Food Name": 25,
      "Food Category": "kiran@gmail.com",
      "Sub Category": "data",
      "Food Price": "nansnas",
      "Ingredients": "nansnas",
      "Food Recipe": "nansnas",
      "Allergen Information": "nansnas",
      "Portion Size": "nansnas",
      "Status": "nansnas",
      "Taxable": "nansnas",
      "Discount": "nansnas",
      "Images": "nansnas",
      "Current Stock": "nansnas",
      "Bar Code": "nansnas",
      "Sales History": "nansnas",
      "Notes": "nansnas",
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
        <Col className="col col-responsive-table-container">
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
