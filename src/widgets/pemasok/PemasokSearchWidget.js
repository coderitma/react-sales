import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import PemasokService from "../../services/PemasokService";

const PemasokSearchWidget = ({ attr, callbackPemasokSearchWidget }) => {
  const [query, setQuery] = useState({});
  const [show, setShow] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((values) => ({ ...values, [name]: value }));
  };

  const handleSearch = () => {
    callbackPemasokSearchWidget(query);
    // PemasokService.list(query)
    //   .then((response) => {
    //     if (callbackPemasokSearchWidget) {
    //       if (response.data.length > 0) {
    //         callbackPemasokSearchWidget(response.data);
    //         setShow(false);
    //       } else {
    //         alert("pencarian tidak ditemukan");
    //       }
    //     }
    //   })
    //   .catch((error) => alert(error));
  };

  const handleClear = () => {
    setQuery({});
    setShow(false);
    PemasokService.list(query)
      .then((response) => {
        if (callbackPemasokSearchWidget) {
          if (response.data.length > 0) {
            callbackPemasokSearchWidget(response.data);
            setShow(false);
          } else {
            alert("pencarian tidak ditemukan");
          }
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <>
      <Button {...attr} onClick={() => setShow(true)}>
        <FaSearch /> Cari Pemasok
      </Button>
      <Modal show={show} onHide={() => setShow(false)} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>Cari Pemasok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Kode Pemasok</Form.Label>
                <Form.Control
                  name="kodePemasok"
                  type="text"
                  value={query.kodePemasok || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Nama Pemasok</Form.Label>
                <Form.Control
                  name="namaPemasok"
                  type="text"
                  value={query.namaPemasok || ""}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Alamat Pemasok</Form.Label>
                <Form.Control
                  name="alamatPemasok"
                  type="text"
                  value={query.alamatPemasok || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Telepon Pemasok</Form.Label>
                <Form.Control
                  name="teleponPemasok"
                  type="text"
                  value={query.teleponPemasok || ""}
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Batal
          </Button>

          <Button onClick={handleSearch}>Cari</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PemasokSearchWidget;
