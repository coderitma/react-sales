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
  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPembelian((values) => ({ ...values, [name]: value }));
  };

  const handleInputDaftarItemBeli = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    setDaftarItemBeli((values) => {
      const result = [...values];
      result[index][name] = value;
      return result;
    });
  };

  const handleRemoveItem = (itemBeli) => {
    setDaftarItemBeli((values) => {
      const result = [...values];
      let index = result.indexOf(itemBeli);
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
      !helpers.itemIsDuplicatedInArrayObject(data, "kodeBarang", daftarItemBeli)
    ) {
      setDaftarItemBeli((values) => {
        const result = [...values];
        data.jumlahBeli = 1;
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
    if (daftarItemBeli.length > 0) {
      for (let itemBeli of daftarItemBeli) {
        sum += itemBeli.hargaBeli * parseInt(itemBeli.jumlahBeli);
      }
    }
    setPembelian((values) => ({ ...values, item: daftarItemBeli, total: sum }));
  }, [daftarItemBeli]);

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
                      isInvalid={!pembelian.faktur}
                      value={pembelian.faktur}
                      onChange={handleInput}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      name="tanggal"
                      type="date"
                      isInvalid={!pembelian.tanggal}
                      isValid={pembelian.tanggal}
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
                  listBarang={daftarItemBeli}
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
                {daftarItemBeli.map((itemBeli, index) => (
                  <tr key={index}>
                    <td>{itemBeli.kodeBarang}</td>
                    <td>{itemBeli.namaBarang}</td>
                    <td>{itemBeli.hargaBeli}</td>
                    <td>{itemBeli.hargaJual}</td>
                    <td>
                      <Form.Control
                        type="number"
                        name="jumlahBeli"
                        isInvalid={
                          itemBeli.jumlahBeli >= itemBeli.jumlahBarang ||
                          !itemBeli.jumlahBeli
                        }
                        value={itemBeli.jumlahBeli}
                        onChange={(e) => handleInputDaftarItemBeli(e, index)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={(e) => handleRemoveItem(itemBeli)}>
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
