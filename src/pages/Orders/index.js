import React, { useState } from "react";
import { Form, Table, Button, Col, Row } from "react-bootstrap";
import Layout from "../../components/common/Layout";
const OrdersPage = ({ currentActiveMenu, setCurrentActiveMenu, mainMenu }) => {
  const [billId, setBillId] = useState("");
  const [date, setDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([
    { id: 1, name: "Product 1", price: 10.0, quantity: 1 },
    { id: 2, name: "Product 2", price: 15.0, quantity: 2 },
  ]);
  const [searchProduct, setSearchProduct] = useState("");

  const handleAddProduct = () => {
    // Add your logic to fetch product details based on searchProduct
    // and add it to the selectedProducts array
    // For example:
    const newProduct = {
      id: 3,
      name: "Product 3",
      price: 20.0,
      quantity: 1,
    };
    setSelectedProducts([...selectedProducts, newProduct]);
    setSearchProduct("");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const getTotalItems = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.quantity,
      0
    );
  };

  return (
    <Layout
      currentActiveMenu={currentActiveMenu}
      setCurrentActiveMenu={setCurrentActiveMenu}
    >
      <Row className="mt-1">
        <Col className="col-6">
          <div style={{ borderWidth: 1 }}>
            <h2>Orders Page</h2>
          </div>
        </Col>
        <Col className="col">
          <div>
            <h2>Billing Page</h2>
            <Form>
              {/* ... (previous form code) */}
              <Button variant="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            Math.max(product.quantity - 1, 0)
                          )
                        }
                      >
                        -
                      </Button>{" "}
                      {product.quantity}{" "}
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          handleQuantityChange(product.id, product.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div>
              <strong>Total Items: {getTotalItems()}</strong>
            </div>

            {/* ... (previous buttons) */}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default OrdersPage;
