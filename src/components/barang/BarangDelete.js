import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import BarangService from "../../services/BarangService";

const BarangDelete = ({
  kodeBarang,
  handleCallback,
  classAttr,
  variant,
  size,
}) => {
  const [show, setShow] = useState(false);

  const handleShowModal = () => setShow(true);
  const handleHideModal = () => setShow(false);

  const handleRemoveBarang = () => {
    BarangService.remove(kodeBarang)
      .then(({ data }) => {
        handleCallback();
        handleHideModal();
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };

  return (
    <>
      <Button
        className={classAttr}
        variant={variant}
        size={size}
        onClick={handleShowModal}>
        Hapus
      </Button>

      <Modal show={show} onHide={handleHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda yakin ingin menghapus {kodeBarang}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Tutup
          </Button>
          <Button variant="danger" onClick={handleRemoveBarang}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BarangDelete;
