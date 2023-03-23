import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BarangService from "../../services/BarangService";

const BarangAddPage = () => {
  const navigate = useNavigate();
  const [barang, setBarang] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const handleBarangServiceCreate = () => {
    BarangService.create(barang)
      .then(() => {
        alert("Berhasil menambahkan barang");
        navigate("/barang");
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
              <Card.Title>Tambah Barang</Card.Title>
              <Form.Group className="mt-2">
                <Form.Label>Kode Barang</Form.Label>
                <Form.Control
                  name="kodeBarang"
                  value={barang.kodeBarang || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  name="namaBarang"
                  value={barang.namaBarang || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Harga Beli</Form.Label>
                <Form.Control
                  name="hargaBeli"
                  type="number"
                  value={barang.hargaBeli || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Harga Jual</Form.Label>
                <Form.Control
                  name="hargaJual"
                  type="number"
                  value={barang.hargaJual || ""}
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Jumlah Barang</Form.Label>
                <Form.Control
                  name="jumlahBarang"
                  type="number"
                  value={barang.jumlahBarang || ""}
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
                <Button onClick={handleBarangServiceCreate}>Simpan</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BarangAddPage;
