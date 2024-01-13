// const TaxMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
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
import { useSelector, useDispatch } from 'react-redux'
import { PostApi } from "../../utils/PostApi";
import { updateLevelThree } from '../../features/business/businessSlice'

const TaxMaster = ({ currentActiveMenu }) => {
  const businessData = useSelector((state) => state.business.value)
  const dispatch = useDispatch()
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Masters");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "taxMaster");
  const submenuArray = employeeSubmenu?.subMenu;
  // console.log(submenuArray, "submenuArray")

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
        // if (data.status == "success" && data.statusCode == 200) { }
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
      <h2>Tax Master</h2>
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
      <Row>
        <Col xs={24} md={12} lg={6}>
          {currentActiveMenu?.subMenu && (
            <ListGroup>
              {/* {currentActiveMenu.subMenu.map((menuItem) =>
                renderSubMenu(menuItem)
              )} */}
              {/* {businessData?.categories[1]?.subcategories[2].subMenu?.map((menuItem) =>
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

export default TaxMaster;
