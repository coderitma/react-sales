import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const PembelianSearchInlineWidget = ({
  attr,
  isShowFaktur,
  isShowKodePemasok,
  isShowReporting,
  callbackPembelianSearchInlineWidget,
  children,
}) => {
  const [query, setQuery] = useState({
    faktur: "",
    kodePemasok: "",
    fromTanggal: "",
    toTanggal: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    callbackPembelianSearchInlineWidget(query);
  };

  return (
    <>
      <InputGroup>
        {isShowFaktur && (
          <>
            <Form.Control
              name="faktur"
              type="text"
              placeholder="Faktur"
              value={query.faktur || ""}
              onChange={handleInput}
            />
          </>
        )}
        {isShowKodePemasok && (
          <Form.Control
            name="kodePemasok"
            type="text"
            placeholder="Kode Pemasok"
            value={query.kodePemasok || ""}
            onChange={handleInput}
          />
        )}

        {isShowReporting && (
          <>
            <Form.Control
              name="fromTanggal"
              type="date"
              placeholder="Dari tanggal"
              value={query.fromTanggal || ""}
              onChange={handleInput}
            />
            <Form.Control
              name="toTanggal"
              type="date"
              placeholder="Sampai tanggal"
              value={query.toTanggal || ""}
              onChange={handleInput}
            />
          </>
        )}

        <Button {...attr} onClick={handleSearch}>
          <FaSearch /> Search
        </Button>
        {children}
      </InputGroup>
    </>
  );
};

export default PembelianSearchInlineWidget;
