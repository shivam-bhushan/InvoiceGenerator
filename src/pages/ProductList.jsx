import React, { useEffect } from "react";
import { Button, Col, Row, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiTrash } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteProduct } from "../redux/productSlice";

const ProductList = ({ setFormData, handleCalculateTotal }) => {
  // Fetching product list from Redux store
  const productList = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const onAddToInvoice = (product) => {
    const newItem = {
      itemId: product.id,
      itemName: product.name,
      itemDescription: product.description,
      itemPrice: product.price,
      itemQuantity: 1,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [...prevFormData.items, newItem],
    }));
    handleCalculateTotal();
  };

  const onDelEvent = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <Col className=" p-2 my-3">
      <Col className="d-flex align-items-center">
        <h4 className="fw-bold mb-3">Product List</h4>
      </Col>

      {productList && productList.length > 0 ? (
        <div className="table-responsive card rounded-3 p-0 m-0">
          <Table className="table table-bordered table-light rounded-3 border overflow-hidden p-0 m-0">
            <colgroup>
              <col style={{ width: "20%" }} /> <col style={{ width: "30%" }} />{" "}
              <col style={{ width: "20%" }} /> <col style={{ width: "10%" }} />{" "}
            </colgroup>
            <thead>
              <tr>
                <th
                  style={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  NAME
                </th>
                <th
                  style={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  DESCRIPTION
                </th>
                <th
                  style={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  PRICE
                </th>
                <th
                  style={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                  className="text-center"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onAddToInvoice={onAddToInvoice}
                  onDelEvent={onDelEvent}
                />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="text-danger"> No Products added yet</div>
      )}
      <Col className="d-flex justify-content-start">
        <Link to="/create-product">
          <Button variant="primary fw-bold mt-3">Create Product</Button>
        </Link>
      </Col>
    </Col>
  );
};

const ProductRow = ({ product, onAddToInvoice, onDelEvent }) => {
  return (
    <tr>
      <td
        className="fw-semibold "
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {product.name}
      </td>
      <td
        className="fw-normal "
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {" "}
        {product.description}
      </td>
      <td
        className="fw-normal "
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {product.price}
      </td>
      <td>
        <Container className="d-flex justify-content-center align-items-center ">
          <IoMdAdd
            onClick={() => onAddToInvoice(product)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-primary me-2 "
          />
          <Link to={`/edit-product/${product.id}`}>
            <AiOutlineEdit
              style={{ height: "33px", width: "33px", padding: "7.5px" }}
              className="text-white mt-1 btn btn-secondary me-2"
            />
          </Link>
          <BiTrash
            onClick={() => onDelEvent(product.id)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          />
        </Container>
      </td>
    </tr>
  );
};

export default ProductList;
