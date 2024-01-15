import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import EditItems from "../../components/items/editItems";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CommonTable from "../../components/common/commonTable";
import { PostApi } from "../../utils/PostApi";
import { GetApi } from "../../utils/GetApi";
import { DeleteApi } from "../../utils/DeleteApi";
import { PutApi } from "../../utils/PutApi";
import { AlertMessage } from "../../utils/constant"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
} from '@tanstack/react-query'
const CustomersPage = () => {
    const queryClient = useQueryClient()
    const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
    const [currentActiveMenu, setCurrentActiveMenu] = useState({
        isActive: true,
        name: "index",
        subMenu: [{}],
        title: "Index",
    });
    const [disable, setDisable] = useState({
        customerName: false,
        customerEmail: false,
        customerMobile: false,
        customerAddr: false,
    });
    const [errors, setErrors] = useState({
        customerName: false,
        customerEmail: false,
        customerMobile: false,
        customerAddr: false,
    });
    const [selectedData, setSelectedData] = useState({
        customerName: "",
        customerEmail: "",
        customerMobile: "",
        customerAddr: "",
    });

    const businessData = useSelector((state) => state.business.value);
    const Category = businessData?.categories?.find(
        (category) => category?.name === "Customers"
    );
    const subCategory = Category?.subcategories?.find(
        (sub) => sub?.name === "customer"
    );
    const submenuArray = subCategory?.subMenu;
    console.log(submenuArray, "submenuArray")


    // get all customers
    const { isLoading, data: customer, error, refetch } = useQuery({ queryKey: ['customer'], queryFn: () => GetApi("/v1/customer") })

    // handle update customer
    // edit vendors
    const newSelectedData = { ...selectedData }
    const updatePayloadData = {
        url: `/v1/customer/${newSelectedData._id}`,
        data: newSelectedData
    }
    const handleEditTable = (event) => {
        const newErrors = { ...errors };
        submenuArray.forEach((submenuItem) => {
            newErrors[submenuItem.name] = false;
        });
        setErrors(newErrors);
        setHandleUpdateAdd(false)
        setSelectedData(event)
    }

    // handle add customer
    const postPayloadData = {
        url: "/v1/customer",
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
                // update customer
                mutationUpdate.mutate(updatePayloadData)
                setSelectedData({
                    customerName: "",
                    customerEmail: "",
                    customerMobile: "",
                    customerAddr: "",
                });
            } else {
                // add new customer
                mutationPost.mutate(postPayloadData)
                setHandleUpdateAdd(true)
                setSelectedData({
                    customerName: "",
                    customerEmail: "",
                    customerMobile: "",
                    customerAddr: "",
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
                if (data?.status == "success") {
                    setTimeout(() => {
                        toast.success(data.message, { AlertMessage });
                    }, 100);
                }
                if (data?.status == "error") {
                    setTimeout(() => {
                        toast.error(data.message, { AlertMessage });
                    }, 100);
                }
                if (data.status == "success" && data.statusCode == 200) {
                    queryClient.invalidateQueries({ queryKey: ['vendor'] });
                    setSelectedData({
                        customerName: "",
                        customerEmail: "",
                        customerMobile: "",
                        customerAddr: "",
                    })
                }
            }
        },
    })
    // mutation update
    const mutationUpdate = useMutation({
        mutationFn: PutApi,
        onSuccess: (data, variable, context) => {
            if (data) {
                if (data?.status == "success") {
                    setTimeout(() => {
                        toast.success(data.message, { AlertMessage });
                    }, 100);
                }
                if (data?.status == "error") {
                    setTimeout(() => {
                        toast.error(data.message, { AlertMessage });
                    }, 100);
                }
                if (data.status == "success" && data.statusCode == 200) {
                    queryClient.invalidateQueries({ queryKey: ['customer'] });
                    setHandleUpdateAdd(true)
                    setSelectedData({
                        customerName: "",
                        customerEmail: "",
                        customerMobile: "",
                        customerAddr: "",
                    })
                }
            }
        },
    })
    // handle delete operations
    const handleDeleteVendor = (idToDelete) => {
        const deletePayloadData = {
            url: "/v1/customer/",
            id: idToDelete?._id
        }
        console.log(idToDelete, "idToDelete")
        mutationDelete.mutate(deletePayloadData)
    };
    // delete mutation
    const mutationDelete = useMutation({
        mutationFn: DeleteApi,
        onSuccess: (data, variable, context) => {
            if (data) {
                if (data.status == "success") {
                    setTimeout(() => {
                        toast.success(data.message, { AlertMessage });
                    }, 100);
                }
                if (data.status == "error") {
                    setTimeout(() => {
                        toast.success(data.message, { AlertMessage });
                    }, 100);
                }
                if (data?.status == "success" && data?.statusCode == 200) {
                    queryClient.invalidateQueries({ queryKey: ['customer'] });
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
                        <h2>Customers Page</h2>
                        <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
                        <div className="d-grid gap-2">
                            <Button
                                disabled={mutationPost.isPending || mutationUpdate.isPending}
                                onClick={handleAddVendor}
                                variant="primary">
                                {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Customer" : "Update Customer"}
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col className="col-lg-16 col-24 col-responsive-table-container">
                    <CommonTable
                        handleEditTable={handleEditTable}
                        handleDelete={handleDeleteVendor}
                        headerData={submenuArray}
                        data={customer?.body}
                    />
                </Col>
            </Row>
        </Layout>
    )
}

export default CustomersPage