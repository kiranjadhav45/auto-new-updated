import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";
import { PostApi } from "../../utils/PostApi";
import Layout from "../../components/common/Layout";
import { ToastContainer, toast } from 'react-toastify';
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
import { GetApi } from "../../utils/GetApi"
import { DeleteApi } from "../../utils/DeleteApi"
import { PutApi } from "../../utils/PutApi"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { AlertMessage } from "../../utils/constant"
const Items = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const businessData = useSelector((state) => state.business.value)
  const tableData = useSelector((state) => state.item.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const [disable, setDisable] = useState({
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
    customNotes: ""
  });
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
    customNotes: ""
  });

  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({
    itemCode: "",
    itemName: "",
    itemCategory: "",
    itemSubCategory: "",
    itemPrice: "",
    ingredients: ["rotti", "chapati"],
    recipe: "",
    allergen: "",
    portionSize: "",
    status: "",
    tax: "",
    discount: "",
    images: ["ImageURL1", "ImageURL2"],
    currentStock: "",
    barcode: "",
    salesHistory: [{ "date": "2023-01-01T12:00:00.000Z", "action": "Sale" }],
    customNotes: ""
  });

  const itemData = {
    "itemCode": "sddsdSADdsadode",
    "itemName": "TestItemName",
    "itemCategory": "TestCategory",
    "itemSubCategory": "TestSubCategory",
    "itemPrice": "10",
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

  const category = businessData?.categories?.find(category => category?.name === "Items");
  const subcategories = category?.subcategories?.find(sub => sub?.name === "items");
  const submenuArray = subcategories?.subMenu;

  // get items
  const { isLoading, data: items, error, refetch } = useQuery({ queryKey: ['items'], queryFn: () => GetApi("//v1/item") })

  // onClick add new vendor
  const handleEditTable = (event) => {
    const newErrors = { ...errors };
    submenuArray.forEach((submenuItem) => {
      newErrors[submenuItem.name] = false;
    });
    setErrors(newErrors);

    setHandleUpdateAdd(false)
    setSelectedData(event)

    let newData = { ...disable }
    newData.itemCode = true
    setDisable(newData)
    setSelectedData(event)
  }

  const payloadDataPost = {
    url: "//v1/item",
    data: selectedData
  }
  const payloadDataUpdate = {
    url: `//v1/item/${selectedData?.itemCode}`,
    data: selectedData,
  }

  const handleAddItems = () => {
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
      if (!submenuItem.required == true) {
        newErrors[submenuItem.name] = false;
      }
    });
    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      if (selectedData._id && !handleUpdateAdd) {
        // update vendor
        mutationUpdate.mutate(payloadDataUpdate)
        let newData = { ...disable }
        newData.vendorCode = false
        setDisable(newData)
        setSelectedData({
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
          currentStock: 1,
          barcode: "",
          salesHistory: "",
          customNotes: ""
        });
      } else {
        // add new vendor
        mutationPost.mutate(payloadDataPost)
        setHandleUpdateAdd(true)
        setSelectedData({
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
          customNotes: ""
        });
      }
    } else {
      setTimeout(() => {
        toast.error("please fill requied field", { AlertMessage });
      }, 100);
    }
  };


  // post mutation
  const mutationPost = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        if (data.status == "success") {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "error") {
          setTimeout(() => {
            toast.error(data.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "success" && data.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['items'] });
          setSelectedData({
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
            customNotes: ""
          })
        }
        if (data?.error.length > 0) {
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
        if (data.status == "success") {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "error") {
          setTimeout(() => {
            toast.error(data.message, { AlertMessage });
          }, 100);
        }
        if (data.status == "success" && data.statusCode == 200) {
          let newData = { ...disable }
          newData.itemCode = false
          setDisable(newData)
          queryClient.invalidateQueries({ queryKey: ['items'] });
          setSelectedData({
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
            customNotes: ""
          })
        }
        if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })

  // delete items
  const handleDeleteItems = (idToDelete) => {
    const deletePayloadData = {
      url: "//v1/item/",
      id: idToDelete?.itemCode
    }
    mutationDelete.mutate(deletePayloadData)
    // dispatch(deleteVendor(idToDelete));
  };

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
            toast.error(data.message, { AlertMessage });
          }, 100);
        }
        if (data?.status == "success" && data?.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['items'] });
        }
        if (data?.error.length > 0) {
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
            <h2>Items</h2>
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button disabled={mutationPost.isPending || mutationUpdate.isPending} onClick={handleAddItems} variant="primary">
                {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Item" : "Update Item"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col-lg-16 col-24 col-responsive-table-container">
          <CommonTable headerData={submenuArray} handleEditTable={handleEditTable} handleDelete={handleDeleteItems}
            // data={tableData}
            data={items?.body}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Items;
