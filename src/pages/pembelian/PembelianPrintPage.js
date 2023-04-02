import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import { helperReadableDate } from "../../utils/helpers";

const PembelianPrintPage = () => {
  const navigate = useNavigate();
  const { faktur } = useParams();
  const [pembelian, setPembelian] = useState();

  const handlePembelianServiceGet = () => {
    PembelianService.get(faktur)
      .then((response) => {
        setPembelian(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    handlePembelianServiceGet();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {pembelian && (
        <Container className="mt-4 m-auto">
          <Row>
            <Col md={9}>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>
                      <h5>{pembelian.pemasok.namaPemasok}</h5>
                      {pembelian.pemasok.alamatPemasok} <br />
                      {pembelian.pemasok.teleponPemasok}
                    </td>
                    <td>
                      {helperReadableDate(pembelian.tanggal)} <br />
                      Kepata Yth: <br />
                      {pembelian.pemasok.namaPemasok}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <p style={{ marginTop: "70px" }}>
                FAKTUR No: <b>{pembelian.faktur}</b>
              </p>
              {pembelian.item.length > 0 && (
                <Table>
                  <thead>
                    <tr className="b-dark">
                      <th>Kode Barang</th>
                      <th>Nama Barang</th>
                      <th>Harga</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pembelian.item.map((item, index) => (
                      <tr key={index}>
                        <td>{item.kodeBarang}</td>
                        <td>{item.namaBarang}</td>
                        <td>{item.hargaBeli}</td>
                        <td>{item.jumlahBeli}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ textAlign: "right" }}>
                        Total:
                      </td>
                      <td colSpan={2} style={{ textAlign: "left" }}>
                        Rp. {pembelian.total}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table style={{ width: "200px" }} borderless>
                <tbody>
                  <tr>
                    <td className="text-left">Hormat Kami</td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <Table style={{ width: "120px" }} borderless>
                <tbody>
                  <tr>
                    <td>
                      <hr />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Button onClick={() => navigate("/pembelian")}>Back</Button>
          <Button className="ms-2" onClick={() => window.print()}>
            Print
          </Button>
        </Container>
      )}
    </>
  );
};

export default PembelianPrintPage;
