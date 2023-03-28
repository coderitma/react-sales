import { useEffect, useRef, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BarangService from "../../services/BarangService";
import BarangSearchInlineWidget from "../../widgets/barang/BarangSearchInlineWidget";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import WaitingSpinner from "../../widgets/commons/WaitingSpinner";

const BarangListPage = () => {
  const navigate = useNavigate();
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState({});
  const [queryBarang, setQueryBarang] = useState({ page: 1, limit: 2 });

  const handleBarangServiceList = () => {
    BarangService.list(queryBarang)
      .then((response) => {
        setDaftarBarang(response.data);
        setPaginateBarang(JSON.parse(response.headers.pagination));
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    handleBarangServiceList();
  }, [queryBarang]);

  const callbackBarangSearchInlineWidget = (query) => {
    setQueryBarang((values) => ({ ...values, ...query }));
  };

  const callbackPaginator = (page) => {
    setQueryBarang((values) => ({ ...values, page }));
  };

  if (daftarBarang.length <= 0) return <WaitingSpinner />;

  return (
    <>
      {console.log("kepanggil")}
      <NavigationWidget
        actionTop={
          <BarangSearchInlineWidget
            attr={{ variant: "secondary" }}
            isShowKodeBarang={true}
            isShowNamaBarang={true}
            callbackBarangSearchInlineWidget={callbackBarangSearchInlineWidget}
          />
        }
        buttonCreate={
          <Button className="w-100" onClick={() => navigate("/barang/add")}>
            <FaPlusCircle /> Tambah
          </Button>
        }>
        <Card>
          <Card.Header className="d-flex justify-content-between align-item-baseline">
            <h5>Daftar Barang</h5>
            <Paginator
              paginate={paginateBarang}
              callbackPaginator={callbackPaginator}
            />
          </Card.Header>
          <Table striped borderless>
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
            {daftarBarang.length > 0 ? (
              <tbody>
                {daftarBarang.map((barang, index) => (
                  <tr key={index}>
                    <td>{barang.kodeBarang}</td>
                    <td>{barang.namaBarang}</td>
                    <td>{barang.hargaBeli}</td>
                    <td>{barang.hargaJual}</td>
                    <td>{barang.jumlahBarang}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/barang/edit/${barang.kodeBarang}`)
                        }>
                        <FaEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              // barang masih belum terisi
              <tbody>
                <tr>
                  <td colSpan={6}>Sedang memuat...</td>
                </tr>
              </tbody>
            )}
          </Table>
        </Card>
      </NavigationWidget>
    </>
  );
};

export default BarangListPage;
