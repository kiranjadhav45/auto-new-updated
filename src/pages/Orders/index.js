import React, { useEffect, useState, useRef } from "react";
import { Form, Table, Button, FloatingLabel, Col, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Layout from "../../components/common/Layout";
import { ItemsData } from "../../products";
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { addProduct, removeProduct, increseQuantity, dcreaseQuantity, removeAllProducts, addBill } from "../../features/bill/billSlice";
import { useDispatch, useSelector } from 'react-redux'
import { PostApi } from "../../utils/PostApi";
import { GetApi } from "../../utils/GetApi";
import { useReactToPrint } from 'react-to-print';
import { MdDelete } from "react-icons/md";
import debounce from "lodash.debounce";
import { ToastContainer, toast } from 'react-toastify';
import { AlertMessage } from "../../utils/constant"
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query'
import { useSearchParams } from "react-router-dom";
const OrdersPage = ({ currentActiveMenu, setCurrentActiveMenu, mainMenu }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams({ search: '' })
  const bill = useSelector((state) => state.bill.products)
  const [products, setProducts] = useState(ItemsData)
  // const [search, setSearch] = useState("");
  const [searchedProduct, setsearchedProduct] = useState(false);
  // const [currentBillProduct, setCurrentBillProduct] = useState(false);
  const [totalBill, setTotalBill] = useState(0);

  let search = searchParams.get('search') || ""
  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value
    debounce(
      () => {
        setSearchParams({ search: value });
        queryClient.invalidateQueries({ queryKey: ['searched', search] });
      }, 1000)
    const searchedItems = products.filter((item) => item.itemName.includes(value));
    setsearchedProduct(searchedItems);
  }
  useEffect(() => {
    const totalPrice = bill?.reduce((acc, product) => {
      const productPrice = product.quantity * product.itemPrice;
      return acc + productPrice;
    }, 0);
    setTotalBill(totalPrice);
  }, [bill])

  // get bill 
  const { isLoading, data: billsFromServer, error, refetch } = useQuery({
    queryKey: ['bill'],
    queryFn: () => GetApi("//v1/allbilling"),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  })
  const { isLoading: searchLoading, data: searchData, error: searchError, refetch: searchRefetch } = useQuery({
    queryKey: ['searched', search],
    queryFn: () => GetApi(`//v1/item/search?search=${search}`)
  })

  const handleSaveBill = () => {
    const PostPayload = {
      data: bill,
      url: "//v1/billing"
    }
    mutationSaveBill.mutate(PostPayload)
  }
  // console.log(bill, "bill") 
  console.log(billsFromServer, "billsFromServer")
  // console.log(searchParams.get('search'), "searchParams")

  const mutationSaveBill = useMutation({
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
        if (data?.status == "success" && data?.statusCode == 200) {
          // refetch()
          dispatch(removeAllProducts())
          // console.log("saved success")
          queryClient.invalidateQueries({ queryKey: ['bill'] });
        } else {
          // dispatch(updateState(oldItemsData))
        }
      }
    },
  })
  // console.log(mutationSaveBill, "mutationSaveBill")

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // 'en-GB' represents the format DD/MM/YYYY
    return formattedDate;
  };
  const getCurrentTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
  };
  const handleBillClick = (clickedBill) => {
    dispatch(addBill(clickedBill.items))
    // console.log(clickedBill, "clickedBill")
  }
  // console.log(searchData?.body, "searchData")
  const handleOnAddProductToBill = (item) => {
    const newData = { ...item, quantity: 1 }
    dispatch(addProduct(newData))
    setSearchParams({ search: '' })
    search = ""
  }
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Row className="mt-1 print-row">
        <Col>
          <div ref={componentRef} className="p-4">
            <h1 className="text-center">HR Resorts</h1>
            <div>
              <p><strong>Bill No</strong> : 1001</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p><strong>Time</strong> : {getCurrentTime()}</p>
              <p><strong>Date</strong>  : {getCurrentDate()}</p>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bill && bill?.map((product) => (
                  <tr key={product.id}>
                    <td>{product?.itemName}</td>
                    <td>{product?.quantity}</td>
                    <td>{product?.itemPrice}</td>
                    <td>{product?.itemPrice * product?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <h5>
                Total Amount: {totalBill}
              </h5>
            </div>
            <div className="text-center mt-4">Thank You Visit Again 😊</div>
          </div>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col className="col-24 col-lg-6">
          <div style={{ borderWidth: 1 }}>
            <h2>Recent Bills</h2>
            <div className="d-flex flex-wrap my-2">
              {billsFromServer && billsFromServer?.bills?.map((item) => <span onClick={() => handleBillClick(item)} className="single-bill m-2 ">{item.billNumber}</span>)}
            </div>
          </div>
        </Col>
        <Col className="col">
          <div>
            {/* <h2>Billing Page</h2> */}
            <Form>
              {/* ... (previous form code) */}
              <Button variant="primary"
              // onClick={handleAddProduct}
              >
                Add Product
              </Button>
              <FloatingLabel
                controlId="floatingInput"
                label="search"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="search"
                  // onChange={handleInputChange}
                  onChange={
                    debounce(
                      (e) => {
                        setSearchParams({ search: e.target.value });
                        queryClient.invalidateQueries({ queryKey: ['searched', search] });
                      }, 500)
                  }
                />
              </FloatingLabel>
            </Form>
            <div className="listGroup-container">
              {/* {searchedProduct.length > 0 ? (<ListGroup className="listGroup">
                {searchedProduct && searchedProduct?.map((item) => (
                  <ListGroup.Item className="cursor-pointer" onClick={() => { dispatch(addProduct(item)); setsearchedProduct("") }} >{item?.itemName}</ListGroup.Item>
                ))} */}
              {searchData && (<ListGroup className="listGroup">
                {searchData && searchData?.body?.map((item) => (
                  <ListGroup.Item className="cursor-pointer"
                    onClick={
                      () =>
                        handleOnAddProductToBill(item)
                    } >{item?.itemName}</ListGroup.Item>
                ))}
              </ListGroup>)}
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bill && bill?.map((product) => (
                  <tr key={product?.id}>
                    <td>{product?.itemName}</td>
                    <td>{product?.itemPrice}</td>
                    <td>{product?.quantity}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className=" cursor-pointer"><FaCircleMinus size={25} onClick={() => dispatch(dcreaseQuantity(product))} /></div>
                          <div className="mx-2"><strong>{product?.quantity}</strong> </div>
                          <div className=" cursor-pointer"><FaPlusCircle size={25} onClick={() => dispatch(increseQuantity(product))} /></div>
                        </div>
                        <div style={{ height: "100%" }} className="ms-1 ms-lg-2 my-auto d-flex justify-content-center">
                          <MdDelete color="#bb2124" size={25} onClick={() => dispatch(removeProduct(product))} className="cursor-pointer" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div>
              <strong>Total Items:
                {totalBill}
              </strong>
            </div>
            <Button
              onClick={handleSaveBill}
              disabled={mutationSaveBill.isPending}
            // onClick={() => dispatch(removeAllProducts())}
            >
              {mutationSaveBill.isPending ? "Loading" : "Save Bill"}
            </Button>
            <Button
              className="ms-4"
              onClick={handlePrint}
            >
              Save And Print
            </Button>

            {/* ... (previous buttons) */}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default OrdersPage;





