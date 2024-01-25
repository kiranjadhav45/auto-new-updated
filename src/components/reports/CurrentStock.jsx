import React from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";
const CurrentStock = () => {
  return (
    <div className="mx-4">
      <div className="d-flex align-items-center justify-content-between py-4">
        <div className="report-title">Current Stocks</div>
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
              <option>Row Material</option>
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
              <option>Category</option>
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
              <option>All</option>
              <option>At-Per Stock</option>
              <option>Minimum Stock</option>
              <option>Negative Stock</option>
            </Form.Select>
          </Col>
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Button variant="dark">Search</Button>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="mx-1 mt-4">
        {/* <table class="table table-bordered border-light">
          <thead class="table-light">
            <tr>
              <th style={{ minWidth: "100px", margin: "auto" }}>Category</th>
              <th style={{ minWidth: "100px" }}>Item</th>
              <th style={{ minWidth: "300px" }}>Current Stock</th>
              <th style={{ minWidth: "400px" }}>Average Purchase Price (₹)</th>
              <th>
                Total Average Purchase Price: (₹) (Current Stock * Avg Purchase
                Price) = ₹1258517381422.28
              </th>
            </tr>
          </thead>
          <tbody class="table-light">
            <tr class="">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table> */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th style={{ minWidth: "100px", margin: "auto" }}>Category</th>
              <th style={{ minWidth: "100px" }}>Item</th>
              <th style={{ minWidth: "300px" }}>Current Stock</th>
              <th style={{ minWidth: "400px" }}>Average Purchase Price (₹)</th>
              <th>
                Total Average Purchase Price: (₹) (Current Stock * Avg Purchase
                Price) = ₹12585.28
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr class="">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr class="">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr class="">
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default CurrentStock;

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Table</title>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
// </head>
// <body>

// <div class="container mt-5">
// </div>

{
  /* 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

<style type = "text/css">

.table-bordered {
border: 2px solid #dee2e6;
}

.table-light th {
background-color: #f8f9fa;
color: black;
}

.table-bordered td, .table-bordered th {
border: 2px solid #dee2e6;
}

.container{
background-color:white;
padding-top:20px;
padding-bottom:20px;

}
</style> */
}
// </body>
// </html>
