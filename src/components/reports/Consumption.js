import React, { useState } from "react";
import { Row, Col, Form, Button, Table, FloatingLabel } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Consumption = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="mx-4">
      <div className="d-flex align-items-center justify-content-between py-4">
        <div className="report-title">Consumption Report</div>
        <div>
          <button className="export-button">
            <TbReportAnalytics size={22} />
            Export
          </button>
        </div>
      </div>
      <div className=" container-of-month-and-year">
        <Row>
          <Col lg={5}>
            <Form.Control
              className="input-box-bottom-border"
              type="text"
              placeholder="Row Material"
            />
          </Col>
          <Col lg={5}>
            <Form.Select
              style={{
                backgroundColor: "transparent",
                border: "1px solid #212529",
              }}
              aria-label="Default select example"
            >
              <option>category</option>
            </Form.Select>
          </Col>
          <Col style={{}} lg={5} className="my-auto">
            <div>
              <DatePicker
                style={{ display: "flex", alignItems: "center" }}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </Col>
          <Col lg={5} className="my-auto">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </Col>
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Button variant="dark">Search</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="mt-4">
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Raw Material</th>
                <th>Consumption</th>
                <th>Average Purchase Price (₹)</th>
                <th>Consumption Cost (₹)</th>
                <th>Total Consumption Qty</th>
                <th>Total Consumption Cost (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
              <tr class="">
                <td>vegetables</td>
                <td>0</td>
                <td>100</td>
                <td>1000</td>
                <td>10</td>
                <td>10000</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default Consumption;
