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
import { FiAlignRight } from "react-icons/fi";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./styles.css";
import { jwtDecode } from "jwt-decode";
import "../../App.css";
import {
  FcFactoryBreakdown,
  FcAdvertising, // noti
  FcLike, //heart0
  FcSearch, //search
  FcBriefcase, //brief case
} from "react-icons/fc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../user/profileDetails";
const TopNavBar = ({ selectedMenu, defaultMenu, setCurrentActiveMenu }) => {
  const navigate = useNavigate();
  // const businessData = useSelector((state) => state.business.value);
  const businessData = useSelector(
    useMemo(() => (state) => state.business.value, [])
  );
  const [businessName, setBusinessName] = useState("");
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  const [showMenu4, setShowMenu4] = useState(false);
  const [showMenu5, setShowMenu5] = useState(false);

  // const handleMenuClick = (menuNumber) => {
  //   setShowMenu1(menuNumber === 1 ? !showMenu1 : false);
  //   setShowMenu2(menuNumber === 2 ? !showMenu2 : false);
  //   setShowMenu3(menuNumber === 3 ? !showMenu3 : false);
  //   setShowMenu4(menuNumber === 4 ? !showMenu4 : false);
  //   setShowMenu5(menuNumber === 5 ? !showMenu5 : false);
  // };
  const handleMenuClick = useCallback((menuNumber) => {
    setShowMenu1(menuNumber === 1 ? !showMenu1 : false);
    setShowMenu2(menuNumber === 2 ? !showMenu2 : false);
    setShowMenu3(menuNumber === 3 ? !showMenu3 : false);
    setShowMenu4(menuNumber === 4 ? !showMenu4 : false);
    setShowMenu5(menuNumber === 5 ? !showMenu5 : false);
  });
  const divStyle = {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setBusinessName(decoded?.businessName);
      console.log(decoded, "decoded JWT payload");
      console.log(decoded, "decoded...");
    } catch (error) {
      console.error("Error decoding:", error);
    }
  }, []);
  return (
    <>
      <Navbar bg="light" style={{ borderWidth: 2 }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            {businessData && businessData.name && (
              <Nav.Link href="/home" className="bussness-name">
                {businessName && businessName}
              </Nav.Link>
            )}
            <ButtonGroup className="top-navbar" size="sm">
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
            <Nav.Link className="top-nav-icon-search" href="#">
              {showMenu1 && (
                <div className="search-input-box-container-navbar">
                  <input placeholder="Search..." className="top-nav-input" />
                </div>
              )}
              <div className="d-flex justify-content-center align-items-center">
                <FcSearch
                  className="icons-navbar"
                  size={25}
                  onClick={() => handleMenuClick(1)}
                />
              </div>
            </Nav.Link>
            <Nav.Link href="#" className="top-nav-icons bag-navbar">
              <div className="d-flex justify-content-center align-items-center">
                <FcBriefcase
                  className="icons-navbar"
                  size={25}
                  onClick={() => handleMenuClick(2)}
                />
              </div>
              {showMenu2 && (
                <ListGroup className="list-items-top-navbar">
                  <div></div>
                </ListGroup>
              )}
            </Nav.Link>
            <Nav.Link href="#" className="top-nav-icons">
              <FcAdvertising
                className="icons-navbar"
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
            <Nav.Link href="#" className="top-nav-icons">
              <div
                className="d-flex profile-image-container"
                onClick={() => handleMenuClick(4)}
              >
                <img
                  className=""
                  src="https://i.ibb.co/wp3Jzcr/Whats-App-Image-2024-01-09-at-1-20-52-PM.jpg"
                  alt=""
                />
                <span className="ps-2">{businessName && businessName}</span>
              </div>
              {showMenu4 && (
                <>
                  <div className="d-flex justify-content-center ">
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
                          <b>{businessName && businessName}</b>
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
                          onClick={() => navigate("/profile")}
                        >
                          <CgProfile /> Profile
                        </Button>{" "}
                      </div>
                    </div>
                  </ListGroup>
                </>
              )}
            </Nav.Link>
            <Nav.Link href="#" className=" menu-button-navbar">
              <div
                className="d-flex profile-image-container"
                onClick={() => handleMenuClick(5)}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <FiAlignRight className="icons-navbar" size={25} />
                </div>
              </div>
              {showMenu5 && (
                <div className="menu-List-of-nav-submenu">
                  <div
                    style={{ width: "100%" }}
                    className="menu-mobile-container"
                  >
                    <div
                      style={{ width: "100%" }}
                      className="menu-mobile-container"
                    >
                      {selectedMenu?.subcategories
                        ? selectedMenu.subcategories.map((key, index) => (
                            <div
                              variant="light"
                              size="sm"
                              onClick={() => {
                                setCurrentActiveMenu(key);
                                handleMenuClick(5);
                              }}
                            >
                              {key.title}
                            </div>
                          ))
                        : defaultMenu?.defaultMenu.map((key) => (
                            <div variant="light" size="sm">
                              {key.title}
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
const MemoizedMyComponent = React.memo(TopNavBar);
export default MemoizedMyComponent;
// export default TopNavBar;
