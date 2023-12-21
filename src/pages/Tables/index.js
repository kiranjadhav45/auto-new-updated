import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row, Button } from "react-bootstrap";
import EditTables from "../../components/tables/editTables";
import TablesComponent from "../../components/tables";
import { useSelector, useDispatch } from 'react-redux'
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
import { addTable, deleteTable } from "../../features/table/tableSlice"
const TablesPage = () => {
  const dispatch = useDispatch();
  const businessData = useSelector((state) => state.business.value)
  const tableData = useSelector((state) => state.table.value)
  const [currentActiveMenu, setCurrentActiveMenu] = useState({
    isActive: true,
    name: "index",
    subMenu: [{}],
    title: "Index",
  });
  const employeesCategory = businessData?.categories?.find(category => category?.name === "Tables");
  const employeeSubmenu = employeesCategory?.subcategories?.find(sub => sub?.name === "tables");
  const submenuArray = employeeSubmenu?.subMenu;

  const [handleUpdateAdd, setHandleUpdateAdd] = useState(true)
  const [selectedData, setSelectedData] = useState({});
  const handleAddVendor = () => {
    dispatch(addTable(selectedData));
    setSelectedData({
      id: "",
      tableCode: "",
      tableName: "",
      tableStatus: "",
      tablePlacement: "",
      tableQR: "",
    });
    setHandleUpdateAdd(true)
  };

  const handleDeleteVendor = (idToDelete) => {
    dispatch(deleteTable(idToDelete));
  };

  const handleEditTable = (event) => {
    setHandleUpdateAdd(false)
    console.log(event)
    setSelectedData(event)
  }


  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-8">
          <div style={{ borderWidth: 1 }}>
            <h2>Tables</h2>
            {/* <EditTables items={currentActiveMenu.subMenu} /> */}
            {/* <EditItems items={submenuArray} /> */}
            <EditItems selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button onClick={handleAddVendor} variant="primary">
                {handleUpdateAdd == true ? "Add New Table" : "Update Table"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col col-responsive-table-container">
          {/* <TablesComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          {/* <CommonTable data={data} title={"Tables Data"} /> */}
          <CommonTable handleEditTable={handleEditTable} handleDelete={handleDeleteVendor} data={tableData} />
        </Col>
      </Row>
    </Layout>
  );
};

export default TablesPage;
