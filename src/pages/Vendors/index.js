import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../../components/common/Layout";
import { Button, Col, Row } from "react-bootstrap";
import { PostApi } from "../../utils/PostApi";
import { GetApi } from "../../utils/GetApi";
import { DeleteApi } from "../../utils/DeleteApi";
import { PutApi } from "../../utils/PutApi";
import { useSelector, useDispatch } from "react-redux";
import { AlertMessage } from "../../utils/constant"
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

  // get vendors
  const { isLoading, data: vendors, error, refetch } = useQuery({ queryKey: ['vendor'], queryFn: () => GetApi("/v1/vendors") })
  console.warn(submenuArray)
  // onClick add new vendor
  const payloadData = {
    url: "/v1/vendors",
    data: selectedData
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
        newErrors[submenuItem.name] = false;
      }
    });

    // Update the errors state with the newErrors object
    setErrors(newErrors);

    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      if (selectedData._id && !handleUpdateAdd) {
        // update vendor
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
      setTimeout(() => {
        toast.error('Please Fill Requied Field', { AlertMessage });
      }, 100);
    }
  };
  const mutationPost = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log(data, "array data")
      if (data) {
        if (data.status == "success" && data.statusCode == 200) {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
          setSelectedData({
            vendorCode: "",
            vendorName: "",
            vendorEmail: "",
            vendorMobile: "",
            vendorAddr: ""
          })
        } else if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
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
      if (data) {
        if (data?.status == "success" && data?.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        } else if (data?.error) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
          // dispatch(updateState(oldItemsData))
        }
      }
    },
  })

  // edit vendors
  const newSelectedData = { ...selectedData }
  delete newSelectedData._id;
  const payloadUpdate = {
    url: `/v1/vendors/${newSelectedData.vendorCode}`,
    data: newSelectedData
  }

  const handleEditTable = (event) => {
    const newErrors = { ...errors };
    submenuArray.forEach((submenuItem) => {
      newErrors[submenuItem.name] = false;
    });
    setErrors(newErrors);
    setHandleUpdateAdd(false)
    let newData = { ...disable }
    newData.vendorCode = true
    setDisable(newData)
    setSelectedData(event)
  }

  const mutationUpdate = useMutation({
    mutationFn: PutApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        if (data.status == "success" && data.statusCode == 200) {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
          queryClient.invalidateQueries({ queryKey: ['vendor'] });
          setSelectedData({
            vendorCode: "",
            vendorName: "",
            vendorEmail: "",
            vendorMobile: "",
            vendorAddr: ""
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
      <Row className="row mt-1">
        <Col className="col-lg-8 col-24">
          <div style={{ borderWidth: 1 }}>
            <h2>Vendors Page</h2>
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button disabled={mutationPost.isPending || mutationUpdate.isPending} onClick={handleAddVendor} variant="primary">
                {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Vendor" : "Update Vendor"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col-lg-16 col-24 col-responsive-table-container">
          <CommonTable
            handleEditTable={handleEditTable}
            handleDelete={handleDeleteVendor}
            headerData={submenuArray}
            data={vendors?.body}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;

