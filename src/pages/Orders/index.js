import React, { useEffect, useState } from "react";
import { Form, Table, Button, FloatingLabel, Col, Row } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Layout from "../../components/common/Layout";
import { ItemsData } from "../../products";
import { addProduct, removeProduct, increseQuantity, dcreaseQuantity, removeAllProducts } from "../../features/bill/billSlice";
import { useDispatch, useSelector } from 'react-redux'
import { PostApi } from "../../utils/PostApi";
import { GetApi } from "../../utils/GetApi";
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
  console.log(billsFromServer, "billsFromServer")

  const handleSaveBill = () => {
    const PostPayload = {
      data: {
        items: bill,
        tax: 5,
        discount: 2
      },
      url: "//v1/billing"
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
  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-6">
          <div style={{ borderWidth: 1 }}>
            <h2>Orders Page</h2>
            <div>
              {billsFromServer && billsFromServer.body.map((item) => <span className="bill">{item.itemCode}</span>)}
            </div>
          </div>
        </Col>
        <Col className="col">
          <div>
            <h2>Billing Page</h2>
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
                {searchedProduct && searchedProduct.map((item) => (
                  <ListGroup.Item className="cursor-pointer" onClick={() => { dispatch(addProduct(item)); setsearchedProduct("") }} >{item.itemName}</ListGroup.Item>
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
                {bill && bill.map((product) => (
                  <tr key={product.id}>
                    <td>{product.itemName}</td>
                    <td>{product.itemPrice}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() => dispatch(dcreaseQuantity(product))}
                      >
                        -
                      </Button>{" "}
                      {product.quantity}{" "}
                      <Button
                        variant="outline-primary"
                        onClick={() => dispatch(increseQuantity(product))}
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => dispatch(removeProduct(product))}
                      >
                        Remove
                      </Button>
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
            // onClick={() => dispatch(removeAllProducts())}
            >
              Save Bill
            </Button>
            <Button
              className="ms-4"
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
