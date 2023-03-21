import React, { useContext, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BarangService from "../../services/BarangService";

function BarangAdd({ handleRefresh }) {
  const [barang, setBarang] = useState({});
  const [notif, setNotif] = useState({
    variant: "danger",
    message: "",
    show: false,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const handleResetNotif = () => {
    notif.show = false;
    setNotif({ ...notif });
  };

  const handleCreate = (e) => {
    handleResetNotif();
    BarangService.create(barang)
      .then(({ data }) => {
        notif.message = "Berhasil menambahkan data";
        notif.show = true;
        notif.variant = "success";
        setNotif(notif);
        handleRefresh();
        // setShow(false);
      })
      .catch(({ response }) => {
        notif.message = response.data.message;
        notif.show = true;
        notif.variant = "danger";
        setNotif(notif);
      });
  };

  return (
    <>
      <Button variant="warning" size="sm" onClick={handleShow}>
        Tambah Barang
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert
            variant={notif.variant}
            show={notif.show}
            onClick={() => setNotif({ ...notif, show: false })}>
            {notif.message}
          </Alert>
          <Form.Group className="mt-2">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              type="text"
              onChange={handleInput}
              value={barang.kodeBarang || ""}
              placeholder="Kode barang"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              name="namaBarang"
              type="text"
              onChange={handleInput}
              value={barang.namaBarang || ""}
              placeholder="Nama barang"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Harga Beli</Form.Label>
            <Form.Control
              name="hargaBeli"
              type="number"
              onChange={handleInput}
              value={barang.hargaBeli || ""}
              placeholder="Harga beli"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Harga jual</Form.Label>
            <Form.Control
              name="hargaJual"
              type="number"
              onChange={handleInput}
              value={barang.hargaJual || ""}
              placeholder="Harga jual"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Jumlah Barang (stock)</Form.Label>
            <Form.Control
              name="jumlahBarang"
              type="number"
              onChange={handleInput}
              value={barang.jumlahBarang || ""}
              placeholder="Jumlah barang"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BarangAdd;
