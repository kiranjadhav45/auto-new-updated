import React, { useState } from "react";
import TopNavBar from "../../components/common/TopNavbar";
import BottomNavBar from "../../components/common/BottomNavbar";

import Layout from "../../components/common/Layout";
import { Col, Row } from "react-bootstrap";
import ItemsMaster from "../../components/masters/items";
import TaxMaster from "../../components/masters/tax";
import CustomerMaster from "../../components/masters/customer";
import EmployeeMaster from "../../components/masters/employee";
import MasterComponent from "../../components/masters";
import mainData from "../../business.json";
const Masters = () => {
  const [dataToPerform, setDataToPerform] = useState(
    mainData.businesses.filter((i) => i.type === "resto")
  );
  console.log("daya to perform...", dataToPerform);
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      {currentActiveMenu.name == "itemMaster" ? (
        <ItemsMaster
          currentActiveMenu={currentActiveMenu}
          setCurrentActiveMenu={setCurrentActiveMenu}
        />
      ) : currentActiveMenu.name == "taxMaster" ? (
        <TaxMaster
          currentActiveMenu={currentActiveMenu}
          setCurrentActiveMenu={setCurrentActiveMenu}
        />
      ) : currentActiveMenu.name == "customerMaster" ? (
        <CustomerMaster
          currentActiveMenu={currentActiveMenu}
          setCurrentActiveMenu={setCurrentActiveMenu}
        />
      ) : currentActiveMenu.name == "employeeMaster" ? (
        <EmployeeMaster
          currentActiveMenu={currentActiveMenu}
          setCurrentActiveMenu={setCurrentActiveMenu}
        />
      ) : currentActiveMenu.name === "menuMaster" ? (
        <MasterComponent categories={dataToPerform[0].categories} />
      ) : (
        <EmployeeMaster
          currentActiveMenu={currentActiveMenu}
          setCurrentActiveMenu={setCurrentActiveMenu}
        />
      )}
    </Layout>
  );
};

export default Masters;
