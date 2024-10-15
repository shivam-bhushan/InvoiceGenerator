import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import Invoice from "./pages/Invoice";
import InvoiceList from "./pages/InvoiceList";
import ProductForm from "./components/ProductForm";
import HomePage from "./pages/HomePage";

const App = () => {
  return (


    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<Invoice />} />
      <Route path="/create-product" element={<ProductForm />} />
      <Route path="/edit-product/:id" element={<ProductForm />} />
      <Route path="/create/:id" element={<Invoice />} />
      <Route path="/edit/:id" element={<Invoice />} />
    </Routes>


  );
};

export default App;
