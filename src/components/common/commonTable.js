import React, { useState } from "react";
import {
  Table,
  Form,
  Pagination,
  Navbar,
  InputGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import {
  FcSearch,
  FcEmptyFilter,
  FcExpand,
} from "react-icons/fc";
import { FiEdit, FiChevronDown, FiTrash2 } from "react-icons/fi";

const CommonTable = ({ data, title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  const recordsPerPage = 10;

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);

    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    setFilteredData(filtered);
    setExpandedRowIndex(null); // Close any expanded row when searching
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
    setCurrentPage(1);

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (direction === "asc") {
        return aValue.localeCompare
          ? aValue.localeCompare(bValue)
          : aValue - bValue;
      } else {
        return bValue.localeCompare
          ? bValue.localeCompare(aValue)
          : bValue - aValue;
      }
    });

    setFilteredData(sortedData);
    setExpandedRowIndex(null); // Close any expanded row when sorting
  };

  const handleExpandRow = (index) => {
    setExpandedRowIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary justify-content-between">
        <Form inline>
          <InputGroup>
            <h2>{title}</h2>
          </InputGroup>
        </Form>
        <Form inline>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={handleSearch}
              />
            </Col>
          </Row>
        </Form>
      </Navbar>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>
                {key}
                <FcEmptyFilter
                  size={16}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    cursor: "pointer",
                    float: "right",
                  }}
                  onClick={() => handleSort(key)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  <FiChevronDown
                    size={24}
                    color="blue"
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                      transform: expandedRowIndex === index ? "rotate(180deg)" : "",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => handleExpandRow(index)}
                  />
                  <FiEdit
                    color="green"
                    size={24}
                    style={{ marginRight: 10, cursor: "pointer" }}
                  />
                  <FiTrash2
                    color="red"
                    size={24}
                    style={{ marginRight: 10, cursor: "pointer" }}
                  />
                </td>

                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
              {expandedRowIndex === index && (
                <tr>
                  <td colSpan={Object.keys(row).length + 1}>
                    {/* Content for expanded row */}
                    Expanded content for row {index}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
};

export default CommonTable;
