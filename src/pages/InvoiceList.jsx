import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import InvoiceModal from "../components/InvoiceModal";
import { useNavigate } from "react-router-dom";
import { useInvoiceListData } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { deleteInvoice } from "../redux/invoicesSlice";

const InvoiceList = () => {
  const { invoiceList, getOneInvoice } = useInvoiceListData();
  const isListEmpty = invoiceList.length === 0;
  const [copyId, setCopyId] = useState("");
  const navigate = useNavigate();
  const handleCopyClick = () => {
    const invoice = getOneInvoice(copyId);
    if (!invoice) {
      alert("Please enter the valid invoice id.");
    } else {
      navigate(`/create/${copyId}`);
    }
  };

  return (
    <Row>
      <Col className="mx-auto" xs={12} md={8} lg={9}>
        <h3 className="fw-bold fs-1 pb-2 pb-md-4 text-center ">
          Swipe Assignment
        </h3>
        <Card className="d-flex p-3 p-md-4 my-3 my-md-4 ">
          {isListEmpty ? (
            <div className="d-flex flex-column align-items-center">
              <h3 className="fw-bold pb-2 pb-md-4">No invoices present</h3>
              <Link to="/create">
                <Button variant="primary">Create Invoice</Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <Row className="d-flex align-items-center ">
                <Col>
                  <h3 className="fw-bold pb-2 pb-md-4">Invoice List</h3>
                </Col>
                <Col>
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <Link to="/create">
                      <Button variant="primary mb-2 mb-md-4 me-2">
                        Create Invoice
                      </Button>
                    </Link>

                    <div className="d-flex gap-2">
                      <Button
                        variant="dark mb-2 mb-md-4"
                        onClick={handleCopyClick}
                      >
                        Copy Invoice
                      </Button>

                      <input
                        type="text"
                        value={copyId}
                        onChange={(e) => setCopyId(e.target.value)}
                        placeholder="Enter Invoice ID to copy"
                        className="bg-white border rounded-3 "
                        style={{
                          height: "40px",
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              {/* table */}
              <div className="table-responsive card rounded-3 p-0 m-0">
                <Table
                  responsive
                  className="table table-bordered table-striped rounded-3 border overflow-hidden p-0 m-0"
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        Invoice No.
                      </th>
                      <th
                        style={{
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        Bill To
                      </th>
                      <th
                        style={{
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        Due Date
                      </th>
                      <th
                        style={{
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        Total Amt.
                      </th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceList.map((invoice) => (
                      <InvoiceRow
                        key={invoice.id}
                        invoice={invoice}
                        navigate={navigate}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

const InvoiceRow = ({ invoice, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleEditClick = () => {
    navigate(`/edit/${invoice.id}`);
  };

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <tr>
        <td
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {invoice.invoiceNumber}
        </td>
        <td
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          className="fw-normal"
        >
          {invoice.billTo}
        </td>
        <td
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          className="fw-normal"
        >
          {invoice.dateOfIssue}
        </td>
        <td
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          className="fw-normal"
        >
          {invoice.currency}
          {invoice.total}
        </td>
        <td
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            width: "5%",
          }}
        >
          <Container className="d-flex justify-content-center align-items-center ">
            <BiSolidPencil
              onClick={handleEditClick}
              style={{ height: "33px", width: "33px", padding: "7.5px" }}
              className="text-white mt-1 btn btn-primary me-2 "
            />

            <BiTrash
              onClick={() => handleDeleteClick(invoice.id)}
              style={{ height: "33px", width: "33px", padding: "7.5px" }}
              className="text-white mt-1 btn btn-danger me-2 "
            />

            <BsEyeFill
              onClick={openModal}
              style={{ height: "33px", width: "33px", padding: "7.5px" }}
              className="text-white mt-1 btn btn-secondary "
            />
          </Container>
        </td>
      </tr>
      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          isOpen,
          id: invoice.id,
          currency: invoice.currency,
          currentDate: invoice.currentDate,
          invoiceNumber: invoice.invoiceNumber,
          dateOfIssue: invoice.dateOfIssue,
          billTo: invoice.billTo,
          billToEmail: invoice.billToEmail,
          billToAddress: invoice.billToAddress,
          billFrom: invoice.billFrom,
          billFromEmail: invoice.billFromEmail,
          billFromAddress: invoice.billFromAddress,
          notes: invoice.notes,
          total: invoice.total,
          subTotal: invoice.subTotal,
          taxRate: invoice.taxRate,
          taxAmount: invoice.taxAmount,
          discountRate: invoice.discountRate,
          discountAmount: invoice.discountAmount,
        }}
        items={invoice.items}
        currency={invoice.currency}
        subTotal={invoice.subTotal}
        taxAmount={invoice.taxAmount}
        discountAmount={invoice.discountAmount}
        total={invoice.total}
      />
    </>
  );
};

export default InvoiceList;
