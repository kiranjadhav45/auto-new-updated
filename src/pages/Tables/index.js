import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import EditTables from "../../components/tables/editTables";
import TablesComponent from "../../components/tables";
import { useSelector } from 'react-redux'
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
const TablesPage = () => {
  const businessData = useSelector((state) => state.business.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Tables");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "tables");
  const submenuArray = employeeSubmenu?.subMenu;


  const data = [
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
    },
    {
      Code: 32,
      Name: "kiran jadhav",
      "Table Status": "Occupied",
      "Table Location": "Bottom",
      "Table QR Code": "View",
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
            <h2>Tables</h2>
            {/* <EditTables items={currentActiveMenu.subMenu} /> */}
            <EditItems items={submenuArray} />
          </div>
        </Col>
        <Col className="col col-responsive-table-container">
          {/* <TablesComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          <CommonTable data={data} title={"Tables Data"} />
        </Col>
      </Row>
    </Layout>
  );
};

export default TablesPage;
