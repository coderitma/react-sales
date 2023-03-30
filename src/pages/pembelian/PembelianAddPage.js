import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaSearch, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import { itemIsDuplicatedInArrayObject } from "../../utils/helpers";
import BarangChoiceWidget from "../../widgets/barang/BarangChoiceWidget";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
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
        const printFaktur = window.confirm(
          "Berhasil menambahkan transaksi, cetak faktur?"
        );
        if (printFaktur) {
          window.open(`/pembelian/${pembelian.faktur}/print`);
        }
        navigate("/pembelian");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const callbackBarangMultipleChoiceWidget = (data) => {
    if (!itemIsDuplicatedInArrayObject(data, "kodeBarang", daftarItemBeli)) {
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

  const callbackBarangChoiceWidget = (data) => {
    if (!itemIsDuplicatedInArrayObject(data, "kodeBarang", daftarItemBeli)) {
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
    <>
      <NavigationWidget
        actionTop={
          <>
            <Button
              variant="secondary me-2"
              onClick={() => navigate("/pembelian")}>
              <FaArrowLeft /> Kembali
            </Button>
            <Button onClick={handlePembelianServiceCreate}>
              <FaSave /> Simpan
            </Button>
          </>
        }>
        <Row>
          <Col md={7}>
            <Card>
              <Card.Header>Pembelian</Card.Header>
              <Card.Body>
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
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header>Pemasok</Card.Header>
              <Card.Body>
                <PemasokChoiceWidget
                  callbackPemasokChoiceWidget={callbackPemasokChoiceWidget}
                />
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header className="d-flex justify-content-between align-items-baseline">
                Daftar Item{" "}
                <BarangChoiceWidget
                  attr={{ className: "w-50" }}
                  callbackBarangChoiceWidget={callbackBarangChoiceWidget}
                />
              </Card.Header>
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
          </Col>
          <Col md={5}>
            <PembelianInvoiceReviewWidget pembelian={pembelian} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-4"></Col>
        </Row>
      </NavigationWidget>
    </>
  );
};

export default PembelianAddPage;
