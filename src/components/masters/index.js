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
import { updateLevelOne, updateLevelTwo, updateLevelThree } from '../../features/business/businessSlice'
const MasterComponent = ({ categories }) => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const renderCategory = (category) => (
    <ListGroup.Item
      key={category.name}
      onClick={() => handleCategorySelect(category)}
      active={selectedCategory === category}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: selectedCategory === category ? "white" : "inherit",
        color: selectedCategory === category ? "#000" : "inherit",
      }}
    >
      <span>{category.title}</span>
      <Form.Check
        type="switch"
        id={`category-switch-${category.name}`}
        label=""
        checked={category.isActive}
        onChange={() => { dispatch(updateLevelOne(category)) }}
      />
    </ListGroup.Item>
  );

  const renderSubcategory = (subcategory) => (
    <ListGroup.Item
      key={subcategory.name}
      onClick={() => handleSubcategorySelect(subcategory)}
      active={selectedSubcategory === subcategory}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor:
          selectedSubcategory === subcategory ? "white" : "inherit",
        color: selectedSubcategory === subcategory ? "#000" : "inherit",
      }}
    >
      <span>{subcategory.title}</span>
      <Form.Check
        type="switch"
        id={`subcategory-switch-${subcategory.name}`}
        label=""
        checked={subcategory.isActive}
        onChange={() => { dispatch(updateLevelTwo(subcategory)) }}
      />
    </ListGroup.Item>
  );

  const renderSubMenu = (menuItem) => (
    <ListGroup.Item
      key={menuItem.name}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: menuItem.isActive ? "white" : "inherit",
        color: menuItem.isActive ? "#000" : "inherit",
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
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setSelectedCategory(null)}>
              Masters
            </Breadcrumb.Item>
            {selectedCategory && (
              <Breadcrumb.Item onClick={() => setSelectedSubcategory(null)}>
                {selectedCategory.title}
              </Breadcrumb.Item>
            )}
            {selectedSubcategory && (
              <Breadcrumb.Item onClick={() => setSelectedSubcategory(null)}>
                {selectedSubcategory.title}
              </Breadcrumb.Item>
            )}
            {/* Add submenu breadcrumb here */}
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12} lg={6}>
          <ListGroup>
            {categories.map((category) => renderCategory(category))}
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          {selectedCategory && selectedCategory.subcategories && (
            <ListGroup>
              {selectedCategory.subcategories.map((subcategory) =>
                renderSubcategory(subcategory)
              )}
            </ListGroup>
          )}
        </Col>
        <Col xs={12} md={4}>
          {selectedSubcategory && selectedSubcategory.subMenu && (
            <ListGroup>
              {selectedSubcategory.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MasterComponent;
