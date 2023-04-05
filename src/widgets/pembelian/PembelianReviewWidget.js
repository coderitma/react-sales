import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FaFileExport, FaPrint, FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import PembelianService from "../../services/PembelianService";

const PembelianReviewWidget = ({ attr, faktur }) => {
  const [pembelian, setPembelian] = useState();
  const [show, setShow] = useState(false);

  const handlePembelianServiceGet = () => {
    PembelianService.get(faktur).then((response) => {
      setShow(true);
      setPembelian(response.data);
    });
  };

  const handleFakturPrint = async () => {
    await PembelianService.fakturPrint(pembelian.faktur);
  };

  return (
    <>
      <Button {...attr} onClick={handlePembelianServiceGet}>
        <FaSearchPlus />
      </Button>

      {pembelian && (
        <Modal show={show} onHide={() => setShow(false)} size={"lg"}>
          <Modal.Header closeButton>
            <Modal.Title>
              Invoice #{pembelian.faktur || "Nomor Faktur"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <small>{pembelian.tanggal || "Tanggal"}</small>
          </Modal.Body>
          {pembelian.pemasok && (
            <Table>
              <tbody>
                <tr>
                  <th>Kode Pemasok</th>
                  <td>{pembelian.pemasok.kodePemasok}</td>
                </tr>
                <tr>
                  <th>Nama Pemasok</th>
                  <td>{pembelian.pemasok.namaPemasok}</td>
                </tr>
                <tr>
                  <th>Alamat Pemasok</th>
                  <td>{pembelian.pemasok.alamatPemasok}</td>
                </tr>
              </tbody>
            </Table>
          )}

          {pembelian.item.length > 0 && (
            <Table>
              <thead>
                <tr>
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
                  <td>Total:</td>
                  <td style={{ textAlign: "right" }} colSpan={3}>
                    Rp. {pembelian.total}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
          <Modal.Footer>
            <Button onClick={handleFakturPrint}>
              <FaPrint /> Print
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default PembelianReviewWidget;
