import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { FaSave, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import helpers from "../../utils/helpers";
import BarangMultipleChoiceWidget from "../../widgets/barang/BarangMultipleChoiceWidget";
import PemasokChoiceWidget from "../../widgets/pemasok/PemasokChoiceWidget";
import PembelianInvoiceReviewWidget from "../../widgets/pembelian/PembelianInvoiceReviewWidget";

const PembelianAddPage = () => {
  const navigate = useNavigate();
  const [pembelian, setPembelian] = useState({
    faktur: "",
    tanggal: "",
    total: 0,
    pemasok: {},
    item: [],
  });

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [pemasok, setPemasok] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const handleInputDaftarBarang = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    setDaftarBarang((values) => {
      const result = [...values];
      result[index][name] = value;
      return result;
    });
  };

  const handleRemoveItem = (barang) => {
    setDaftarBarang((values) => {
      const result = [...values];
      let index = result.indexOf(barang);
      result.splice(index, 1);
      return result;
    });
  };

  const handlePembelianServiceCreate = () => {
    PembelianService.create(pembelian)
      .then((response) => {
        alert("Berhasil menambahkan transaksi");
        navigate("/pembelian");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const callbackBarangMultipleChoiceWidget = (data) => {
    if (
      !helpers.itemIsDuplicatedInArrayObject(data, "kodeBarang", daftarBarang)
    ) {
      setDaftarBarang((values) => {
        const result = [...values];
        result.push(data);
        return result;
      });
    } else {
      alert("item duplicate");
    }
  };

  const callbackPemasokChoiceWidget = (data) => {
    setPemasok(data);
  };

  useEffect(() => {
    let sum = 0;
    if (daftarBarang.length > 0) {
      for (let item of daftarBarang) {
        sum += item.hargaBeli * parseInt(item.jumlahBarang);
      }
    }
    setPembelian((values) => ({ ...values, item: daftarBarang, total: sum }));
  }, [daftarBarang]);

  useEffect(() => {
    setPembelian((values) => ({ ...values, pemasok }));
  }, [pemasok]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <PembelianInvoiceReviewWidget pembelian={pembelian} />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Tambah Pembelian</Card.Title>
              <Row>
                <Col md={6}>
                  <Form.Group className="mt-2">
                    <Form.Label>Faktur</Form.Label>
                    <Form.Control
                      name="faktur"
                      type="text"
                      value={pembelian.faktur}
                      onChange={handleInput}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      name="tanggal"
                      type="date"
                      value={pembelian.tanggal}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <PemasokChoiceWidget
                    callbackPemasokChoiceWidget={callbackPemasokChoiceWidget}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>
                Daftar Item{" "}
                <BarangMultipleChoiceWidget
                  isSingleAction={true}
                  listBarang={daftarBarang}
                  callbackBarangMultipleChoiceWidget={
                    callbackBarangMultipleChoiceWidget
                  }
                  onlyIcon={true}
                />
              </Card.Title>
            </Card.Body>
            <Table>
              <thead>
                <tr>
                  <th>Kode Barang</th>
                  <th>Nama Barang</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Jumlah</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftarBarang.map((barang, index) => (
                  <tr key={index}>
                    <td>{barang.kodeBarang}</td>
                    <td>{barang.namaBarang}</td>
                    <td>{barang.hargaBeli}</td>
                    <td>{barang.hargaJual}</td>
                    <td>
                      <Form.Control
                        type="number"
                        name="jumlahBarang"
                        value={barang.jumlahBarang}
                        onChange={(e) => handleInputDaftarBarang(e, index)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={(e) => handleRemoveItem(barang)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
          <Card className="mt-4">
            <Card.Body className="d-flex justify-content-end">
              <Button onClick={handlePembelianServiceCreate}>
                <FaSave /> Simpan
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PembelianAddPage;
