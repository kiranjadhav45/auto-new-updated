// Layout.js

import React, { useState } from "react";
import TopNavBar from "./TopNavbar";
import bundleData from "../../data.json";
// import mainData from "../../business.json";
import BottomNavBar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
const Layout = ({ children, currentActiveMenu, setCurrentActiveMenu }) => {
  const navigate = useNavigate();
  const businessData = useSelector((state) => state.business.value)
  // const [dataToPerform, setDataToPerform] = useState(bundleData.resto);
  const [dataToPerform, setDataToPerform] = useState(businessData);
  const [selectedMenu, setSelectedMenu] = useState("Clean Slate");

  const [defautName, setDefaultName] = useState({
    // title: mainData?.businesses[0].name,
    // defaultMenu: mainData?.businesses[0].defaultMenu,
    title: businessData.name,
    defaultMenu: businessData.defaultMenu,
  });
  const handleSelect = (menu, index) => {
    navigate(menu?.path);
    setSelectedMenu(menu);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bottom-navbar-componat-container col-1">
          <BottomNavBar
            onSelect={handleSelect}
            mainMenu={dataToPerform[0]}
            menu={businessData}
          />
        </div>
        <div style={{ position: "relative" }} className="col">
          <TopNavBar
            selectedMenu={selectedMenu}
            defaultMenu={defautName}
            setCurrentActiveMenu={setCurrentActiveMenu}
          />
          <div className="children-componts-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
