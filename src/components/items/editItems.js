import React, { useState, useId } from "react";
import { Button, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditItems = ({ items, selectedData, setSelectedData }) => {
  const navigate = useNavigate();
  const uniqueId = useId();
  console.log(selectedData, "selectedData")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedData((prevData) => ({
      ...prevData,
      id: uniqueId,
      [name]: value,
    }));
  };

  return (
    <div>
      <Row>
        {items.map((field, index) =>
          field.type === "text" ? (
            <Col xs={items?.length % 2 == 0 ? 12 : 12}>
              <FloatingLabel
                controlId="floatingInput"
                label={field?.placeholder}
                className="mb-3"
              >
                <Form.Control
                  type={field?.type}
                  placeholder={field?.placeholder}
                  name={field?.name}
                  value={selectedData[field?.name]}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Col>
          ) : field.type === "DropDown" ? (
            <Col xs={items?.length % 2 == 0 ? 12 : 12}>
              <FloatingLabel
                className="mb-3"
                // style={{ marginTop: 10 }}
                controlId="floatingSelect"
                label={field?.placeholder}
              >
                <Form.Select aria-label="Floating label select example">
                  <option>Choose To Select</option>
                  {field?.values.map((value) => (
                    <option value="3">{value}</option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>
          ) : (
            ""
          )
        )}
      </Row>
    </div>
  );
};

export default EditItems;
