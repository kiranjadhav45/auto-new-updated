import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Collapse,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  ListGroup,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import React, { useState } from "react";
import "./styles.css";

import "../../App.css";
import {
  FcFactoryBreakdown,
  FcAdvertising, // noti
  FcLike, //heart0
  FcSearch, //search
  FcBriefcase, //brief case
} from "react-icons/fc";
import { useSelector } from "react-redux";
const TopNavBar = ({ selectedMenu, defaultMenu, setCurrentActiveMenu }) => {
  const businessData = useSelector((state) => state.business.value);
  const iconStyles = {
    //padding: "10px",
    marginLeft: 10,
    marginRight: 10,
  };
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  const [showMenu4, setShowMenu4] = useState(false);
  const handleMenuClick = (menuNumber) => {
    setShowMenu1(menuNumber === 1 ? !showMenu1 : false);
    setShowMenu2(menuNumber === 2 ? !showMenu2 : false);
    setShowMenu3(menuNumber === 3 ? !showMenu3 : false);
    setShowMenu4(menuNumber === 4 ? !showMenu4 : false);
  };
  const divStyle = {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };

  return (
    <Navbar bg="light" style={{ borderWidth: 2 }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        className="justify-content-between"
      >
        <Nav>
          {businessData && businessData.name && (
            <Nav.Link
              href="#home"
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: "5px",
                marginRight: "25px",
              }}
            >
              {/* {selectedMenu?.name ? selectedMenu?.name : defaultMenu.title} */}
              {businessData.name}
            </Nav.Link>
          )}
          <ButtonGroup size="sm">
            {selectedMenu?.subcategories
              ? selectedMenu.subcategories.map((key, index) => (
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => setCurrentActiveMenu(key)}
                  >
                    {key.title}
                  </Button>
                ))
              : defaultMenu?.defaultMenu.map((key) => (
                  <Button variant="light" size="sm">
                    {key.title}
                  </Button>
                ))}
          </ButtonGroup>
        </Nav>

        <Nav style={{ marginRight: 25 }}>
          <Nav.Link className="top-nav-icon-search" href="#login">
            {showMenu1 && (
              <div>
                {/* <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className=""
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel> */}
                <input placeholder="Search..." className="top-nav-input" />
              </div>
            )}
            <FcSearch
              style={iconStyles}
              size={25}
              onClick={() => handleMenuClick(1)}
            />
          </Nav.Link>
          <Nav.Link href="#login" className="top-nav-icons">
            <FcBriefcase
              style={iconStyles}
              size={25}
              onClick={() => handleMenuClick(2)}
            />
            {showMenu2 && (
              <ListGroup className="list-items-top-navbar">
                <div></div>
              </ListGroup>
            )}
          </Nav.Link>
          <Nav.Link href="#login" className="top-nav-icons">
            <FcAdvertising
              style={iconStyles}
              size={25}
              onClick={() => handleMenuClick(3)}
            />
            {showMenu3 && (
              <>
                <div className="d-flex justify-content-center">
                  <div className="text-truncate text-primary tail-notification"></div>
                </div>
                <ListGroup className="list-items-top-navbar ">
                  <ListGroup.Item className="text-truncate text-primary">
                    Cras justo odio Cras justo odio
                  </ListGroup.Item>
                  <ListGroup.Item className="text-truncate text-primary">
                    Cras justo odio Cras justo odio
                  </ListGroup.Item>
                  <ListGroup.Item className="text-truncate text-primary">
                    Cras justo odio Cras justo odio
                  </ListGroup.Item>
                  <ListGroup.Item className="text-truncate text-primary">
                    Cras justo odio Cras justo odio
                  </ListGroup.Item>
                </ListGroup>
              </>
            )}
          </Nav.Link>
          <Nav.Link href="#login" className="top-nav-icons">
            <span onClick={() => handleMenuClick(4)}>Naved Naik</span>
            {showMenu4 && (
              <>
                <div
                  // style={{ position: "relative", zIndex: "-1" }}
                  className="d-flex justify-content-center "
                >
                  <div className="text-truncate text-primary tail-notification"></div>
                </div>
                <ListGroup className="list-items-top-profile">
                  <div className="profile-pop-up-container">
                    <div className="d-flex justify-content-center">
                      <img
                        className="profile-photo-style"
                        src="https://sarahclaysocial.com/wp-content/uploads/2020/10/sarah-clay-3.jpg"
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <span>Name:</span>
                      <span className="ps-2">
                        <b>Neha Jadhav</b>
                      </span>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <span>Role:</span>
                      <span className="ps-2">
                        <b>Admin</b>
                      </span>
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      <Button
                        className="buttons-profile"
                        variant="danger"
                        size="sm"
                      >
                        <TbLogout2 /> Logout
                      </Button>
                      <Button
                        className="buttons-profile"
                        variant="success"
                        size="sm"
                      >
                        <CgProfile /> Profile
                      </Button>{" "}
                    </div>
                  </div>
                </ListGroup>
              </>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavBar;
