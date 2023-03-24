import { Card, Table } from "react-bootstrap";

const PembelianInvoiceReviewWidget = ({ pembelian }) => {
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
