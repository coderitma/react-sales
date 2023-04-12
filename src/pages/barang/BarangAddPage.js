import { Button, Card, Form } from "react-bootstrap";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import useAddBarang from "../../utils/hooks/barang/useAddBarang";
import { useMemo } from "react";

const BarangAddPage = () => {
  const [barang, handleInput, create, back] = useAddBarang();

  return (
    <>
      <NavigationWidget
        actionTop={
          <>
            <Button className="me-2" onClick={() => back()} variant="secondary">
              <FaArrowLeft /> Kembali
            </Button>
            <Button onClick={create}>
              <FaSave /> Simpan
            </Button>
          </>
        }>
        <Card>
          <Card.Header>
            <h5>Tambah Barang</h5>
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
                isInvalid={
                  !barang.hargaBeli ||
                  parseInt(barang.hargaBeli) >= parseInt(barang.hargaJual) ||
                  parseInt(barang.hargaBeli) === 0
                }
                value={barang.hargaBeli || ""}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                name="hargaJual"
                type="number"
                isInvalid={
                  !barang.hargaJual ||
                  parseInt(barang.hargaBeli) >= parseInt(barang.hargaJual) ||
                  parseInt(barang.hargaJual) === 0
                }
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
          </Card.Body>
        </Card>
      </NavigationWidget>
    </>
  );
};

export default BarangAddPage;
