import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";
import { GetApi } from "../../utils/GetApi";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
const MonthlyReport = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const {
    isLoading,
    data: monthlyReports,
    error,
    refetch,
  } = useQuery({
    queryKey: ["monthlyReports"],
    queryFn: () => GetApi(`//v1/reports?year=${year}&month=${month}`),
    placeholderData: keepPreviousData,
    // staleTime: 30000,
  });
  // console.log(DateNow());
  console.log(monthlyReports, "monthlyReports");
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
              onChange={(e) => setYear(e.target.value)}
            >
              <option>Year</option>
              {years &&
                years.map((item) => (
                  <option value={item.label}>{item.label}</option>
                ))}
            </Form.Select>
          </Col>
          <Col lg={5}>
            <Form.Select
              style={{
                backgroundColor: "transparent",
                border: "1px solid #212529",
              }}
              aria-label="Default select example"
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>Month</option>
              {months &&
                months.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
            </Form.Select>
          </Col>
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Button onClick={() => refetch()} variant="dark">
                Search
              </Button>
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
                <div>{monthlyReports?.report?.purchases?.purchase || 0}</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Cancel</div>
                <div>
                  {monthlyReports?.report?.purchases?.purchasecancel || 0}
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Total</div>
                <div>{monthlyReports?.report?.purchases?.total || 0}</div>
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
                <div>{monthlyReports?.report?.sales?.sale || 0}</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Cancel</div>
                <div>{monthlyReports?.report?.sales?.salecancel || 0}</div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card-reports">
                <div>Total</div>
                <div>{monthlyReports?.report?.sales?.total || 0}</div>
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
                <div>{monthlyReports?.report?.sales?.totalExpense || 0}</div>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default MonthlyReport;
