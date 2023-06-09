import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import PemasokService from "../../services/PemasokService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";

const PemasokEditPage = () => {
  const navigate = useNavigate();
  const { kodePemasok } = useParams();
  const [pemasok, setPemasok] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const handlePemasokServiceEdit = () => {
    PemasokService.edit(pemasok)
      .then((response) => {
        alert("Berhasil mengedit pemasok");
        navigate("/pemasok");
      })
      .catch((error) => alert(error));
  };

  const handlePemasokServiceRemove = () => {
    let confirmRemove = window.confirm(`Yakin ingin menghapus ${kodePemasok}?`);
    if (confirmRemove) {
      PemasokService.remove(kodePemasok)
        .then((response) => {
          alert("Berhasil menghapus pemasok");
          navigate("/pemasok");
        })
        .catch((error) => alert(error));
    }
  };

  useEffect(() => {
    PemasokService.get(kodePemasok)
      .then((response) => {
        setPemasok(response.data);
      })
      .catch((error) => {
        alert(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavigationWidget
        actionTop={
          <>
            <Button
              className="ms-2"
              onClick={() => navigate(-1)}
              variant="secondary">
              <FaArrowLeft /> Kembali
            </Button>
            <Button
              className="ms-2"
              variant="danger"
              onClick={handlePemasokServiceRemove}>
              <FaTrash /> Hapus
            </Button>
            <Button className="ms-2" onClick={handlePemasokServiceEdit}>
              <FaSave /> Simpan Perubahan
            </Button>
          </>
        }>
        <Card>
          <Card.Header>
            <h5>Edit Pemasok</h5>
          </Card.Header>
          <Card.Body>
            <Form.Group className="mt-2">
              <Form.Label>Kode Pemasok</Form.Label>
              <Form.Control
                name="kodePemasok"
                type="text"
                value={pemasok.kodePemasok || ""}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Nama Pemasok</Form.Label>
              <Form.Control
                name="namaPemasok"
                type="text"
                value={pemasok.namaPemasok || ""}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Alamat Pemasok</Form.Label>
              <Form.Control
                name="alamatPemasok"
                type="text"
                value={pemasok.alamatPemasok || ""}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mt-2 mb-4">
              <Form.Label>Telepon Pemasok</Form.Label>
              <Form.Control
                name="teleponPemasok"
                type="text"
                value={pemasok.teleponPemasok || ""}
                onChange={handleInput}
              />
            </Form.Group>
          </Card.Body>
        </Card>
      </NavigationWidget>
      <Container>
        <Row className="d-flex justify-content-center align-items-center my-4">
          <Col md={6}></Col>
        </Row>
      </Container>
    </>
  );
};

export default PemasokEditPage;
