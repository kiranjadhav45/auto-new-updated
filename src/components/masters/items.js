// const ItemsMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import {
  ListGroup,
  Form,
  Container,
  Row,
  Col,
  Breadcrumb,
} from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { PostApi } from "../../utils/PostApi";
import { updateLevelThree } from '../../features/business/businessSlice'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'

const ItemsMaster = ({ currentActiveMenu }) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const businessData = useSelector((state) => state.business.value)
  const [newItemsData, setNewItemsData] = useState(businessData?.categories[1]?.subcategories[1].subMenu)
  // console.log(businessData.categories[1].subcategories[1].subMenu)
  // console.log(newItemsData)
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const master = businessData.categories.find((item) => item.name == "Masters")
  const items = businessData.categories.find((item) => item.name == "Items")
  const item = businessData.categories.find((item) => item.name == "items")
  // const itemsSubmenu = item.subMenu
  const handleSubMenuSelect = (menuItem) => {
    setSelectedSubMenu(menuItem);
  };

  const employeesCategory = businessData?.categories?.find(category => category?.name === "Masters");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "itemMaster");
  const submenuArray = employeeSubmenu?.subMenu;
  // console.log(submenuArray, "submenuArray")

  const itemsCategory = businessData?.categories?.find(category => category?.name === "Items");
  const itemsSubmenu = itemsCategory?.subcategories?.find(sub => sub?.name === "items");
  const submenuArrayofItems = itemsSubmenu?.subMenu;
  console.log(submenuArrayofItems, "submenuArrayofItems")



  const handleSubmenuChange = (menuItem) => {
    if (menuItem?.default == true) {
      setShow(true)
      setMessage("can not change default menu")
      setTimeout(function () {
        setShow(false)
      }, 3000);
    } else {
      const newmenuItem = { ...menuItem }
      newmenuItem.isActive = !newmenuItem.isActive
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
        setShow(true)
        setMessage(data.message)
        if (data.status == "success" && data.statusCode == 200) {

        }
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
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
      />
    </ListGroup.Item>
  );
  return (
    <Container fluid>
      <div className="alert-position" >
        {show && (
          <Alert variant="danger">
            <p>{message}</p>
          </Alert>
        )}
      </div>
      <h2>Items</h2>
      <Row>
        <Col xs={24} md={12} lg={6}>
          {/* {currentActiveMenu?.subMenu && (
            <ListGroup>
              {currentActiveMenu.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )} */}
          {newItemsData && (
            <ListGroup>
              {/* {businessData?.categories[1]?.subcategories[1].subMenu?.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {/* {submenuArray?.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {submenuArrayofItems && submenuArrayofItems?.map((menuItem) =>
                renderSubMenu(menuItem)
              )}
            </ListGroup>
          )}
        </Col>
      </Row>
      {/* <button>submit</button> */}
    </Container>

  );
};

export default ItemsMaster;
