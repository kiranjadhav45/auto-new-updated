// const ItemsMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
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

const ItemsMaster = ({ currentActiveMenu }) => {
  const dispatch = useDispatch()
  const businessData = useSelector((state) => state.business.value)
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const master = businessData.categories.find((item) => item.name == "Masters")
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
        onChange={() => { dispatch(updateLevelThree(menuItem)) }}
      />
    </ListGroup.Item>
  );

  return (
    <Container fluid>
      <h2>Items</h2>
      <Row>
        <Col xs={12} md={4}>
          {currentActiveMenu?.subMenu && (
            <ListGroup>
              {currentActiveMenu.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ItemsMaster;
