import React, { useState } from "react";
import Layout from "../../components/common/Layout";
import { Col, Row, Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import EditTables from "../../components/tables/editTables";
import TablesComponent from "../../components/tables";
import { useSelector, useDispatch } from 'react-redux'
import EditItems from "../../components/items/editItems";
import CommonTable from "../../components/common/commonTable";
import { GetApi } from "../../utils/GetApi"
import { DeleteApi } from "../../utils/DeleteApi"
import { PutApi } from "../../utils/PutApi"
import { PostApi } from "../../utils/PostApi"
import { addTable, deleteTable } from "../../features/table/tableSlice"
import { AlertMessage } from "../../utils/constant"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
const TablesPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient()
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
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedData, setSelectedData] = useState({
    tableCode: "",
    tableName: "",
    tableStatus: "",
    tablePlacement: "",
    tableQR: "",
  });
  const [errors, setErrors] = useState({
    tableCode: "",
    tableName: "",
    tableStatus: "",
    tablePlacement: "",
    tableQR: "",
  });

  const [disable, setDisable] = useState({
    tableCode: "",
    tableName: "",
    tableStatus: "",
    tablePlacement: "",
    tableQR: "",
  });
  const handleAddVendor = () => {
    dispatch(addTable(selectedData));
    setSelectedData({
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

  // get items
  const { isLoading, data: table, error, refetch } = useQuery({ queryKey: ['table'], queryFn: () => GetApi("/v1/table") })

  // post items

  const handleEditTable = (event) => {
    const newErrors = { ...errors };
    submenuArray.forEach((submenuItem) => {
      newErrors[submenuItem.name] = false;
    });
    setErrors(newErrors);

    console.log(event, "handleUpdateAdd")
    setHandleUpdateAdd(false)
    setSelectedData(event)

    let newData = { ...disable }
    newData.tableCode = true
    setDisable(newData)
    setSelectedData(event)
  }
  const payloadDataPost = {
    url: "/v1/table",
    data: selectedData
  }
  const payloadDataUpdate = {
    url: `/v1/table/${selectedData?.tableCode}`,
    data: selectedData,
  }

  const handleAddTable = () => {
    const newErrors = { ...errors };
    for (const key in selectedData) {
      if (selectedData.hasOwnProperty(key) && newErrors.hasOwnProperty(key)) {
        if (selectedData[key] === "") {
          newErrors[key] = true;
        }
      }
    }
    // Iterate through submenuArray for required fields
    submenuArray.forEach((submenuItem) => {
      if (!submenuItem.required) {
        console.log("clicked")
        newErrors[submenuItem.name] = false;
      }
    });
    setErrors(newErrors);
    const anyErrorIsTrue = Object.values(newErrors).some(value => value === true);
    if (!anyErrorIsTrue) {
      console.log(handleUpdateAdd)
      if (selectedData?._id && !handleUpdateAdd) {
        console.log("clecked")
        // update vendor
        mutationUpdate.mutate(payloadDataUpdate)
        let newData = { ...disable }
        newData.tableCode = false
        setHandleUpdateAdd(true)
        setDisable(newData)
        setSelectedData({
          tableCode: "",
          tableName: "",
          tableStatus: "",
          tablePlacement: "",
          tableQR: "",
        });
      } else {
        // add new vendor
        mutationPost.mutate(payloadDataPost)
        setSelectedData({
          tableCode: "",
          tableName: "",
          tableStatus: "",
          tablePlacement: "",
          tableQR: "",
        });
      }
    } else {
      setTimeout(() => {
        toast.error("please fill requied field", { AlertMessage });
      }, 100);
    }
  };


  // post mutation
  const mutationPost = useMutation({
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
        if (data.status == "success" && data.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['table'] });
          setSelectedData({
            tableCode: "",
            tableName: "",
            tableStatus: "",
            tablePlacement: "",
            tableQR: "",
          })
        }
        if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })

  // update mutation 
  const mutationUpdate = useMutation({
    mutationFn: PutApi,
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
        if (data.status == "success" && data.statusCode == 200) {
          queryClient.invalidateQueries({ queryKey: ['table'] });
          setSelectedData({
            tableCode: "",
            tableName: "",
            tableStatus: "",
            tablePlacement: "",
            tableQR: "",
          })
        }
      } else if (data?.error.length > 0) {
        setTimeout(() => {
          toast.error(data?.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }, 100);
      }
    },
  })

  // delete tables 
  const handleDeleteTable = (idToDelete) => {
    const deletePayloadData = {
      url: "/v1/table/",
      id: idToDelete?.tableCode
    }
    mutationDelete.mutate(deletePayloadData)
    // dispatch(deleteVendor(idToDelete));
  };

  const mutationDelete = useMutation({
    mutationFn: DeleteApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        if (data?.status == "success" && data?.statusCode == 200) {
          setTimeout(() => {
            toast.success(data.message, { AlertMessage });
          }, 100);
          queryClient.invalidateQueries({ queryKey: ['table'] });
        } else if (data?.error.length > 0) {
          setTimeout(() => {
            toast.error(data?.error, { AlertMessage });
          }, 100);
        }
      }
    },
  })

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Row className="mt-1">
        <Col className="col-lg-8 col-24">
          <div style={{ borderWidth: 1 }}>
            <h2>Tables</h2>
            {/* <EditTables items={currentActiveMenu.subMenu} /> */}
            {/* <EditItems items={submenuArray} /> */}
            <EditItems disable={disable} setDisable={setDisable} errors={errors} setErrors={setErrors} selectedData={selectedData} setSelectedData={setSelectedData} items={submenuArray} />
            <div className="d-grid gap-2">
              <Button disabled={mutationPost.isPending || mutationUpdate.isPending} onClick={handleAddTable} variant="primary">
                {mutationPost.isPending || mutationUpdate.isPending ? "loading" : handleUpdateAdd == true ? "Add New Table" : "Update Table"}
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col-lg-16 col-24 col-responsive-table-container">
          {/* <TablesComponent
            currentActiveMenu={currentActiveMenu}
            setCurrentActiveMenu={setCurrentActiveMenu}
          /> */}
          {/* <CommonTable data={data} title={"Tables Data"} /> */}
          <CommonTable
            headerData={submenuArray}
            handleEditTable={handleEditTable}
            handleDelete={handleDeleteTable}
            // data={tableData} 
            data={table?.body}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default TablesPage;
