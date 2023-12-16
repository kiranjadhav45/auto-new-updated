import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Button, Col, Row } from "react-bootstrap";
import EditVendor from "../../components/vendors/editVendor";
import VendorComponent from "../../components/vendors";
import { useSelector, useDispatch } from "react-redux";
import { addVendor, updateVendor, deleteVendor } from '../../features/vendor/vendorSlice';
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
const VendorsPage = () => {
  const dispatch = useDispatch()
  const businessData = useSelector((state) => state.business.value)
  const vendorData = useSelector((state) => state.vendor.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Vendors");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "vendors");
  const submenuArray = employeeSubmenu?.subMenu;
  console.log(vendorData, "vendorData")

  const handleAddVendor = (newVendor) => {
    dispatch(addVendor(newVendor));
  };

  const handleUpdateVendor = (updatedVendor) => {
    dispatch(updateVendor(updatedVendor));
  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteVendor(idToDelete));
  };

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Vendors Page</h2>
            {/* <EditVendor items={currentActiveMenu.subMenu} /> */}
            <EditItems items={submenuArray} />
            <div className="d-grid gap-2">
              <Button variant="primary">
                Block level button
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container">
          {/* <VendorComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          <CommonTable handleDelete={handleDeleteVendor} data={vendorData} />
        </Col>
      </Row>
    </Layout>
  );
};

export default VendorsPage;
