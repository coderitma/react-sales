import { useState } from "react";
import { Form } from "react-bootstrap";
import BarangService from "../../services/BarangService";

const BarangChoiceWidget = ({ attr, callbackBarangChoiceWidget }) => {
  const [barang, setBarang] = useState({});

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      BarangService.get(e.target.value)
        .then((response) => {
          setBarang(response.data);
          callbackBarangChoiceWidget(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            alert("Barang tidak ada");
          }
        });
    }
  };

  return (
    <>
      <Form.Group {...attr}>
        <Form.Control
          type="text"
          placeholder="Ketik kode barang dan enter.."
          onKeyDown={handleSearch}
        />
      </Form.Group>
    </>
  );
};

export default BarangChoiceWidget;
