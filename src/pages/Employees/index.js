import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";
import Alert from 'react-bootstrap/Alert';
import Layout from "../../components/common/Layout";
import { Col, Row, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
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
import { AlertMessage } from "../../utils/constant"
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
  // console.log(submenuArray, "submenuArray employeea");

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
        if (data?.status == "success" && data?.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['employee'] });
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        } else if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })

  const handleEditTable = (event) => {
    const newErrors = { ...errors };
    submenuArray.forEach((submenuItem) => {
      newErrors[submenuItem.name] = false;
    });
    setErrors(newErrors);


    // console.log(event, "handleUpdateAdd")
    setHandleUpdateAdd(false)
    setSelectedData(event)

    let newData = { ...disable }
    newData.employeeCode = true
    setDisable(newData)
    setSelectedData(event)
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
        // console.log("clicked")
        newErrors[submenuItem.name] = false;
      }
    });

    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      // console.log(handleUpdateAdd)
      if (selectedData?._id && !handleUpdateAdd) {
        // console.log("clecked")
        // update vendor
        mutationUpdate.mutate(payloadDataUpdate)
        let newData = { ...disable }
        newData.employeeCode = false
        setDisable(newData)
        setHandleUpdateAdd(true)
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
      setTimeout(() => {
        toast.error('Please Fill Requied Field', { AlertMessage });
      }, 100);
    }
  };

  // post mutation
  const mutationPost = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        console.log(data, "data")
        if (data?.response?.status != 200 || data.status == "error") {
          setTimeout(() => {
            toast.error(data?.response?.data?.message || data.message, { AlertMessage });
          }, 100);
        }
        if (data?.status == "success") {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        }
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
        } else if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })
  // update mutation 
  const mutationUpdate = useMutation({
    mutationFn: PutApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        if (data?.response?.status !== 200) {
          setTimeout(() => {
            toast.error(data?.response?.data?.message, { AlertMessage });
          }, 100);
        }
        if (data?.status == "success") {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        }
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
        } else if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Row className="mt-1">
        <Col className="col-lg-8 col-24">
          <div style={{ borderWidth: 1 }}>
            <h2>Employee Page</h2>
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button disabled={mutationPost.isPending || mutationUpdate.isPending} onClick={handleAddVendor} variant="primary">
                {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Employee" : "Update Employee"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col-lg-16 col-24 col-responsive-table-container">
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

