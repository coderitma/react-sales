import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";
import PemasokForm from "./PemasokForm";

const PemasokList = () => {
  const [daftarPemasok, setDaftarPemasok] = useState([]);

  const handleCallback = (activity, data) => {
    handlePemasokServiceList();
  };

  const handlePemasokServiceList = () => {
    PemasokService.list()
      .then((response) => {
        setDaftarPemasok(response.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(handlePemasokServiceList, []);

  return (
    <>
      <Container>
        <Row className="my-2">
          <Col
            md={12}
            className="d-flex align-items-center flex-row justify-content-between">
            <h4>Daftar Pemasok</h4>
            <PemasokForm
              handleCallback={handleCallback}
              variant="primary"
              size={"sm"}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col md={12} sm={12}>
            <Card>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Kode Pemasok</th>
                    <th>Nama Pemasok</th>
                    <th>Alamat Pemasok</th>
                    <th>Telepon Pemasok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {daftarPemasok.length > 0 &&
                    daftarPemasok.map((pemasok) => (
                      <tr key={pemasok.kodePemasok}>
                        <td>{pemasok.kodePemasok}</td>
                        <td>{pemasok.namaPemasok}</td>
                        <td>{pemasok.alamatPemasok}</td>
                        <td>{pemasok.teleponPemasok}</td>
                        <td>
                          <PemasokForm
                            handleCallback={handleCallback}
                            variant="warning"
                            kodePemasok={pemasok.kodePemasok}
                            size={"sm"}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PemasokList;
