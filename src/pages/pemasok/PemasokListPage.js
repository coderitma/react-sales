import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PemasokService from "../../services/PemasokService";
import PemasokSearchWidget from "../../widgets/pemasok/PemasokSearchWidget";

const PemasokListPage = () => {
  const navigate = useNavigate();
  const [daftarPemasok, setDaftarPemasok] = useState([]);

  useEffect(() => {
    PemasokService.list()
      .then((response) => setDaftarPemasok(response.data))
      .catch((error) => alert(error));
  }, []);

  const callbackPemasokSearchWidget = (data) => {
    setDaftarPemasok(data);
  };

  return (
    <Container>
      <Row>
        <Col
          md={12}
          className="d-flex justify-content-between align-items-center">
          <h4>Daftar Pemasok</h4>
          <div>
            <PemasokSearchWidget
              attr={{ className: "me-2", variant: "outline-primary" }}
              callbackPemasokSearchWidget={callbackPemasokSearchWidget}
            />
            <Button onClick={() => navigate("/pemasok/add")}>
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
                  <th>Kode Pemasok</th>
                  <th>Nama Pemasok</th>
                  <th>Alamat Pemasok</th>
                  <th>Telepon Pemasok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              {daftarPemasok.length <= 0 && (
                <tbody>
                  <tr>
                    <td colSpan={5}>Data pemasok kosong</td>
                  </tr>
                </tbody>
              )}

              {daftarPemasok.length > 0 && (
                <tbody>
                  {daftarPemasok.map((pemasok, index) => (
                    <tr key={index}>
                      <td>{pemasok.kodePemasok}</td>
                      <td>{pemasok.namaPemasok}</td>
                      <td>{pemasok.alamatPemasok}</td>
                      <td>{pemasok.teleponPemasok}</td>
                      <td>
                        <Button
                          onClick={() =>
                            navigate(`/pemasok/edit/${pemasok.kodePemasok}`)
                          }>
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

export default PemasokListPage;
