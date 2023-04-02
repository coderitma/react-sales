import { useState, useEffect } from "react";
import { Card, Dropdown, DropdownButton, Table, Button } from "react-bootstrap";
import { FaPlusCircle, FaDownload, FaTrash } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import ReportingService from "../../services/ReportingService";
import Paginator from "../../widgets/commons/Paginator";
import ReportingSearchInlineWidget from "../../widgets/reporting/ReportingSearchInlineWidget";
import { useNavigate } from "react-router-dom";

const ReportingListPage = () => {
  const navigate = useNavigate();
  const [daftarReporting, setDaftarReporting] = useState([]);
  const [paginateReporting, setPaginateReporting] = useState({});
  const [queryReporting, setQueryReporting] = useState({ page: 1, limit: 2 });

  const handleReportingServiceList = () => {
    ReportingService.list(queryReporting).then((response) => {
      setDaftarReporting(response.data);
      if (response.headers.pagination) {
        setPaginateReporting(JSON.parse(response.headers.pagination));
      }
    });
  };

  const handleReportingServiceDelete = (reporting) => {
    ReportingService.delete(reporting).then((response) => {
      handleReportingServiceList();
    });
  };

  useEffect(() => {
    handleReportingServiceList();
    // eslint-disable-next-line
  }, [queryReporting]);

  const handleReportingServiceDownload = async (reporting) => {
    await ReportingService.download(reporting);
  };

  const callbackPaginator = (page) => {
    setQueryReporting((values) => ({ ...values, page }));
  };

  const callbackReportingSearchInlineWidget = (query) => {
    setQueryReporting((values) => ({ ...values, ...query }));
  };

  return (
    <>
      <NavigationWidget
        actionTop={
          <ReportingSearchInlineWidget
            callbackReportingSearchInlineWidget={
              callbackReportingSearchInlineWidget
            }
            attr={{ variant: "secondary" }}
          />
        }
        buttonCreate={
          <DropdownButton
            id="dropdown-basic-button"
            title={
              <>
                <FaPlusCircle /> {"Tambah Laporan"}
              </>
            }>
            <Dropdown.Item onClick={() => navigate("/reporting/pembelian")}>
              Pembelian
            </Dropdown.Item>
          </DropdownButton>
        }>
        <Card>
          <Card.Header className="d-flex justify-content-between align-item-baseline">
            <h5>Reporting</h5>
            <Paginator
              paginate={paginateReporting}
              callbackPaginator={callbackPaginator}
            />
          </Card.Header>
          <Table borderless striped>
            <thead>
              <tr>
                <th>Email</th>
                <th>Jenis Report</th>
                <th>Unduh</th>
              </tr>
            </thead>
            <tbody>
              {daftarReporting.map((reporting, index) => (
                <tr key={index}>
                  <td>{reporting.email}</td>
                  <td>{reporting.jenis}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleReportingServiceDownload(reporting);
                      }}>
                      <FaDownload />
                    </Button>
                    <Button
                      onClick={() => handleReportingServiceDelete(reporting)}
                      className="ms-2"
                      variant="outline-danger">
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </NavigationWidget>
    </>
  );
};

export default ReportingListPage;
