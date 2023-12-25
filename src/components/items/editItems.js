import React, { useState } from "react";
import { Button, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateText, validateEmail, } from "../../utils/validationUtils";

const EditItems = ({ items, selectedData, setSelectedData }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  console.log(selectedData, "selectedData")

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    let isValid = true;
    switch (type) {
      case "text":
        isValid = validateText(value);
        break;
      case "email":
        isValid = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));
    setSelectedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };
  const hasErrors = Object.values(errors).some((error) => error);
  return (
    <div>
      <Row>
        {items.map((field, index) =>
          field.type === "text" || field.type === "email" ? (
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
                  // isInvalid={errors[field?.name]}
                  className={errors[field?.name] ? "has-error" : ""}

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
                <Form.Select aria-label="Floating label select example"
                  // isInvalid={errors[field?.name]}
                  className={errors[field?.name] ? "is-invalid" : ""} >
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
    </div >
  );
};

export default EditItems;
