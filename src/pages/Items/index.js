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
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
import Input from "../../components/common/Input";
import CommonTable from "../../components/common/commonTable";
import { addItem, deleteItem } from "../../features/item/itemsSlice"
const Items = () => {
  const dispatch = useDispatch()
  const businessData = useSelector((state) => state.business.value)
  const tableData = useSelector((state) => state.item.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });

  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Items");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "items");
  const submenuArray = employeeSubmenu?.subMenu;
  console.log(submenuArray, "submenuArray")

  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({});
  const handleAddVendor = () => {
    dispatch(addItem(selectedData));
    setSelectedData({
      id: "",
      itemCode: "",
      itemName: "",
      itemCategory: "",
      itemSubCategory: "",
      itemPrice: "",
      ingredients: "",
      recipe: "",
      allergen: "",
      portionSize: "",
      status: "",
      tax: "",
      discount: "",
      images: "",
      currentStock: "",
      barcode: "",
      salesHistory: "",
      customNotes: "",
    });
    setHandleUpdateAdd(true)
  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteItem(idToDelete));
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
            <h2>Items</h2>
            {/* <EditItems items={submenuArray} /> */}
            <EditItems selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button onClick={handleAddVendor} variant="primary">
                {handleUpdateAdd == true ? "Add New Item" : "Update Item"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container">
          {/* <ItemsComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          {/* <CommonTable data={data} title={"Items Data"} /> */}
          <CommonTable handleEditTable={handleEditTable} handleDelete={handleDeleteVendor} data={tableData} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Items;
