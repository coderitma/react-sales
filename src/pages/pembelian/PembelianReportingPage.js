import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import PembelianService from "../../services/PembelianService";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import Paginator from "../../widgets/commons/Paginator";
import PembelianSearchInlineWidget from "../../widgets/pembelian/PembelianSearchInlineWidget";

const PembelianReportingPage = () => {
  const [pembelianReporting, setPembelianReporting] = useState([]);
  const [pembelianGrandTotal, setPembelianGrandTotal] = useState(0);
  const [paginatePembelianReporting, setPaginatePembelianReporting] = useState(
    {}
  );
  const [queryPembelianReporting, setQueryPembelianReporting] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (
      queryPembelianReporting.fromTanggal &&
      queryPembelianReporting.toTanggal
    ) {
      PembelianService.reporting(queryPembelianReporting)
        .then((response) => {
          setPembelianReporting(response.data.item);
          setPembelianGrandTotal(response.data.grandTotal);
          setPaginatePembelianReporting(
            JSON.parse(response.headers.pagination)
          );
        })
        .catch((error) => console.log(error));
    }
  }, [queryPembelianReporting]);

  const callbackPembelianSearchInlineWidget = (query) => {
    setQueryPembelianReporting((values) => ({ ...values, ...query }));
  };

  const callbackPaginator = (page) => {
    setQueryPembelianReporting((values) => ({ ...values, page }));
  };
  console.log(queryPembelianReporting);
  // if (pembelianReporting.length === 0) return <WaitingSpinner />;

  return (
    <>
      <NavigationWidget
        actionTop={
          <PembelianSearchInlineWidget
            callbackPembelianSearchInlineWidget={
              callbackPembelianSearchInlineWidget
            }
            isShowReporting={true}
          />
        }>
        <Card>
          <Card.Header className="d-flex justify-content-between align-item-baseline">
            <h5>Laporan Pembelian</h5>
            <Paginator
              paginate={paginatePembelianReporting}
              callbackPaginator={callbackPaginator}
            />
          </Card.Header>
          <Table className="table" striped hover borderless>
            <thead>
              <tr>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga Beli</th>
                <th>Jumlah Beli</th>
                <th>Total</th>
              </tr>
            </thead>
            {pembelianReporting.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    Silahkan lakukan pencarian berdasarkan tanggal...
                  </td>
                </tr>
              </tbody>
            )}
            {pembelianReporting.length > 0 && (
              <tbody>
                {pembelianReporting.map((report, index) => (
                  <tr key={index}>
                    <td>{report.kodeBarang}</td>
                    <td>{report.namaBarang}</td>
                    <td>
                      {report.hargaBeli.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td>{report.jumlahBeli}</td>
                    <td>
                      {report.total.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
          <Card.Footer className="d-flex justify-content-between">
            {pembelianGrandTotal ? (
              <>
                <h5>Total</h5>
                <h5>
                  {pembelianGrandTotal.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </h5>
              </>
            ) : (
              ""
            )}
          </Card.Footer>
        </Card>
      </NavigationWidget>
    </>
  );
};

export default PembelianReportingPage;
