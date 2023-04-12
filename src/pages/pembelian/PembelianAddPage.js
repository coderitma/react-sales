import { useCallback, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import {
  helperReadableCurrency,
  itemIsDuplicatedInArrayObject,
} from "../../utils/helpers";
import BarangChoiceWidget from "../../widgets/barang/BarangChoiceWidget";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import PemasokChoiceWidget from "../../widgets/pemasok/PemasokChoiceWidget";

const PembelianAddPage = () => {
  const navigate = useNavigate();
  const [pembelian, setPembelian] = useState({
    faktur: "",
    tanggal: "",
    total: 0,
    kembali: 0,
    dibayar: 0,
  });

  const [daftarItemBeli, setDaftarItemBeli] = useState([]);
  const [pemasok, setPemasok] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPembelian((values) => ({
      ...values,
      [name]: name === "dibayar" ? parseInt(value) : value,
    }));
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
    let payload = {
      ...pembelian,
      pemasok,
      item: daftarItemBeli,
    };
    PembelianService.create(payload)
      .then((response) => {
        const printFaktur = window.confirm("Cetak faktur?");
        if (printFaktur) {
          PembelianService.fakturPrint(response.data.faktur);
        }
        navigate("/pembelian");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const callbackPemasokChoiceWidget = useCallback(
    (data) => {
      setPemasok(data);
    },
    [pemasok]
  );

  const callbackBarangChoiceWidget = useCallback(
    (data) => {
      data.subtotal = 0;
      data.jumlahBeli = 1;
      if (!itemIsDuplicatedInArrayObject(data, "kodeBarang", daftarItemBeli)) {
        setDaftarItemBeli((values) => {
          const result = [...values];
          data.subtotal = data.jumlahBeli * data.hargaBeli;
          result.push(data);
          return result;
        });
      } else {
        alert("Item duplikat");
      }
    },
    [daftarItemBeli]
  );

  const computedTotal = useMemo(() => {
    let sum = 0;
    if (daftarItemBeli.length > 0) {
      for (let itemBeli of daftarItemBeli) {
        sum += itemBeli.hargaBeli * parseInt(itemBeli.jumlahBeli);
      }
    }
    setPembelian((values) => ({ ...values, total: sum }));
    return null;
  }, [daftarItemBeli]);

  const computedKembalian = useMemo(() => {
    setPembelian((values) => ({
      ...values,
      kembali: values.dibayar - values.total,
    }));
    return null;
  }, [pembelian.dibayar]);

  const componentInlinePembelian = () => {
    return (
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
    );
  };

  const componentInlinePemasok = () => {
    return (
      <Card className="mt-4">
        <Card.Header>Pemasok</Card.Header>
        <Card.Body>
          <PemasokChoiceWidget
            onlyButton={false}
            callbackPemasokChoiceWidget={callbackPemasokChoiceWidget}
          />
        </Card.Body>
      </Card>
    );
  };

  const componentInlineItems = () => {
    return (
      <Card className="mt-4">
        <Card.Header className="d-flex justify-content-between align-items-baseline">
          Daftar Item{" "}
          <BarangChoiceWidget
            callbackBarangChoiceWidget={callbackBarangChoiceWidget}
          />
        </Card.Header>
        <Table>
          <thead>
            <tr>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Harga Beli</th>
              <th>Stok </th>
              <th>Qty</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarItemBeli.map((itemBeli, index) => (
              <tr key={index}>
                <td>{itemBeli.kodeBarang}</td>
                <td>{itemBeli.namaBarang}</td>
                <td>{itemBeli.hargaBeli}</td>
                <td>{itemBeli.jumlahBarang}</td>
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
    );
  };

  const componentInlinePayment = () => {
    return (
      <Card>
        <Card.Header>Pembayaran</Card.Header>
        <Table>
          <tbody>
            <tr>
              <th>Total Pembayaran</th>
              <td>{helperReadableCurrency(pembelian.total)}</td>
            </tr>
            <tr>
              <th>Uang Kembalian</th>
              <td>{helperReadableCurrency(pembelian.kembali || 0)}</td>
            </tr>
            <tr>
              <th>Dibayar</th>
              <td>
                <Form.Control
                  type="number"
                  name="dibayar"
                  max={100}
                  value={pembelian.dibayar || 0}
                  onChange={handleInput}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    );
  };

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
            {componentInlinePembelian()}
            {componentInlinePemasok()}
            {componentInlineItems()}
          </Col>
          <Col md={5}>{componentInlinePayment()}</Col>
        </Row>
        <Row>
          <Col md={12} className="mt-4"></Col>
        </Row>
      </NavigationWidget>
    </>
  );
};

export default PembelianAddPage;
