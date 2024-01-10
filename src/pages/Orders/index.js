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
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const OrdersPage = ({ currentActiveMenu, setCurrentActiveMenu, mainMenu }) => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const bill = useSelector((state) => state.bill.products)
  const [products, setProducts] = useState(ItemsData)
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [searchedProduct, setsearchedProduct] = useState(false);
  // const [currentBillProduct, setCurrentBillProduct] = useState(false);

  const [totalBill, setTotalBill] = useState(0);

  const handleInputChange = (e) => {
    const value = e.target.value
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
  const { isLoading, data: billsFromServer, error, refetch } = useQuery({ queryKey: ['bill'], queryFn: () => GetApi("/v1/allbilling") })
  // console.log(billsFromServer, "billsFromServer")

  const handleSaveBill = () => {
    const PostPayload = {
      data: {
        items: bill,
        // tax: 5,
        // discount: 2
      },
      url: "/v1/billing"
    }
    mutationSaveBill.mutate(PostPayload)
  }


  const mutationSaveBill = useMutation({
    mutationFn: PostApi,
    onSuccess: (data, variable, context) => {
      if (data) {
        setMessage(data?.message)
        setShow(true)
        if (data?.status == "success" && data?.statusCode == 200) {
          // refetch()
          dispatch(removeAllProducts())
          console.log("saved success")
          queryClient.invalidateQueries({ queryKey: ['bill'] });
        } else {
          // dispatch(updateState(oldItemsData))
        }
      }
      setTimeout(function () {
        setShow(false)
      }, 3000);
    },
  })


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
    console.log(clickedBill, "clickedBill")
  }
  console.log(mutationSaveBill, "mutationSaveBill")
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
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
              {billsFromServer && billsFromServer?.body.map((item) => <span onClick={() => handleBillClick(item)} className="single-bill m-2 ">{item.billNumber}</span>)}
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
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form>
            <div className="listGroup-container">
              {searchedProduct.length > 0 ? (<ListGroup className="listGroup">
                {searchedProduct && searchedProduct?.map((item) => (
                  <ListGroup.Item className="cursor-pointer" onClick={() => { dispatch(addProduct(item)); setsearchedProduct("") }} >{item?.itemName}</ListGroup.Item>
                ))}
              </ListGroup>) : ""}
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
                        <div className=" cursor-pointer"><FaCircleMinus size={25} onClick={() => dispatch(dcreaseQuantity(product))} /></div>
                        <div className="mx-2"><strong>{product?.quantity}</strong> </div>
                        <div className=" cursor-pointer"><FaPlusCircle size={25} onClick={() => dispatch(increseQuantity(product))} /></div>
                      </div>

                      {/* <Button
                        variant="outline-primary"
                        
                      >
                        -
                      </Button>{" "} */}
                      {" "}
                      {/* <Button
                        variant="outline-primary"
                        onClick={() => dispatch(increseQuantity(product))}
                      >
                        +
                      </Button> */}

                    </td>
                    <td >
                      {/* <Button
                        variant="danger"
                        onClick={() => dispatch(removeProduct(product))}
                      >
                        Remove
                      </Button> */}
                      <div style={{ height: "100%" }} className="my-auto d-flex justify-content-center">
                        <MdDelete color="#bb2124" size={25} onClick={() => dispatch(removeProduct(product))} className="cursor-pointer" />
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



