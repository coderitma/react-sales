import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PemasokService from "../../services/PemasokService";

const PemasokAddPage = () => {
  const navigate = useNavigate();
  const [pemasok, setPemasok] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const handlePemasokServiceCreate = () => {
    PemasokService.create(pemasok)
      .then(() => {
        alert("Berhasil menambahkan pemasok");
        navigate("/pemasok");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container>
      <Row className={"d-flex justify-content-center align-items-center my-4"}>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tambah Pemasok</Card.Title>
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
              <Form.Group className="mt-2">
                <Form.Label>Telepon Pemasok</Form.Label>
                <Form.Control
                  name="teleponPemasok"
                  type="text"
                  value={pemasok.teleponPemasok || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  className="me-2"
                  onClick={() => navigate(-1)}
                  variant="secondary">
                  Batal
                </Button>
                <Button onClick={handlePemasokServiceCreate}>Simpan</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PemasokAddPage;
