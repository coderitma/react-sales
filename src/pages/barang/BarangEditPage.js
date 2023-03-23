import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BarangService from "../../services/BarangService";

const BarangEditPage = () => {
  const navigate = useNavigate();
  const { kodeBarang } = useParams();
  const [barang, setBarang] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBarang((values) => ({ ...values, [name]: value }));
  };

  const handleBarangServiceEdit = () => {
    BarangService.edit(barang)
      .then((response) => {
        alert("Berhasil mengedit barang");
        navigate("/barang");
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    BarangService.get(kodeBarang)
      .then((response) => {
        setBarang(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center my-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Barang</Card.Title>
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
              <div className="d-grid gap-2">
                <Button
                  variant="warning"
                  className="mt-3"
                  onClick={handleBarangServiceEdit}>
                  Simpan
                </Button>
                <Button
                  onClick={() => navigate(-1)}
                  variant="outline-secondary">
                  Batal
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BarangEditPage;
