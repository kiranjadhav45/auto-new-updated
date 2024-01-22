import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";

const MonthlyReport = () => {
  return (
    <div className="mx-4">
      <div className="d-flex align-items-center justify-content-between py-4">
        <div className="report-title">Monthly Report</div>
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
            <Form.Select
              style={{
                backgroundColor: "transparent",
                border: "1px solid #212529",
              }}
              aria-label="Default select example"
            >
              <option>Year</option>
              {years &&
                years.map((item) => <option value="1">{item.label}</option>)}
            </Form.Select>
          </Col>
          <Col lg={5}>
            <Form.Select
              style={{
                backgroundColor: "transparent",
                border: "1px solid #212529",
              }}
              aria-label="Default select example"
            >
              <option>Month</option>
              {months &&
                months.map((item) => <option value="1">{item.label}</option>)}
            </Form.Select>
          </Col>
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Button variant="dark">Search</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <h5 className="my-lg-4">Total Purchase</h5>
        <div className="">
          <Row>
            <Col lg={6}>
              <div className="card-reports">
                <div>Purchase</div>
                <div>100078</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Cancel</div>
                <div>100078</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Total</div>
                <div>100078</div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <h5 className="my-lg-4">Total Sales</h5>
        <div className="">
          <Row>
            <Col lg={6}>
              <div className="card-reports">
                <div>Sales</div>
                <div>100078</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Cancel</div>
                <div>100078</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Total</div>
                <div>100078</div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row>
        <h5 className="my-lg-4">Total</h5>
        <div className="">
          <Row>
            <Col lg={6}>
              <div className="card-reports">
                <div>Total</div>
                <div>100078</div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default MonthlyReport;
