import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";

const ModelPemasok = {
  kodePemasok: "",
  namaPemasok: "",
  alamatPemasok: "",
  teleponPemasok: "",
};

const PemasokAdd = ({ handleCallback, variant, size }) => {
  const [pemasok, setPemasok] = useState(ModelPemasok);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const handlePemasokServiceCreate = () => {
    PemasokService.create(pemasok)
      .then((response) => {
        handleCallback(null, pemasok);
        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <Button variant={variant} size={size} onClick={handleShow}>
        Tambah Pemasok
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pemasok</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="my-2">
            <Form.Label>Kode Pemasok</Form.Label>
            <Form.Control
              name="kodePemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.kodePemasok}
              placeholder="Kode pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Nama Pemasok</Form.Label>
            <Form.Control
              name="namaPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.namaPemasok}
              placeholder="Nama pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Alamat Pemasok</Form.Label>
            <Form.Control
              name="alamatPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.alamatPemasok}
              placeholder="Alamat pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Telepon Pemasok</Form.Label>
            <Form.Control
              name="teleponPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.teleponPemasok}
              placeholder="Telepon pemasok"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handlePemasokServiceCreate}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PemasokAdd;
