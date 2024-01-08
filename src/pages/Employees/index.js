import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";
import Alert from 'react-bootstrap/Alert';
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
import { GetApi } from "../../utils/GetApi"
import { DeleteApi } from "../../utils/DeleteApi"
import { PutApi } from "../../utils/PutApi"
import { PostApi } from "../../utils/PostApi"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
const EmployeesPage = () => {

  const dispatch = useDispatch();
  const queryClient = useQueryClient()
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
  const [selectedData, setSelectedData] = useState({
    employeeCode: "",
    employeeName: "",
    employeeEmail: "",
    employeeMobile: "",
    employeeAddr: "",
    employeeVerify: "",
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState({});
  const [errors, setErrors] = useState({
    employeeCode: "",
    employeeName: "",
    employeeEmail: "",
    employeeMobile: "",
    employeeAddr: "",
    employeeVerify: "",
  });

  // get items

  const { isLoading, data: employee, error, refetch } = useQuery({ queryKey: ['employee'], queryFn: () => GetApi("//v1/employee") })

  // delete tables 
  const handleDeleteTable = (idToDelete) => {
    const deletePayloadData = {
      url: "/v1/employee/",
      id: idToDelete?.employeeCode
    }
    mutationDelete.mutate(deletePayloadData)
    // dispatch(deleteEmployee(idToDelete));
  };
  const mutationDelete = useMutation({
    mutationFn: DeleteApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        setMessage(data?.message)
        setShow(true)
        if (data?.status == "success" && data?.statusCode == 200) {
          // refetch()
          console.log("success delete")
          queryClient.invalidateQueries({ queryKey: ['employee'] });
        } else {
          // dispatch(updateState(oldItemsData))
        }
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })



  // const handleAddVendor = () => {
  //   dispatch(addEmployee(selectedData));
  //   setSelectedData({
  //     employeeCode: "",
  //     employeeName: "",
  //     employeeEmail: "",
  //     employeeMobile: "",
  //     employeeAddr: "",
  //     employeeVerify: "",
  //   });
  //   setHandleUpdateAdd(true)
  // };

  const handleEditTable = (event) => {
    console.log(event, "handleUpdateAdd")
    setHandleUpdateAdd(false)
    setSelectedData(event)

    let newData = { ...disable }
    newData.employeeCode = true
    setDisable(newData)
    setSelectedData(event)
    // setHandleUpdateAdd(false)
    // console.log(event)
    // setSelectedData(event)
  }
  const payloadDataPost = {
    url: "/v1/employee",
    data: selectedData
  }
  const payloadDataUpdate = {
    url: `/v1/employee/${selectedData?.employeeCode}`,
    data: selectedData,
  }

  const handleAddVendor = () => {
    const newErrors = { ...errors };
    for (const key in selectedData) {
      if (selectedData.hasOwnProperty(key) && newErrors.hasOwnProperty(key)) {
        if (selectedData[key] === "") {
          newErrors[key] = true;
        }
      }
    }
    // Iterate through submenuArray for required fields
    submenuArray.forEach((submenuItem) => {
      if (!submenuItem.required) {
        console.log("clicked")
        newErrors[submenuItem.name] = false;
      }
    });

    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      console.log(handleUpdateAdd)
      if (selectedData?._id && !handleUpdateAdd) {
        console.log("clecked")
        // update vendor
        mutationUpdate.mutate(payloadDataUpdate)
        let newData = { ...disable }
        newData.employeeCode = false
        setDisable(newData)
        setSelectedData({
          employeeCode: "",
          employeeName: "",
          employeeEmail: "",
          employeeMobile: "",
          employeeAddr: "",
          employeeVerify: "",
        });
      } else {
        // add new vendor
        mutationPost.mutate(payloadDataPost)
        setHandleUpdateAdd(true)
        setSelectedData({
          employeeCode: "",
          employeeName: "",
          employeeEmail: "",
          employeeMobile: "",
          employeeAddr: "",
          employeeVerify: "",
        });
      }
    } else {
      setShow(true)
      setMessage("please fill requied field")
      setTimeout(function () {
        setShow(false)
      }, 3000);
    }
  };

  // post mutation
  const mutationPost = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      // console.log(data, "array data")
      if (data) {
        setMessage(data.message)
        setShow(true)
        if (data.status == "success" && data.statusCode == 200) {
          // refetch()
          queryClient.invalidateQueries({ queryKey: ['employee'] });
          setSelectedData({
            employeeCode: "",
            employeeName: "",
            employeeEmail: "",
            employeeMobile: "",
            employeeAddr: "",
            employeeVerify: "",
          })
        } else {
          // setMessage(data.error)
          // setShow(true)
          // dispatch(updateState(oldItemsData))
        }
        setTimeout(function () {
          setShow(false)
        }, 3000);
      }
    },
  })

  // update mutation 
  const mutationUpdate = useMutation({
    mutationFn: PutApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        setShow(true)
        setMessage(data.message)
        if (data.status == "success" && data.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['employee'] });
          setSelectedData({
            employeeCode: "",
            employeeName: "",
            employeeEmail: "",
            employeeMobile: "",
            employeeAddr: "",
            employeeVerify: "",
          })
        }
      } else {
        setShow(data.error)
        setMessage(data.message)
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })
  console.log(employee?.body, "employee?.body")
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <div className="alert-position" >
        {show && (
          <Alert variant="danger">
            <p>{message}</p>
          </Alert>
        )}
      </div>
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Employee Page</h2>
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button onClick={handleAddVendor} variant="primary">
                {handleUpdateAdd == true ? "Add New Employee" : "Update Employee"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container" >
          <CommonTable
            headerData={submenuArray}
            handleEditTable={handleEditTable}
            handleDelete={handleDeleteTable}
            // data={employeeData}
            data={employee?.body}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default EmployeesPage;
