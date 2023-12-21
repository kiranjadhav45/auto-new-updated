// const TaxMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
import React, { useState } from "react";
import {
  ListGroup,
  Form,
  Container,
  Row,
  Col,
  Breadcrumb,
} from "react-bootstrap";

import { useSelector, useDispatch } from 'react-redux'
import { updateLevelThree } from '../../features/business/businessSlice'

const TaxMaster = ({ currentActiveMenu }) => {
  const businessData = useSelector((state) => state.business.value)
  const dispatch = useDispatch()
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);

  const employeesCategory = businessData?.categories?.find(category => category?.name === "Masters");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "taxMaster");
  const submenuArray = employeeSubmenu?.subMenu;
  // console.log(submenuArray, "submenuArray")

  const handleSubMenuSelect = (menuItem) => {
    setSelectedSubMenu(menuItem);
  };

  const renderSubMenu = (menuItem) => (
    <ListGroup.Item
      key={menuItem.name}
      onClick={() => handleSubMenuSelect(menuItem)}
      active={selectedSubMenu === menuItem}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: selectedSubMenu === menuItem ? "#007bff" : "inherit",
        color: selectedSubMenu === menuItem ? "#fff" : "inherit",
      }}
    >
      <span>{menuItem.title}</span>
      <Form.Check
        type="switch"
        id={`submenu-switch-${menuItem.name}`}
        label=""
        checked={menuItem.isActive}
        // onChange={() => { }}
        onChange={() => { dispatch(updateLevelThree(menuItem)) }}
      />
    </ListGroup.Item>
  );

  return (
    <Container fluid>
      <h2>Tax Master</h2>
      <Row>
        <Col xs={12} md={4}>
          {currentActiveMenu?.subMenu && (
            <ListGroup>
              {/* {currentActiveMenu.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {/* {businessData?.categories[1]?.subcategories[2].subMenu?.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {submenuArray?.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaxMaster;
