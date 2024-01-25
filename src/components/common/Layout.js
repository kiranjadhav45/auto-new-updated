// Layout.js

import React, { useState, useEffect } from "react";
import TopNavBar from "./TopNavbar";
import bundleData from "../../data.json";
// import mainData from "../../business.json";
import BottomNavBar from "./BottomNavbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateBusiness } from '../../features/business/businessSlice'
import { useLocation } from "react-router-dom";
const Layout = ({ children, currentActiveMenu, setCurrentActiveMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const businessData = useSelector((state) => state.business.value)
  // const [dataToPerform, setDataToPerform] = useState(bundleData.resto);
  const [dataToPerform, setDataToPerform] = useState(businessData);
  const [selectedMenu, setSelectedMenu] = useState(location.state?.selectedMenu || null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [defautName, setDefaultName] = useState({
    // title: mainData?.businesses[0].name,
    // defaultMenu: mainData?.businesses[0].defaultMenu,
    title: businessData.name,
    defaultMenu: businessData.defaultMenu,
  });
  const handleSelect = (menu, index) => {
    // setSelectedMenu(menu);
    // navigate(menu?.path);

    setSelectedMenu(menu);
    // Update URL with selected menu information
    navigate(menu?.path, { state: { selectedMenu: menu } });
  };


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className={isSmallScreen ? 'bottom-navbar-componat-container' : ' col-1'}>
          <BottomNavBar
            onSelect={handleSelect}
            mainMenu={dataToPerform[0]}
            menu={businessData}
          />
        </div>
        <div style={{ position: "relative" }} className={isSmallScreen ? 'col-24' : 'col-23'}>
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
