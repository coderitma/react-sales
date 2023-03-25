import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";

const PembelianListPage = () => {
  const navigate = useNavigate();
  const [daftarPembelian, setDaftarPembelian] = useState([]);

  useEffect(() => {
    PembelianService.list()
      .then((response) => setDaftarPembelian(response.data))
      .catch((error) => alert(error));
  }, []);

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex justify-content-between align-items-center">
          <h4>Daftar Pembelian</h4>
          <div>
            <Button onClick={() => navigate("/pembelian/add")}>
              <FaPlusCircle /> Tambah
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Card>
            <Table striped borderless>
              <thead>
                <tr>
                  <th>Faktur</th>
                  <th>Tanggal</th>
                  <th>Pemasok</th>
                  <th>Total</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              {daftarPembelian.length <= 0 && (
                <tbody>
                  <tr>
                    <td colSpan={5}>Data pembelian kosong</td>
                  </tr>
                </tbody>
              )}

              {daftarPembelian.length > 0 && (
                <tbody>
                  {daftarPembelian.map((pembelian, index) => (
                    <tr key={index}>
                      <td>{pembelian.faktur}</td>
                      <td>{pembelian.tanggal}</td>
                      <td>{pembelian.pemasok.kodePemasok}</td>
                      <td>{pembelian.total}</td>
                      <td>
                        <Button>
                          <FaEdit /> Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PembelianListPage;
