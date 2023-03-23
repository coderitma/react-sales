import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BarangService from "../../services/BarangService";

const BarangListPage = () => {
  const navigate = useNavigate();
  const [daftarBarang, setDaftarBarang] = useState([]);

  useEffect(() => {
    BarangService.list()
      .then((response) => setDaftarBarang(response.data))
      .catch((error) => alert(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex justify-content-between align-items-center">
          <h4>Daftar Barang</h4>
          <Button onClick={() => navigate("/barang/add")}>
            <FaPlusCircle /> Tambah
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Card>
            <Table striped borderless>
              <thead>
                <tr>
                  <th>Kode Barang</th>
                  <th>Nama Barang</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Jumlah Barang</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              {daftarBarang.length > 0 ? (
                <tbody>
                  {daftarBarang.map((barang, index) => (
                    <tr key={index}>
                      <td>{barang.kodeBarang}</td>
                      <td>{barang.namaBarang}</td>
                      <td>{barang.hargaBeli}</td>
                      <td>{barang.hargaJual}</td>
                      <td>{barang.jumlahBarang}</td>
                      <td>
                        <Button
                          onClick={() =>
                            navigate(`/barang/edit/${barang.kodeBarang}`)
                          }>
                          <FaEdit /> Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                // barang masih belum terisi
                <tbody>
                  <tr>
                    <td colSpan={6}>Sedang memuat...</td>
                  </tr>
                </tbody>
              )}
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BarangListPage;
