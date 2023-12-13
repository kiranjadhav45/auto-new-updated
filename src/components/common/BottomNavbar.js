import React, { useState } from "react";
import { Container, Row, Col, Button, Nav, Navbar } from "react-bootstrap";

import {
  FcSettings,
  FcInTransit,
  FcBearish,
  FcAssistant,
  FcDiploma1,
  FcKindle,
  FcFlowChart,
  FcPortraitMode,
  FcSearch,
  FcViewDetails,
  FcGlobe
} from "react-icons/fc";

const BottomNavBar = ({ onSelect, mainMenu, menu }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentActiveMenu, setCurrentActiveMenu] = useState();

  const handleMouseEnter = (currentMenu) => {
    setCurrentActiveMenu(currentMenu);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setCurrentActiveMenu("");
    setIsHovered(false);
  };

  const hoverStyles = {
    transform: isHovered ? "scale(1.2)" : "scale(1)",
    transition: "transform 0.2s",
  };

  const icons = [
    { icon: FcSearch, size: 20, color: "red", name: "Masterss" },
    { icon: FcSettings, size: 20, color: "red", name: "Masters" },
    { icon: FcViewDetails, size: 20, color: "blue", name: "Invoices" },
    // { icon: FcInTransit, size: 20, color: "red", name: "Inventory" },
    { icon: FcBearish, size: 20, color: "blue", name: "Reports" },
    { icon: FcAssistant, size: 20, color: "blue", name: "Customers" },
    { icon: FcDiploma1, size: 20, color: "blue", name: "Profile" },
    { icon: FcKindle, size: 20, color: "blue", name: "Items" },
    { icon: FcFlowChart, size: 20, color: "blue", name: "Tables" },
    { icon: FcPortraitMode, size: 20, color: "blue", name: "Employees" },
    { icon: FcInTransit, size: 20, color: "blue", name: "Vendors" },
    { icon: FcViewDetails, size: 20, color: "blue", name: "Orders" },
  ];
  const findIcon = (iconToFind) => {
    let test = icons.filter((i) => i.name == iconToFind);
    return test[0].icon ? test[0].icon : icons[0].icon;
  };
  return (
    <Nav className="flex-column" style={{ marginTop: 20 }}>
      <Navbar.Brand style={{ marginLeft: 10, marginBottom: 20 }} href="#home">
        <FcGlobe size={35} />
      </Navbar.Brand>
      <Col lg="auto">
        {menu.categories.map((key, index) => (
          <Button
            key={index}
            style={currentActiveMenu === index ? { ...hoverStyles } : {}}
            variant="white"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelect(key)}
          >
            {React.createElement(findIcon(key.icon), {
              size: 25,
            })}
          </Button>
        ))}
      </Col>
    </Nav>
  );
};

export default BottomNavBar;
