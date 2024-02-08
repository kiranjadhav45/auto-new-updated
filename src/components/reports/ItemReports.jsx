import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table, FloatingLabel } from "react-bootstrap";
import { TbReportAnalytics } from "react-icons/tb";
import { months, years } from "../../utils/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSort } from "react-icons/fa6";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { GetApi } from "../../utils/GetApi";
const ItemReports = () => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [sort, setSort] = useState("desc");
  const [column, setColumn] = useState("mostSold");
  // console.log(startDate, "startDate");

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const months = date.getMonth();
    const day = date.getDate();
    setFromDate(`${year - 1}-${months + 1}-${day}`);
    setToDate(`${year}-${months + 1}-${day}`);
  });

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["itemReports"],
    queryFn: () =>
      GetApi(
        // `//v1/reports?startDate=${startDate}&endDate=${endDate}&sort=${sort}&column=${column}`
        `//v1/reports/overview?start_date=${fromDate}&end_date=${toDate}&sort=${sort}&column=${column}`
      ),
    placeholderData: keepPreviousData,
  });
  console.log(isLoading);

  // console.log(data);
  const handleStartDate = (date) => {
    const year = date.getFullYear();
    const months = date.getMonth();
    const day = date.getDate();
    const finalDate = `${year}-${months + 1}-${day}`;
    setFromDate(finalDate);
    setStartDate(date);
    // console.log(finalDate);
  };
  const handleEndDate = (date) => {
    const year = date.getFullYear();
    const months = date.getMonth();
    const day = date.getDate();
    const finalDate = `${year}-${months + 1}-${day}`;
    setToDate(finalDate);
    setEndDate(date);
    // console.log(finalDate);
  };

  const handleAscDesc = (value) => {
    setColumn(value);
    if (sort == "asc") {
      setSort("desc");
      queryClient.invalidateQueries(["itemReports"]);
    }
    if (sort == "desc") {
      setSort("asc");
      queryClient.invalidateQueries(["itemReports"]);
    }
    // console.log(sort);
  };
  return (
    <div className="mx-4">
      <div className="d-flex align-items-center justify-content-between py-4">
        <div className="report-title">Items Report</div>
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
                onChange={(date) => handleStartDate(date)}
              />
            </div>
          </Col>
          <Col lg={5} className="my-auto">
            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDate(date)}
            />
          </Col>
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Button onClick={() => refetch()} variant="dark">
                search
              </Button>
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
                <th className="px-2 d-flex justify-content-between">
                  <span>Qty Remaining</span>
                  <span
                    onClick={() => handleAscDesc("quantityRemaining")}
                    className="cursor-pointer"
                  >
                    <FaSort />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.items &&
                data?.items.map((item, index) => (
                  <tr class="">
                    <td>{index + 1}</td>
                    <td>{item.itemName}</td>
                    <td>{item.mostSold}</td>
                    <td>{item.leastSold}</td>
                    <td>{item.quantityRemaining}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ItemReports;
