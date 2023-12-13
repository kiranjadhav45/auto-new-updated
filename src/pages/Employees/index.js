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

import Table from "../../components/common/Table";
import CommonTable from "../../components/common/commonTable";
const EmployeesPage = () => {
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });

  const columns = ["Actions", "Name", "Age", "Usename", "Email", "name"];
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
            <h2>Employee Page</h2>
            <EditEmployee items={currentActiveMenu.subMenu} />
          </div>
        </Col>
        <Col className="col">
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
