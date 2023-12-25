import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Layout from "../../components/common/Layout";
import { Button, Col, Row } from "react-bootstrap";
import { PostApi } from "../../utils/PostApi";
import EditVendor from "../../components/vendors/editVendor";
import VendorComponent from "../../components/vendors";
import { useSelector, useDispatch } from "react-redux";
import {
  addVendor,
  deleteVendor,
} from "../../features/vendor/vendorSlice";
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
const VendorsPage = () => {
  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const dispatch = useDispatch();
  const businessData = useSelector((state) => state.business.value);
  const vendorData = useSelector((state) => state.vendor.value);
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const employeesCategory = businessData?.categories?.find(
    (category) => category?.name === "Vendors"
  );
  const employeeSubmenu = employeesCategory?.subcategories?.find(
    (sub) => sub?.name === "vendors"
  );
  const submenuArray = employeeSubmenu?.subMenu;
  const [selectedData, setSelectedData] = useState({});

  const itemData = {
    "vendorCode": "V0098933",
    "vendorName": "ABCd Vendor",
    "vendorEmail": "abc@example.com",
    "vendorMobile": "1234567890",
    "vendorAddr": "123 Main Street"
  }
  const payloadData = {
    url: "/v1/vendors",
    data: itemData
  }

  const handleAddVendor = () => {
    if (!selectedData.vendorAddr > 0 || !selectedData.vendorName > 0 || !selectedData.vendorEmail > 0 || !selectedData.vendorMobile > 0 || !selectedData.vendorAddr > 0) {
      setShowMessage(true)
      setMessage("all fiels are required")
      setTimeout(function () {
        setShowMessage(false)
      }, 3000);
    } else {
      // console.log("first")
      mutation.mutate(payloadData)
    }
    // dispatch(addVendor(selectedData));
    // setSelectedData({
    //   id: "",
    //   vendorAddr: "",
    //   vendorCode: "",
    //   vendorEmail: "",
    //   vendorMobile: "",
    //   vendorName: "",
    // });
    // setHandleUpdateAdd(true)
  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteVendor(idToDelete));
  };

  const handleEditTable = (event) => {
    setHandleUpdateAdd(false)
    // console.log(event)
    setSelectedData(event)
  }


  const mutation = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log(data, "array data")
      // console.log(typeof data)
      if (data) {
        setShow(true)
        if (data.status = "success" && data.statuscode == 200) {
        } else {
          // dispatch(updateState(oldItemsData))
        }
      }

      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <div className="alert-position" >
        {show && (
          <Alert variant="danger">
            <p>{mutation.data && mutation.data.message}</p>
          </Alert>
        )}
        {showMessage && (
          <Alert variant="danger">
            <p>{message}</p>
          </Alert>
        )}
      </div>
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Vendors Page</h2>
            {/* <EditVendor items={currentActiveMenu.subMenu} /> */}
            <EditItems selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button onClick={handleAddVendor} variant="primary">
                {handleUpdateAdd == true ? "Add New Vendor" : "Update Vendor"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container">
          {/* <VendorComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          <CommonTable handleEditTable={handleEditTable} handleDelete={handleDeleteVendor} data={vendorData} />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;
