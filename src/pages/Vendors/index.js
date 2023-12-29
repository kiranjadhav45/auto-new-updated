import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Layout from "../../components/common/Layout";
import { Button, Col, Row } from "react-bootstrap";
import { PostApi } from "../../utils/PostApi";
import { GetApi } from "../../utils/GetApi";
import { DeleteApi } from "../../utils/DeleteApi";
import { PutApi } from "../../utils/PutApi";
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
  QueryClient,
} from '@tanstack/react-query'
const VendorsPage = () => {
  const queryClient = useQueryClient()
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
  const [disable, setDisable] = useState({
    vendorCode: false,
    vendorName: false,
    vendorEmail: false,
    vendorMobile: false,
    vendorAddr: false,
  });
  const [errors, setErrors] = useState({
    vendorCode: "",
    vendorName: "",
    vendorEmail: "",
    vendorMobile: "",
    vendorAddr: ""
  });
  const [selectedData, setSelectedData] = useState({
    vendorCode: "",
    vendorName: "",
    vendorEmail: "",
    vendorMobile: "",
    vendorAddr: ""
  });
  const employeesCategory = businessData?.categories?.find(
    (category) => category?.name === "Vendors"
  );
  const employeeSubmenu = employeesCategory?.subcategories?.find(
    (sub) => sub?.name === "vendors"
  );
  const submenuArray = employeeSubmenu?.subMenu;

  const payloadData = {
    url: "/v1/vendors",
    data: selectedData
  }

  // get vendors
  const { isLoading, data: vendors, error, refetch } = useQuery({ queryKey: ['vendor'], queryFn: () => GetApi("/v1/vendors") })

  // onClick add new vendor
  const handleAddVendor = () => {
    const newErrors = { ...errors };
    for (const key in selectedData) {
      if (selectedData.hasOwnProperty(key) && newErrors.hasOwnProperty(key)) {
        if (selectedData[key] === "") {
          newErrors[key] = true;
        }
      }
    }
    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      if (selectedData._id && !handleUpdateAdd) {
        // update vendor
        // console.log(payloadUpdate, "payloadUpdate")
        mutationUpdate.mutate(payloadUpdate)
        let newData = { ...disable }
        newData.vendorCode = false
        setDisable(newData)
        setSelectedData({
          vendorCode: "",
          vendorName: "",
          vendorEmail: "",
          vendorMobile: "",
          vendorAddr: ""
        });
      } else {
        // add new vendor
        dispatch(addVendor(selectedData));
        mutationPost.mutate(payloadData)
        setHandleUpdateAdd(true)
        setSelectedData({
          vendorCode: "",
          vendorName: "",
          vendorEmail: "",
          vendorMobile: "",
          vendorAddr: ""
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

  const mutationPost = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log(data, "array data")
      if (data) {
        setShow(true)
        setMessage(data.message)
        if (data.status == "success" && data.statusCode == 200) {
          // refetch()
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
          setSelectedData({
            vendorCode: "",
            vendorName: "",
            vendorEmail: "",
            vendorMobile: "",
            vendorAddr: ""
          })
        } else {
          setMessage(data.error)
          // dispatch(updateState(oldItemsData))
        }
        setTimeout(function () {
          setShow(false)
        }, 3000);
      }
    },
  })

  // delete vendors

  const handleDeleteVendor = (idToDelete) => {
    const deletePayloadData = {
      url: "/v1/vendors/",
      id: idToDelete?.vendorCode
    }
    mutationDelete.mutate(deletePayloadData)
    dispatch(deleteVendor(idToDelete));
  };

  const mutationDelete = useMutation({
    mutationFn: DeleteApi,
    onSuccess: (data, variable, context) => {
      // console.log(data, "array data")
      if (data) {
        setShow(true)
        setMessage(data.message)
        // console.log(data, "vendor Data sdfsdfklsm lkdmsf")
        if (data.status == "success" && data.statusode == 200) {
          // refetch()
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
        } else {
          // dispatch(updateState(oldItemsData))
        }
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })

  // edit vendors

  const newSelectedData = { ...selectedData }
  delete newSelectedData._id;
  const payloadUpdate = {
    url: `/v1/vendors/${newSelectedData.vendorCode}`,
    id: newSelectedData.vendorCode,
    data: newSelectedData
  }

  const handleEditTable = (event) => {
    // console.log(event, "event")
    setHandleUpdateAdd(false)
    let newData = { ...disable }
    newData.vendorCode = true
    setDisable(newData)

    // disable, setDisable
    // vendorCode: false,
    // vendorName: false,
    // vendorEmail: false,
    // vendorMobile: false,
    // vendorAddr: false,
    setSelectedData(event)
  }


  const mutationUpdate = useMutation({
    mutationFn: PutApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        setShow(true)
        setMessage(data.message)
        // console.log(data, "vendor Data sdfsdfklsm lkdmsf")
        if (data.status == "success" && data.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
          setSelectedData({
            vendorCode: "",
            vendorName: "",
            vendorEmail: "",
            vendorMobile: "",
            vendorAddr: ""
          })
        } else {

        }
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })
  // console.log(selectedData, "setSelectedData")
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
            <h2>Vendors Page</h2>
            {/* <EditVendor items={currentActiveMenu.subMenu} /> */}
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
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
          <CommonTable
            handleEditTable={handleEditTable}
            handleDelete={handleDeleteVendor}
            // data={vendorData}
            data={vendors?.body}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;
