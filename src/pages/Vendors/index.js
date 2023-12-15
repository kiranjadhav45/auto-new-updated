import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import EditVendor from "../../components/vendors/editVendor";
import VendorComponent from "../../components/vendors";
import { useSelector } from "react-redux";
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
const VendorsPage = () => {
  const businessData = useSelector((state) => state.business.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Vendors");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "vendors");
  const submenuArray = employeeSubmenu?.subMenu;


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
            <h2>Vendors Page</h2>
            {/* <EditVendor items={currentActiveMenu.subMenu} /> */}
            <EditItems items={submenuArray} />
          </div>
        </Col>
        <Col className="col">
          {/* <VendorComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          <CommonTable data={data} title={"Vendor Data"} />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;
