import { useState } from "react";
import { Form } from "react-bootstrap";
import PemasokService from "../../services/PemasokService";

const PemasokChoiceWidget = ({ callbackPemasokChoiceWidget }) => {
  const [pemasok, setPemasok] = useState({});

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      PemasokService.get(e.target.value)
        .then((response) => {
          setPemasok(response.data);
          callbackPemasokChoiceWidget(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            alert("Pemasok tidak ada");
          }
        });
    }
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Kode Pemasok</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ketik kode pemasok dan enter.."
          onKeyDown={handleSearch}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Nama Pemasok</Form.Label>
        <Form.Control type="text" disabled value={pemasok.namaPemasok || ""} />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Alamat Pemasok</Form.Label>
        <Form.Control
          type="text"
          disabled
          value={pemasok.alamatPemasok || ""}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Alamat Pemasok</Form.Label>
        <Form.Control
          type="text"
          disabled
          value={pemasok.teleponPemasok || ""}
        />
      </Form.Group>
    </>
  );
};

export default PemasokChoiceWidget;
