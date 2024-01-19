// const CustomerMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import { AlertMessage } from "../../utils/constant"
import {
  ListGroup,
  Form,
  Container,
  Row,
  Col,
  Breadcrumb,
} from "react-bootstrap";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { PostApi } from "../../utils/PostApi";
import { useSelector, useDispatch } from 'react-redux'
import { updateLevelThree } from '../../features/business/businessSlice'
const CustomerMaster = ({ currentActiveMenu }) => {
  const dispatch = useDispatch()
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const businessData = useSelector((state) => state.business.value);
  const Category = businessData?.categories?.find(
    (category) => category?.name === "Customers"
  );
  const subCategory = Category?.subcategories?.find(
    (sub) => sub?.name === "customer"
  );
  const submenuArray = subCategory?.subMenu;
  console.log(submenuArray, "submenuArray")

  const handleSubMenuSelect = (menuItem) => {
    setSelectedSubMenu(menuItem);
  };

  const handleSubmenuChange = (menuItem) => {
    if (menuItem?.default == true) {
      setTimeout(() => {
        toast.error("can not change default menu", { AlertMessage });
      }, 100);
    } else {
      const newmenuItem = { ...menuItem }
      newmenuItem.isActive = !newmenuItem.isActive
      console.log("clicked")
      const payload = {
        url: "//v1/update_submenus",
        data: newmenuItem
      }
      dispatch(updateLevelThree(menuItem))
      updateItems.mutate(payload)
    }
  }

  const updateItems = useMutation({
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

        }
      }
    },
  })


  const renderSubMenu = (menuItem) => (
    <ListGroup.Item
      key={menuItem.name}
      onClick={() => handleSubMenuSelect(menuItem)}
      active={selectedSubMenu === menuItem}
      style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: selectedSubMenu === menuItem ? "#007bff" : "inherit",
        color: selectedSubMenu === menuItem ? "#fff" : "inherit",
      }}
    >
      <span>{menuItem.title}</span>
      <Form.Check
        type="switch"
        id={`submenu-switch-${menuItem.name}`}
        label=""
        checked={menuItem.isActive}
        onChange={() => handleSubmenuChange(menuItem)}
      // onChange={() => { dispatch(updateLevelThree(menuItem)) }}
      />
    </ListGroup.Item>
  );

  return (
    <Container fluid>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <h2>Customer Master</h2>
      <Row>
        <Col xs={24} md={12} lg={6}>
          {currentActiveMenu?.subMenu && (
            <ListGroup>
              {/* {currentActiveMenu.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {/* {businessData?.categories[1]?.subcategories[3].subMenu?.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {submenuArray?.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerMaster;
