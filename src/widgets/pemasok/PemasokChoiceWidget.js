import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import PemasokSearchWidget from "./PemasokSearchWidget";

const PemasokChoiceWidget = ({ callbackPemasokChoiceWidget }) => {
  const [pemasok, setPemasok] = useState({});

  const callbackPemasokSearchWidget = (data) => {
    setPemasok(data[0]);
    callbackPemasokChoiceWidget(data[0]);
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Kode Pemasok</Form.Label>
        <InputGroup className="mt-2">
          <Form.Control
            type="text"
            disabled
            value={pemasok.kodePemasok || ""}
          />
          <PemasokSearchWidget
            callbackPemasokSearchWidget={callbackPemasokSearchWidget}
            attr={{ variant: "secondary", className: "btn-sm" }}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Nama Pemasok</Form.Label>
        <Form.Control type="text" disabled value={pemasok.namaPemasok || ""} />
      </Form.Group>
    </>
  );
};

export default PemasokChoiceWidget;
