import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import PembelianReviewWidget from "../../widgets/pembelian/PembelianReviewWidget";
import PembelianSearchInlineWidget from "../../widgets/pembelian/PembelianSearchInlineWidget";

const PembelianListPage = () => {
  const navigate = useNavigate();
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [paginatePembelian, setPaginatePembelian] = useState({});
  const [queryPembelian, setQueryPembelian] = useState({ page: 1, limit: 2 });

  const handlePembelianServiceList = () => {
    PembelianService.list(queryPembelian)
      .then((response) => {
        setDaftarPembelian(response.data);
        setPaginatePembelian(JSON.parse(response.headers.pagination));
      })
      .catch((error) => alert(error));
  };

  const callbackPaginator = (page) => {
    setQueryPembelian((values) => ({ ...values, page }));
  };

  const callbackPembelianSearchInlineWidget = (query) => {
    setQueryPembelian((values) => ({ ...values, ...query }));
  };

  useEffect(() => {
    handlePembelianServiceList();
  }, [queryPembelian]);

  return (
    <>
      <NavigationWidget
        actionTop={
          <PembelianSearchInlineWidget
            attr={{ variant: "secondary" }}
            isShowFaktur={true}
            isShowKodePemasok={true}
            callbackPembelianSearchInlineWidget={
              callbackPembelianSearchInlineWidget
            }
          />
        }
        buttonCreate={
          <Button className="w-100" onClick={() => navigate("/pembelian/add")}>
            <FaPlusCircle /> Tambah
          </Button>
        }>
        <Card>
          <Card.Header className="d-flex justify-content-between align-item-baseline">
            <h5>Daftar Pembelian</h5>
            <Paginator
              paginate={paginatePembelian}
              callbackPaginator={callbackPaginator}
            />
          </Card.Header>
          <Table striped borderless>
            <thead>
              <tr>
                <th>Faktur</th>
                <th>Tanggal</th>
                <th>Pemasok</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            {daftarPembelian.length <= 0 && (
              <tbody>
                <tr>
                  <td colSpan={5}>Data pembelian kosong</td>
                </tr>
              </tbody>
            )}

            {daftarPembelian.length > 0 && (
              <tbody>
                {daftarPembelian.map((pembelian, index) => (
                  <tr key={index}>
                    <td>{pembelian.faktur}</td>
                    <td>{pembelian.tanggal}</td>
                    <td>{pembelian.kodePemasok}</td>
                    <td>{pembelian.total}</td>
                    <td>
                      <PembelianReviewWidget faktur={pembelian.faktur} />
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

export default PembelianListPage;