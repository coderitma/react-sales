import { useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PemasokService from "../../services/PemasokService";
import { AlertContext, ModalContext } from "../../utils/context";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import PemasokSearchInlineWidget from "../../widgets/pemasok/PemasokSearchInlineWidget";

const PemasokListPage = () => {
  const { setShowAlert, setShowAlertMessage } = useContext(AlertContext);
  const navigate = useNavigate();
  const [daftarPemasok, setDaftarPemasok] = useState([]);
  const [paginatePemasok, setPaginatePemasok] = useState({});
  const [queryPemasok, setQueryPemasok] = useState({ page: 1 });

  const handlePemasokServiceList = () => {
    PemasokService.list(queryPemasok)
      .then((response) => {
        if (response.data.length === 0) {
          setShowAlert(true);
          setShowAlertMessage({
            header: "Data kosong",
            message: "Data pemasok kosong.",
          });
        } else {
          setDaftarPemasok(response.data);
        }
        setPaginatePemasok(JSON.parse(response.headers.pagination));
      })
      .catch((error) => {
        setShowAlert(true);
        setShowAlertMessage({
          header: "Ups!",
          message: error.message,
        });
      });
  };

  const callbackPaginator = (page) => {
    setQueryPemasok((values) => ({ ...values, page }));
  };

  useEffect(() => {
    handlePemasokServiceList();
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
            <Paginator
              paginate={paginatePemasok}
              callbackPaginator={callbackPaginator}
            />
          </Card.Header>
          <Table borderless striped>
            <thead>
              <tr>
                <th>Kode Pemasok</th>
                <th>Nama Pemasok</th>
                <th>Alamat Pemasok</th>
                <th>Telepon Pemasok</th>
                <th>Aksi</th>
              </tr>
            </thead>

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
