import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import PemasokService from "../../services/PemasokService";
import PemasokForm from "./PemasokForm";
import { FaSearch, FaPlusSquare } from "react-icons/fa";
import PemasokDeleteConfirm from "./PemasokDeleteConfirm";

const PemasokList = () => {
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [pilihPemasok, setPilihPemasok] = useState([]);

  const handleCallback = (activity, data) => {
    if (activity === PemasokDeleteConfirm.activity.CANCEL) {
      setPilihPemasok([]);
    } else if (activity === PemasokDeleteConfirm.activity.REFRESH) {
      handlePemasokServiceList();
      setPilihPemasok([]);
    }
  };

  const handlePilihPemasok = (kodePemasok) => {
    if (pilihPemasok.includes(kodePemasok)) {
      setPilihPemasok(pilihPemasok.filter((item) => item !== kodePemasok));
    } else {
      setPilihPemasok([...pilihPemasok, kodePemasok]);
    }
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

  const componentInlineList = ({
    kodePemasok,
    namaPemasok,
    alamatPemasok,
    teleponPemasok,
  }) => {
    return (
      <tr key={kodePemasok}>
        <td>
          <Form.Check
            inline
            onChange={() => handlePilihPemasok(kodePemasok)}
            checked={pilihPemasok.includes(kodePemasok)}
          />
          {kodePemasok}
        </td>
        <td>{namaPemasok}</td>
        <td>{alamatPemasok}</td>
        <td>{teleponPemasok}</td>
        <td>
          <PemasokForm
            handleCallback={handleCallback}
            variant="secondary"
            kodePemasok={kodePemasok}
            size={"sm"}
            title="Edit Pemasok"
            textButton={
              <>
                <FaSearch /> Lihat
              </>
            }
          />
        </td>
      </tr>
    );
  };

  return (
    <>
      <Container>
        <Row className="my-2">
          <Col
            md={12}
            className="d-flex align-items-center flex-row justify-content-between">
            <h4>Daftar Pemasok</h4>
            <div>
              <PemasokDeleteConfirm
                daftarPemasok={pilihPemasok}
                variant="outline-secondary"
                size={"sm"}
                textButton="Hapus"
                classes={"mx-2"}
                handleCallback={handleCallback}
              />
              <PemasokForm
                handleCallback={handleCallback}
                variant="dark"
                size={"sm"}
                title="Tambah Pemasok"
                textButton={
                  <>
                    <FaPlusSquare /> Tambah
                  </>
                }
              />
            </div>
          </Col>
        </Row>
        <Row className="my-2">
          <Col md={12} sm={12}>
            <Card>
              <Table responsive>
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
                    daftarPemasok.map((pemasok) =>
                      componentInlineList(pemasok)
                    )}
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
