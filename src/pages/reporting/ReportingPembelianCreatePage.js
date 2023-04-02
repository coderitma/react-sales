import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportingService from "../../services/ReportingService";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import NavigationWidget from "../../widgets/commons/NavigationWidget";
import { Button, Card, Form } from "react-bootstrap";

const ReportingPembelianCreatePage = () => {
  const navigate = useNavigate();
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

  const handleReportingServiceCreate = () => {
    ReportingService.create(reportingPembelian).then(async (response) => {
      let isDownload = window.confirm("Berhasil, ingin diunduh?");
      if (isDownload) {
        await ReportingService.download(response.data);
      }
      navigate("/reporting");
    });
  };

  return (
    <NavigationWidget
      actionTop={
        <>
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="secondary">
            <FaArrowLeft /> Kembali
          </Button>
          <Button onClick={handleReportingServiceCreate}>
            <FaSave /> Simpan
          </Button>
        </>
      }>
      <Card>
        <Card.Header>
          <h5>Laporan Pembelian Barang</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mt-2">
            <Form.Label>Kode Barang</Form.Label>
            <Form.Control
              name="kodeBarang"
              value={reportingPembelian.kodeBarang || ""}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Dari Tanggal</Form.Label>
            <Form.Control
              name="fromTanggal"
              type="date"
              value={reportingPembelian.fromTanggal || ""}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group className="mt-2">
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

export default ReportingPembelianCreatePage;
