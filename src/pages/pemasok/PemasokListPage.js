import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PemasokService from "../../services/PemasokService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import PemasokSearchInlineWidget from "../../widgets/pemasok/PemasokSearchInlineWidget";
import PemasokSearchWidget from "../../widgets/pemasok/PemasokSearchWidget";

const PemasokListPage = () => {
  const navigate = useNavigate();
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [paginatePemasok, setPaginatePemasok] = useState({});
  const [queryPemasok, setQueryPemasok] = useState({ page: 1 });

  const handlePemasokServiceList = () => {
    PemasokService.list(queryPemasok)
      .then((response) => {
        setDaftarPemasok(response.data);
        setPaginatePemasok(JSON.parse(response.headers.pagination));
      })
      .catch((error) => alert(error));
  };

  const handlePagination = (next) => {
    setQueryPemasok((values) => ({ ...values, page: next }));
  };

  useEffect(() => {
    handlePemasokServiceList();
    console.log(queryPemasok);
  }, [queryPemasok]);

  const callbackPemasokSearchInlineWidget = (query) => {
    setQueryPemasok((values) => ({ ...values, ...query }));
  };

  return (
    <>
      <NavigationWidget
        actionTop={
          <PemasokSearchInlineWidget
            attr={{ variant: "secondary" }}
            isShowNamaPemasok={false}
            isShowKodePemasok={true}
            isShowAlamatPemasok={true}
            callbackPemasokSearchInlineWidget={
              callbackPemasokSearchInlineWidget
            }
          />
        }
        buttonCreate={
          <Button className="w-100" onClick={() => navigate("/pemasok/add")}>
            <FaPlusCircle /> Tambah
          </Button>
        }>
        <Card className="w-100">
          <Card.Header className="d-flex justify-content-between align-items-baseline w-auto">
            <h5>Daftar Pemasok</h5>
            <Pagination>
              <Pagination.First
                variant="warning"
                disabled={!paginatePemasok.prev}
                onClick={() => handlePagination(paginatePemasok.prev)}
              />
              <Pagination.Last
                disabled={!paginatePemasok.next}
                onClick={() => handlePagination(paginatePemasok.next)}
              />
            </Pagination>
          </Card.Header>
          <Table borderless striped>
            <thead>
              <tr>
                <th colSpan={5}></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Kode Pemasok</th>
                <th>Nama Pemasok</th>
                <th>Alamat Pemasok</th>
                <th>Telepon Pemasok</th>
                <th>Aksi</th>
              </tr>
            </thead>

            {daftarPemasok.length <= 0 && (
              <tbody>
                <tr>
                  <td colSpan={5}>Data pemasok kosong</td>
                </tr>
              </tbody>
            )}

            {daftarPemasok.length > 0 && (
              <tbody>
                {daftarPemasok.map((pemasok, index) => (
                  <tr key={index}>
                    <td>{pemasok.kodePemasok}</td>
                    <td>{pemasok.namaPemasok}</td>
                    <td>{pemasok.alamatPemasok}</td>
                    <td>{pemasok.teleponPemasok}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/pemasok/edit/${pemasok.kodePemasok}`)
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

export default PemasokListPage;
