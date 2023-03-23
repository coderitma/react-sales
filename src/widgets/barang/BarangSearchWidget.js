import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import BarangService from "../../services/BarangService";

const BarangSearchWidget = ({ attr, callbackBarangSearchWidget }) => {
  const [query, setQuery] = useState({});
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    BarangService.list(query)
      .then((response) => {
        if (callbackBarangSearchWidget) {
          if (response.data.length > 0) {
            setReset(true);
            callbackBarangSearchWidget(response.data);
          }
          setShow(false);
        }
      })
      .catch((error) => alert(error));
  };

  const handleReset = () => {
    setReset(false);
    setQuery({});
    BarangService.list()
      .then((response) => {
        callbackBarangSearchWidget(response.data);
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Button {...attr} onClick={() => setShow(true)}>
        <FaSearch /> Cari Barang
      </Button>
      {reset && (
        <Button {...attr} variant="secondary" onClick={handleReset}>
          <FaTrashAlt /> Hapus Pencarian
        </Button>
      )}
      <Modal show={show} onHide={() => setShow(false)} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Cari Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Kode Barang</Form.Label>
                <Form.Control
                  name="kodeBarang"
                  type="text"
                  value={query.kodeBarang || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  name="namaBarang"
                  type="text"
                  value={query.namaBarang || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Jumlah Barang</Form.Label>
                <Form.Control
                  name="jumlahBarang"
                  type="number"
                  value={query.jumlahBarang || ""}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Harga Beli</Form.Label>
                <Form.Control
                  name="hargaBeli"
                  type="number"
                  value={query.hargaBeli || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Harga Jual</Form.Label>
                <Form.Control
                  name="hargaJual"
                  type="number"
                  value={query.hargaJual || ""}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Batal
          </Button>
          <Button onClick={handleSearch}>Cari</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BarangSearchWidget;
