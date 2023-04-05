import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import useEditBarang from "../../utils/hooks/barang/useEditBarang";

const BarangEditPage = () => {
  const [
    barang,
    handleInput,
    handleBarangServiceEdit,
    handleBarangServiceRemove,
    navigate,
  ] = useEditBarang();

  return (
    <>
      <NavigationWidget
        actionTop={
          <>
            <Button onClick={() => navigate(-1)} variant="secondary">
              <FaArrowLeft /> Kembali
            </Button>
            <Button
              className="ms-2"
              variant="danger"
              onClick={handleBarangServiceRemove}>
              <FaTrash /> Hapus
            </Button>
            <Button className="ms-2" onClick={handleBarangServiceEdit}>
              <FaSave /> Simpan Perubahan
            </Button>
          </>
        }>
        <Card>
          <Card.Header>
            <h5>Edit Barang</h5>
          </Card.Header>
          <Card.Body>
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
            <Form.Group className="mt-2 mb-4">
              <Form.Label>Jumlah Barang</Form.Label>
              <Form.Control
                name="jumlahBarang"
                type="number"
                value={barang.jumlahBarang || ""}
                onChange={handleInput}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <div></div>
            </div>
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

export default BarangEditPage;
