import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import EditTables from "../../components/tables/editTables";
import TablesComponent from "../../components/tables";

const TablesPage = () => {
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
            <h2>Tables</h2>
            <EditTables items={currentActiveMenu.subMenu} />
          </div>
        </Col>
        <Col className="col">
          <TablesComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default TablesPage;
