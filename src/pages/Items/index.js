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
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const itemData = {
    "itemCode": "sdddSDSADdsadode",
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
    data: itemData
  }

  const category = businessData?.categories?.find(category => category?.name === "Items");
  const subcategories = category?.subcategories?.find(sub => sub?.name === "items");
  const submenuArray = subcategories?.subMenu;
  // console.log(submenuArray, "submenuArray")

  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({});

  const oldItemsData = [...tableData]
  const handleAddVendor = () => {
    // if (selectedData.id.length > 0) {
    //   setIsValidPassword(false)
    //   setIsValidEmail(false)
    // } else {
    //   if (isValidEmail == true && isValidPassword == true) {
    //     mutation.mutate(payloadData)
    //   }
    // }
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
      console.log(data, "array data")
      console.log(typeof data)
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
  console.log(mutation?.data?.message, "mutation")
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
