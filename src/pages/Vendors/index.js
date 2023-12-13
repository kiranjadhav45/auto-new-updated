import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import EditVendor from "../../components/vendors/editVendor";
import VendorComponent from "../../components/vendors";

const VendorsPage = () => {
  
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
 
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Vendors Page</h2>
            <EditVendor items={currentActiveMenu.subMenu} />
          </div>
        </Col>
        <Col className="col">
          <VendorComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;
