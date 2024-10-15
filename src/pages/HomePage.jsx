import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InvoiceList from "./InvoiceList";
import { CheckCircle, Zap } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Container fluid className="min-vh-100 bg-primary">
      <Row className="h-100">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center p-5 text-white"
        >
          <div className="mb-4">
            <Zap size={60} className="text-warning" />
          </div>
          <h1 className="display-4 fw-bold mb-4">
            Create Professional Invoices in Seconds
          </h1>
          <p className="lead mb-4">
            Streamline your billing process with our intuitive invoice
            generator. Perfect for freelancers, small businesses, and
            entrepreneurs.
          </p>
          <ul className="list-unstyled mb-4">
            {[
              "Easy to use interface",
              "Customizable",
              "Works for multiple usecases",
            ].map((feature, index) => (
              <li key={index} className="mb-2">
                <CheckCircle className="text-white me-2 " />
                {feature}
              </li>
            ))}
          </ul>
          <Link to="/create">
            <Button variant="light" size="lg" className="align-self-start">
              Get Started
              <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </Link>
        </Col>
        <Col md={6} className="bg-white p-0 min-vh-100">
          <InvoiceList />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
