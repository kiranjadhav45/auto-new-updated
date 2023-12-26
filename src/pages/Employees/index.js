import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";

import Layout from "../../components/common/Layout";
import { Col, Row, Button } from "react-bootstrap";
import ItemsMaster from "../../components/masters/items";
import TaxMaster from "../../components/masters/tax";
import CustomerMaster from "../../components/masters/customer";
import EmployeeMaster from "../../components/masters/employee";
import ItemsComponent from "../../components/items";
import EditItems from "../../components/items/editItems";
import EditEmployee from "../../components/employees/editEmployee";
import EmployeeComponent from "../../components/employees";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee, deleteEmployee } from "../../features/employees/employeSlice"
import Table from "../../components/common/Table";
import CommonTable from "../../components/common/commonTable";
const EmployeesPage = () => {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employee.value);
  const businessData = useSelector((state) => state.business.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Employees");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "employeea");
  const submenuArray = employeeSubmenu?.subMenu;
  console.log(submenuArray, "submenuArray employeea");

  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({});
  const [errors, setErrors] = useState({
    employeeCode: "",
    employeeName: "",
    employeeEmail: "",
    employeeMobile: "",
    employeeAddr: "",
    employeeVerify: "",
  });
  const handleAddVendor = () => {
    dispatch(addEmployee(selectedData));
    setSelectedData({
      id: "",
      employeeCode: "",
      employeeName: "",
      employeeEmail: "",
      employeeMobile: "",
      employeeAddr: "",
      employeeVerify: "",
    });
    setHandleUpdateAdd(true)
  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteEmployee(idToDelete));
  };

  const handleEditTable = (event) => {
    setHandleUpdateAdd(false)
    console.log(event)
    setSelectedData(event)
  }

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Employee Page</h2>
            {/* <EditEmployee items={currentActiveMenu.subMenu} /> */}
            {/* <EditEmployee items={submenuArray} /> */}
            {/* <EditItems items={submenuArray} /> */}
            <EditItems errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button onClick={handleAddVendor} variant="primary">
                {handleUpdateAdd == true ? "Add New Employee" : "Update Employee"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container" >
          {/* <EmployeeComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          {/* <Table columns={columns} data={data} itemsPerPage={6} /> */}
          {/* <CommonTable data={data} title={"Employees Data"} /> */}
          <CommonTable handleEditTable={handleEditTable} handleDelete={handleDeleteVendor} data={employeeData} />
        </Col>
      </Row>
    </Layout>
  );
};

export default EmployeesPage;
