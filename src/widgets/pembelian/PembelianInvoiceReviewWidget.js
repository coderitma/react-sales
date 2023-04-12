import { useState } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const PembelianInvoiceReviewWidget = ({ pembelian, modal, attr }) => {
  const [show, setShow] = useState(false);

  if (modal) {
    return (
      <>
        <Button {...attr} onClick={() => setShow(true)}>
          <FaEdit /> Detail
        </Button>
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
                  <th>Harga Beli</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pembelian.item.map((item, index) => (
                  <tr key={index}>
                    <td>{item.kodeBarang}</td>
                    <td>{item.namaBarang}</td>
                    <td>{item.hargaBeli}</td>
                    <td>{item.jumlahBeli}</td>
                    <td>{item.subtotal}</td>
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
        </Modal>
      </>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Invoice #{pembelian.faktur || "Nomor Faktur"}</Card.Title>
        <small>{pembelian.tanggal || "Tanggal"}</small>
      </Card.Body>
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
                <td>{item.jumlahBarang}</td>
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
    </Card>
  );
};

export default PembelianInvoiceReviewWidget;
