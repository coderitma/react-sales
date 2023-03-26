import { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
const PemasokSearchInlineWidget = ({
  attr,
  isShowKodePemasok,
  isShowNamaPemasok,
  isShowAlamatPemasok,
  isShowTeleponPemasok,
  callbackPemasokSearchInlineWidget,
  children,
}) => {
  const [query, setQuery] = useState({
    kodePemasok: "",
    namaPemasok: "",
    alamatPemasok: "",
    teleponPemasok: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    console.log(query, "uhuy");
    callbackPemasokSearchInlineWidget(query);
  };

  return (
    <>
      <InputGroup>
        {isShowKodePemasok && (
          <Form.Control
            name="kodePemasok"
            type="text"
            placeholder="Kode Pemasok"
            value={query.kodePemasok || ""}
            onChange={handleInput}
          />
        )}
        {isShowNamaPemasok && (
          <>
            <Form.Control
              name="namaPemasok"
              type="text"
              placeholder="Nama Pemasok"
              value={query.namaPemasok || ""}
              onChange={handleInput}
            />
          </>
        )}

        {isShowAlamatPemasok && (
          <Form.Control
            name="alamatPemasok"
            type="text"
            placeholder="Alamat Pemasok"
            value={query.alamatPemasok || ""}
            onChange={handleInput}
          />
        )}

        {isShowTeleponPemasok && (
          <Form.Control
            name="teleponPemasok"
            type="text"
            placeholder="Telepon Pemasok"
            value={query.teleponPemasok || ""}
            onChange={handleInput}
          />
        )}
        <Button {...attr} onClick={handleSearch}>
          <FaSearch /> Search
        </Button>
        {children}
      </InputGroup>
    </>
  );
};

export default PemasokSearchInlineWidget;
