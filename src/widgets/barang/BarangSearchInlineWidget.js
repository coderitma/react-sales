import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const BarangSearchInlineWidget = ({
  attr,
  isShowKodeBarang,
  isShowNamaBarang,
  callbackBarangSearchInlineWidget,
  q,
}) => {
  const [query, setQuery] = useState({
    kodeBarang: "",
    namaBarang: "",
  });

  useEffect(() => {
    if (q) setQuery((values) => ({ ...values, ...q }));
  }, [q]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    callbackBarangSearchInlineWidget(query);
  };

  return (
    <>
      <InputGroup>
        {isShowKodeBarang && (
          <Form.Control
            name="kodeBarang"
            type="text"
            placeholder="Kode Barang"
            value={query.kodeBarang || ""}
            onChange={handleInput}
          />
        )}
        {isShowNamaBarang && (
          <>
            <Form.Control
              name="namaBarang"
              type="text"
              placeholder="Nama Barang"
              value={query.namaBarang || ""}
              onChange={handleInput}
            />
          </>
        )}
        <Button {...attr} onClick={handleSearch}>
          <FaSearch /> Search
        </Button>
      </InputGroup>
    </>
  );
};

export default BarangSearchInlineWidget;
