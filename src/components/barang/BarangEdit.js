import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import BarangService from "../../services/BarangService";

const BarangEdit = ({
  kodeBarang,
  classAttr,
  variant,
  size,
  handleCallback,
}) => {
  const [barang, setBarang] = useState({});
  const [show, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleHideModal = () => setShow(false);

  const handleEditBarang = () => {
    BarangService.edit(barang)
      .then(({ data }) => {
        handleHideModal();
        handleCallback(data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleGetBarang = () => {
    BarangService.get(kodeBarang)
      .then(({ data }) => {
        setBarang(data);
        handleShowModal();
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBarang((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <Button
        className={classAttr}
        variant={variant}
        size={size}
        onClick={handleGetBarang}>
        Edit
      </Button>

      <Modal show={show} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              value={barang.kodeBarang || ""}
              disabled
              type="text"
              placeholder="Kode barang"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="namaBarang"
              type="text"
              value={barang.namaBarang || ""}
              onChange={handleChange}
              placeholder="Nama barang"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Harga Beli</Form.Label>
            <Form.Control
              name="hargaBeli"
              type="number"
              value={barang.hargaBeli || ""}
              onChange={handleChange}
              placeholder="Harga beli"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Harga jual</Form.Label>
            <Form.Control
              name="hargaJual"
              type="number"
              value={barang.hargaJual || ""}
              onChange={handleChange}
              placeholder="Harga jual"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Jumlah Barang (stock)</Form.Label>
            <Form.Control
              name="jumlahBarang"
              type="number"
              value={barang.jumlahBarang || ""}
              onChange={handleChange}
              placeholder="Jumlah barang"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleEditBarang}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BarangEdit;
