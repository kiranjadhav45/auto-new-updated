import React, { useState } from "react";
import { Button, Form, FloatingLabel, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateText, validateEmail, } from "../../utils/validationUtils";

const EditItems = ({ items, selectedData, setSelectedData, errors, setErrors, disable, setDisable }) => {
  // const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value, type, required } = e.target;
  //   let isValid = true;
  //   switch (type) {
  //     case "text":
  //       isValid = validateText(value);
  //       break;
  //     case "email":
  //       isValid = validateEmail(value);
  //       break;
  //     default:
  //       break;
  //   }
  //   console.log(required)
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: !isValid,
  //   }));
  //   setSelectedData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e) => {
    const { name, value, type, required } = e.target;
    let isValid = true;

    // Additional validation for required fields
    if (required == true) {
      isValid = false;
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
    } else { }

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
                  disabled={disable[field?.name]}
                  className={errors[field?.name] ? "has-error" : ""}
                  required={field?.required || false}
                />
              </FloatingLabel>
            </Col>
          ) : field.type === "DropDown" ? (
            <Col xs={items?.length % 2 == 0 ? 12 : 12}>
              <FloatingLabel
                className="mb-3"
                controlId="floatingSelect"
                label={field?.placeholder}
              >
                <Form.Select
                  aria-label="Floating label select example"
                  name={field?.name}
                  onChange={handleInputChange}
                  className={errors[field?.name] ? "is-invalid" : ""}
                >
                  <option>Choose To Select</option>
                  {field?.values.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
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
