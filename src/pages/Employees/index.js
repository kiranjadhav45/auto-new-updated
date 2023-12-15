import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";

import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import ItemsMaster from "../../components/masters/items";
import TaxMaster from "../../components/masters/tax";
import CustomerMaster from "../../components/masters/customer";
import EmployeeMaster from "../../components/masters/employee";
import ItemsComponent from "../../components/items";
import EditItems from "../../components/items/editItems";
import EditEmployee from "../../components/employees/editEmployee";
import EmployeeComponent from "../../components/employees";
import { useSelector } from "react-redux";

import Table from "../../components/common/Table";
import CommonTable from "../../components/common/commonTable";
const EmployeesPage = () => {
  const businessData = useSelector((state) => state.business.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });

  const data = [
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      Email: "kiran@gmail.com",
      Location: "Karad",
      Address: "nansnasSuite 625 9618 Abbott Junction",
    },
  ];

  const employeesCategory = businessData?.categories?.find(category => category?.name === "Employees");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "employeea");
  const submenuArray = employeeSubmenu?.subMenu;
  console.log(submenuArray, "submenuArray employeea");

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Employee Page</h2>
            {/* <EditEmployee items={currentActiveMenu.subMenu} /> */}
            {/* <EditEmployee items={submenuArray} /> */}
            <EditItems items={submenuArray} />
          </div>
        </Col>
        <Col className="col col-responsive-table-container" >
          {/* <EmployeeComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          {/* <Table columns={columns} data={data} itemsPerPage={6} /> */}
          <CommonTable data={data} title={"Employees Data"} />
        </Col>
      </Row>
    </Layout>
  );
};

export default EmployeesPage;
