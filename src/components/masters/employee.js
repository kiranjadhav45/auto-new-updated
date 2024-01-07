// const EmployeeMaster = ({ currentActiveMenu, setCurrentActiveMenu }) => {
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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { updateLevelThree } from '../../features/business/businessSlice'
import { PostApi } from "../../utils/PostApi";
const EmployeeMaster = ({ currentActiveMenu }) => {
  const businessData = useSelector((state) => state.business.value)
  const dispatch = useDispatch()
  const [selectedSubMenu, setSelectedSubMenu] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Masters");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "employeeMaster");
  const submenuArray = employeeSubmenu?.subMenu;
  // console.log(submenuArray, "submenuArray")

  const handleSubMenuSelect = (menuItem) => {
    setSelectedSubMenu(menuItem);
  };

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
      // onChange={() => { dispatch(updateLevelThree(menuItem)) }}
      />
    </ListGroup.Item>
  );

  return (
    <Container fluid>
      <h2>Employee Master</h2>
      <div className="alert-position" >
        {show && (
          <Alert variant="danger">
            <p>{message}</p>
          </Alert>
        )}
      </div>
      <Row>
        <Col xs={12} md={4}>
          {currentActiveMenu?.subMenu && (
            <ListGroup>
              {/* {businessData?.categories[1]?.subcategories[4].subMenu?.map((menuItem) =>
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

export default EmployeeMaster;
