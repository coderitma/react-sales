import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaArrowCircleLeft, FaSave } from "react-icons/fa";
import BarangService from "../services/BarangService";

const activity = {
  CREATE_SUCCESS: "CREATE_SUCCESS",
  EDIT_SUCCESS: "EDIT_SUCCESS",
  REMOVE_SUCCESS: "REMOVE_SUCCESS",
};

const ModelBarang = {
  kodeBarang: "",
  namaBarang: "",
  hargaBeli: 0,
  hargaJual: 0,
  jumlahBarang: 0,
};

const BarangFormComponent = ({
  handleCallback,
  variant,
  size,
  kodeBarang,
  title,
  textButton,
}) => {
  const [barang, setBarang] = useState(ModelBarang);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setBarang((values) => ({ ...values, [name]: value }));
  };

  const handleBarangServiceCreate = () => {
    BarangService.create(barang)
      .then((response) => {
        handleCallback(activity.CREATE_SUCCESS, response.data);
        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleBarangServiceGet = () => {
    if (kodeBarang) {
      BarangService.get(kodeBarang)
        .then((response) => {
          setBarang(response.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleBarangServiceEdit = () => {
    BarangService.edit(barang)
      .then((response) => {
        handleCallback(activity.EDIT_SUCCESS, response.data);
        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleBarangServiceRemove = () => {
    BarangService.remove(kodeBarang)
      .then(() => {
        let confirm = window.confirm("Anda yakin ingin menghapus?");
        if (confirm) {
          handleCallback(activity.REMOVE_SUCCESS, null);
          handleClose();
        }
      })
      .catch((error) => alert(error.message));
  };

  useEffect(handleBarangServiceGet, [kodeBarang]);

  return (
    <>
      <Button variant={variant} size={size} onClick={handleShow}>
        {textButton}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="outline-secondary" onClick={handleClose}>
            <FaArrowCircleLeft /> Batal
          </Button>
          {kodeBarang ? (
            <>
              <Button
                variant="outline-dark"
                onClick={handleBarangServiceRemove}>
                <FaSave /> Hapus
              </Button>
              <Button variant="dark" onClick={handleBarangServiceEdit}>
                <FaSave /> Simpan Perubahan
              </Button>
            </>
          ) : (
            <Button variant="dark" onClick={handleBarangServiceCreate}>
              <FaSave /> Simpan
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

BarangFormComponent.activity = activity;

export default BarangFormComponent;
