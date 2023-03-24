import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import BarangService from "../../services/BarangService";
import BarangSearchWidget from "./BarangSearchWidget";

const BarangMultipleChoiceWidget = ({
  callbackBarangMultipleChoiceWidget,
  onlyIcon,
  isSingleAction,
  listBarang,
  attr,
}) => {
  const [daftarBarang, setDaftarBarang] = useState([]);
  const [show, setShow] = useState(false);

  const handleChoice = (barang) => {
    callbackBarangMultipleChoiceWidget(barang);
    if (isSingleAction) {
      setShow(false);
    }
  };

  const callbackBarangSearchWidget = (data) => {
    setDaftarBarang(data);
  };

  useEffect(() => {
    BarangService.list()
      .then((response) => {
        setDaftarBarang(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <>
      {onlyIcon && (
        <FaSearch onClick={() => setShow(true)} style={{ cursor: "pointer" }} />
      )}
      {!onlyIcon && (
        <Button {...attr} onClick={() => {}}>
          <FaSearch /> Pilih Barang
        </Button>
      )}

      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pilih Barang</Modal.Title>
          <BarangSearchWidget
            attr={{ variant: "outline-primary", className: "ms-2 btn-sm" }}
            callbackBarangSearchWidget={callbackBarangSearchWidget}
          />
        </Modal.Header>
        <Table>
          <thead>
            <tr>
              <th>Kode Barang</th>
              <th>Nama Barang</th>
              <th>Jumlah Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarBarang.length > 0 &&
              daftarBarang.map((barang, index) => (
                <tr key={index}>
                  <td>{barang.kodeBarang}</td>
                  <td>{barang.namaBarang}</td>
                  <td>{barang.jumlahBarang}</td>
                  <td>
                    {!listBarang.includes(barang) && (
                      <Button onClick={() => handleChoice(barang)}>
                        Pilih
                      </Button>
                    )}
                    {listBarang.includes(barang) && (
                      <Button variant="secondary" disabled>
                        Pilih
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default BarangMultipleChoiceWidget;
