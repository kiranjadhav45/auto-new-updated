import React, { Component, useState } from "react";
import { Col, Row, Button, ListGroup, Table } from "react-bootstrap";
const VendorComponent = ({ currentActiveMenu, setCurrentActiveMenu }) => {
  const handleToggle = ({ name }) => {
    let test = { currentActiveMenu };

    let wow = currentActiveMenu.subMenu.map((item) =>
      item.name === name ? { ...item, isActive: !item.isActive } : item
    );
    test.subMenu = wow;
    setCurrentActiveMenu(test);
  };
  return (
    <div>
      <Table responsive="xl">
        <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default VendorComponent;
