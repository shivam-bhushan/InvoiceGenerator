import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EditableField = (props) => {
  const { cellData, onItemizedItemEdit, isEditable = true } = props;

  const handleChange = (e) => {
    if (isEditable) {
      onItemizedItemEdit(e);
    }
  };

  return (
    <InputGroup className="my-1 flex-nowrap">
      {cellData.leading != null && (
        <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
          <span
            className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px" }}
          >
            {cellData.leading}
          </span>
        </InputGroup.Text>
      )}
      <Form.Control
        className={cellData.textAlign}
        type={cellData.type}
        placeholder={cellData.placeholder}
        min={cellData.min}
        name={cellData.name}
        id={cellData.id}
        value={cellData.value}
        step={cellData.step}
        precision={cellData.precision}
        aria-label={cellData.name}
        onChange={handleChange}
        readOnly={!isEditable}
        disabled={!isEditable}
        required
        style={{ backgroundColor: "white" }}
      />
    </InputGroup>
  );
};

export default EditableField;
