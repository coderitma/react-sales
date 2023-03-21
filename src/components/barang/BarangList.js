import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import config from "../../config";
import BarangService from "../../services/BarangService";
import BarangAdd from "./BarangAdd";
import BarangEdit from "./BarangEdit";

const BarangList = () => {
  const [daftarBarang, setDaftarBarang] = useState([]);

  const handleRefresh = () => {
    barangListHandler();
  };

  const handleCallback = (activity, data) => {
    barangListHandler();
  };

  const barangListHandler = () => {
    BarangService.list()
      .then(({ data }) => {
        setDaftarBarang(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    barangListHandler();
  }, []);

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-md-12 d-flex align-items-center flex-row justify-content-between">
          <h4>Daftar Barang</h4>
          <BarangAdd handleRefresh={handleRefresh} />
        </div>
      </div>
      <div className="row my-2">
        <div className="col-md-12 col-sm-12">
          <Card className="table-responsive">
            <Table striped hover>
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
                    <tr key={barang.kodeBarang}>
                      <td>{barang.kodeBarang}</td>
                      <td>{barang.namaBarang}</td>
                      <td>{barang.hargaBeli}</td>
                      <td>{barang.hargaJual}</td>
                      <td>{barang.jumlahBarang}</td>
                      <td>
                        <Button variant="outline-secondary" size="sm">
                          Hapus
                        </Button>
                        <BarangEdit
                          classAttr={"mx-2"}
                          variant={"warning"}
                          size="sm"
                          handleCallback={handleCallback}
                          kodeBarang={barang.kodeBarang}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BarangList;
