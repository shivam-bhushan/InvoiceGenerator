import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Row, Col } from "react-bootstrap";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productSlice";
import { useProductListData } from "../redux/hooks";
import generateRandomId from "../utils/generateRandomId";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const isEdit = location.pathname.includes("edit");
  const { getOneProduct, listSize } = useProductListData();

  // Initialize formData state
  const [formData, setFormData] = useState(
    isEdit
      ? getOneProduct(params.id)
      : {
          id: generateRandomId(),
          name: "",
          description: "",
          productNumber: listSize + 1,
          price: "0.00",
          currency: "$",
        }
  );

  // handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateProduct({ id: formData.id, updatedProduct: formData }));
      alert("Product updated successfully 🥳");
      navigate("/create");
    } else {
      console.log("Creating product:", formData);
      dispatch(addProduct(formData));
      alert("Product added successfully 🥳");
    }
    navigate("/create");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mx-auto flex align-items-center w-50 p-4">
        <Col className="">
          <Card className="p-4">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Conditional rendering for submit button based on mode */}
            {isEdit ? (
              <Button variant="primary" type="submit" className="my-3">
                Edit
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="my-3">
                Create
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateProduct;
