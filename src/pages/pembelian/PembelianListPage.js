import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PembelianService from "../../services/PembelianService";
import {
  helperReadableCurrency,
  helperReadableDate,
} from "../../utils/helpers";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import PembelianReviewWidget from "../../widgets/pembelian/PembelianReviewWidget";
import PembelianSearchInlineWidget from "../../widgets/pembelian/PembelianSearchInlineWidget";

const PembelianListPage = () => {
  const navigate = useNavigate();
  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [paginatePembelian, setPaginatePembelian] = useState({});
  const [queryPembelian, setQueryPembelian] = useState({ page: 1, limit: 10 });

  const handlePembelianServiceList = () => {
    PembelianService.list(queryPembelian)
      .then((response) => {
        setDaftarPembelian(response.data);
        if (response.headers.pagination) {
          setPaginatePembelian(JSON.parse(response.headers.pagination));
        }
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
    // eslint-disable-next-line
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
                    <td>{helperReadableDate(pembelian.tanggal)}</td>
                    <td>{pembelian.kodePemasok}</td>
                    <td>{helperReadableCurrency(pembelian.total)}</td>
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
