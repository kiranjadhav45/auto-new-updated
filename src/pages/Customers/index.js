import React, { useEffect, useState } from "react";
import Layout from "../../components/common/Layout";
import EditItems from "../../components/items/editItems";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CommonTable from "../../components/common/commonTable";
const CustomersPage = () => {
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

    const handleAddVendor = () => {
        console.log(selectedData)
    }
    const handleEditTable = (event) => {
    }
    const handleDeleteVendor = (idToDelete) => {
        const deletePayloadData = {
            url: "/v1/vendors/",
            id: idToDelete?.vendorCode
        }
        // mutationDelete.mutate(deletePayloadData)
        // dispatch(deleteVendor(idToDelete));
    };
    const customerData = []
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
                                // disabled={mutationPost.isPending || mutationUpdate.isPending}
                                onClick={handleAddVendor}
                                variant="primary">
                                {/* {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Vendor" : "Update Vendor"} */}
                                {handleUpdateAdd == true ? "Add New Customer" : "Update Customer"}
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col className="col-lg-16 col-24 col-responsive-table-container">
                    <CommonTable
                        handleEditTable={handleEditTable}
                        handleDelete={handleDeleteVendor}
                        headerData={submenuArray}
                        // data={vendors?.body}
                        data={customerData}
                    />
                </Col>
            </Row>
        </Layout>
    )
}

export default CustomersPage