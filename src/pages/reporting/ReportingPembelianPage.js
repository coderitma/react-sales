import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";
import PembelianService from "../../services/PembelianService";

const ReportingPembelianPage = () => {
  const [reportingPembelian, setReportingPembelian] = useState({
    kodeBarang: "",
    fromTanggal: new Date(),
    toTanggal: new Date(),
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setReportingPembelian((values) => ({ ...values, [name]: value }));
  };

  const handleReportPeriodExcel = async () => {
    await PembelianService.reportPeriodExcel(reportingPembelian);
  };

  return (
    <NavigationWidget
      actionTop={
        <>
          <Button onClick={handleReportPeriodExcel}>
            <FaDownload /> Export
          </Button>
        </>
      }>
      <Card>
        <Card.Header>
          <h5>Laporan Pembelian Barang</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              value={reportingPembelian.kodeBarang || ""}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Dari Tanggal</Form.Label>
            <Form.Control
              name="fromTanggal"
              type="date"
              value={reportingPembelian.fromTanggal || ""}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Sampai Tanggal</Form.Label>
            <Form.Control
              name="toTanggal"
              type="date"
              value={reportingPembelian.toTanggal || ""}
              onChange={handleInput}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </NavigationWidget>
  );
};

export default ReportingPembelianPage;
