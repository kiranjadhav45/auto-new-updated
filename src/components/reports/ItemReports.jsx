import React, { useState } from "react";
import { Row, Col, Form, Button, Table, FloatingLabel } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { GetApi } from "../../utils/GetApi";
const ItemReports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sort, setSort] = useState("ace");
  const [column, setColumn] = useState("");
  console.log(startDate, "startDate");

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["itemReports"],
    queryFn: () =>
      GetApi(
        `//v1/reports?startDate=${startDate}&endDate=${endDate}&sort=${sort}&column=${column}`
      ),
    placeholderData: keepPreviousData,
    // staleTime: 30000,
  });

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
          <Col style={{}} lg={5} className="my-auto">
            <div className="cursor-pointer">
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
                <th>Sr no</th>
                <th>Item</th>
                <th>Most Sold (₹)</th>
                <th>Least Sold (₹)</th>
                <th>Qty Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
              <tr class="">
                <td>1</td>
                <td>vegetables</td>
                <td>100</td>
                <td>12</td>
                <td>102</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ItemReports;
