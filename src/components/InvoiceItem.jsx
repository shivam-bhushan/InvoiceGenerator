import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
    />
  ));

  return (
    <div className="table-responsive card rounded-3 p-0 m-0">
      <Table className="table table-light table-bordered  rounded-3 border overflow-hidden p-0 m-0">
        <thead>
          <tr>
            <th style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>ITEM</th>
            <th style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>QTY</th>
            <th style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              PRICE/RATE
            </th>
            <th
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              className="text-center"
            >
              ACTION
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Conditional rendering based on items length */}
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Add Items From Product List Below
              </td>
            </tr>
          ) : (
            itemTable
          )}
        </tbody>
      </Table>
    </div>
  );
};

const ItemRow = (props) => {
  //handle delete event
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  return (
    <tr>
      <td style={{ width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}>
        {/* Name and Description */}
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: props.item.itemName,
            id: props.item.itemId,
          }}
          isEditable={false}
        />
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
          isEditable={false}
        />
      </td>

      <td
        style={{
          minWidth: "80px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {/* Item Quantity */}
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
          isEditable={true}
        />
      </td>

      <td
        style={{
          minWidth: "110px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {/* Item Price */}
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: props.item.itemPrice,
            id: props.item.itemId,
          }}
          isEditable={false}
        />
      </td>

      <td
        className="text-center"
        style={{
          minWidth: "50px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
      >
        {/* Delete button */}
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
