import { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import BarangFormComponent from "./components/BarangFormComponent";
import BarangListComponent from "./components/BarangListComponent";
import BarangService from "./services/BarangService";

const ModulBarang = () => {
  const [daftarBarang, setDaftarBarang] = useState([]);

  const handleCallback = (activity, data) => {
    if (activity === BarangFormComponent.activity.CREATE_SUCCESS) {
      handleBarangServiceList();
    } else if (activity === BarangFormComponent.activity.EDIT_SUCCESS) {
      handleBarangServiceList();
    }
  };

  const handleBarangServiceList = () => {
    BarangService.list()
      .then((response) => {
        setDaftarBarang(response.data);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(handleBarangServiceList, []);

  return (
    <>
      <Container>
        <Row className="my-2">
          <Col
            md={12}
            className="d-flex align-items-center flex-row justify-content-between">
            <h4>Daftar Barang</h4>
            <div>
              <BarangFormComponent
                handleCallback={handleCallback}
                textButton={
                  <>
                    <FaPlus /> Tambah
                  </>
                }
                size="sm"
                title="Tambah Barang"
                variant="dark"
              />
            </div>
          </Col>
        </Row>
        <Row className="my-2">
          <Col md={12}>
            <Card>
              <Table responsive>
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
                <tbody>
                  {daftarBarang.length > 0 &&
                    daftarBarang.map((barang) => (
                      <BarangListComponent
                        key={barang.kodeBarang}
                        handleCallback={handleCallback}
                        barang={barang}
                      />
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

export default ModulBarang;
