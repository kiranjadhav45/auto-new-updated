import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";
import { PostApi } from "../../utils/PostApi";
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
import { updateState } from '../../features/item/itemsSlice'
import CommonTable from "../../components/common/commonTable";
import { addItem, deleteItem } from "../../features/item/itemsSlice"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
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
  const [disable, setDisable] = useState({});
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({
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
  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({
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
    images: ["ImageURL1", "ImageURL2"],
    currentStock: "",
    barcode: "",
    salesHistory: "LAST 2 DAYS",
    customNotes: "",
  });

  const itemData = {
    "itemCode": "sddsdSADdsadode",
    "itemName": "TestItemName",
    "itemCategory": "TestCategory",
    "itemSubCategory": "TestSubCategory",
    "itemPrice": 10,
    "ingredients": ["rotti", "chapati"],
    "recipe": "TestRecipe",
    "allergen": "TestAllergen",
    "portionSize": "TestPortionSize",
    "status": "Available",
    "tax": "21",
    "discount": "21",
    "images": ["ImageURL1", "ImageURL2"],
    "currentStock": 1,
    "barcode": "TestBarcode",
    "salesHistory": [{ "date": "2023-01-01T12:00:00.000Z", "action": "Sale" }],
    "customNotes": "TestNoteswbfn,cnlwe"
  }
  const payloadData = {
    url: "//v1/item",
    data: selectedData
  }

  const category = businessData?.categories?.find(category => category?.name === "Items");
  const subcategories = category?.subcategories?.find(sub => sub?.name === "items");
  const submenuArray = subcategories?.subMenu;
  // console.log(submenuArray, "submenuArray")



  const oldItemsData = [...tableData]
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
      dispatch(addItem(selectedData));
      mutation.mutate(payloadData)
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
      console.log(payloadData, "payloadData")
      // console.log("all values are false. Write something here.");
    } else {
      console.log("at least one value is true. Write something here.");
      console.log(payloadData, "payloadData in true state")
    }

  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteItem(idToDelete));
  };

  const handleEditTable = (event) => {
    setHandleUpdateAdd(false)
    setSelectedData(event)
  }
  const mutation = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      console.log(data, "data")
      // console.log(typeof data)
      if (data) {
        setShow(true)
        if (data.status = "success" && data.statuscode == 200) {
        } else {
          dispatch(updateState(oldItemsData))
        }
      }

      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })
  // console.log(mutation, "mutation")
  // console.log(errors, "errors")
  // console.log(selectedData, "selectedData")
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
      </div>
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Items</h2>
            {/* <EditItems items={submenuArray} /> */}
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
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
