import { Button, Card, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { helperReadableCurrency } from "../../utils/helpers";
import BarangSearchInlineWidget from "../../widgets/barang/BarangSearchInlineWidget";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import useDaftarBarang from "../../utils/hooks/barang/useDaftarBarang";

const BarangListPage = () => {
  const navigate = useNavigate();
  const [daftarBarang, pagination, callbackSearch, callbackPagination] =
    useDaftarBarang();

  return (
    <>
      <NavigationWidget
        actionTop={
          <BarangSearchInlineWidget
            attr={{ variant: "secondary" }}
            isShowKodeBarang={true}
            isShowNamaBarang={true}
            callbackBarangSearchInlineWidget={callbackSearch}
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
              paginate={pagination}
              callbackPaginator={callbackPagination}
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
            {daftarBarang.length > 0 && (
              <tbody>
                {daftarBarang.map((barang, index) => (
                  <tr key={index}>
                    <td>{barang.kodeBarang}</td>
                    <td>{barang.namaBarang}</td>
                    <td>{helperReadableCurrency(barang.hargaBeli)}</td>
                    <td>{helperReadableCurrency(barang.hargaJual)}</td>
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
            )}
          </Table>
        </Card>
      </NavigationWidget>
    </>
  );
};

export default BarangListPage;
