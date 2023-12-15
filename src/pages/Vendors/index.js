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
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
    },
    {
      Code: 21,
      Name: "Kiran jadhav",
      Email: "kiran@gmail.com",
      Mobile: 9956126721,
      Address: "New Trentstad, NJ 12026-4105",
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
        <Col className="col col-responsive-table-container">
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
