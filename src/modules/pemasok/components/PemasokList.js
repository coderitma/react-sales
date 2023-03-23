import { Form } from "react-bootstrap";
import PemasokForm from "./PemasokFormComponent";
import { FaSearch } from "react-icons/fa";

const PemasokList = ({
  pemasok,
  handlePilihPemasok,
  pilihPemasok,
  handleCallback,
}) => {
  return (
    <tr key={pemasok.kodePemasok}>
      <td>
        <Form.Check
          inline
          onChange={() => handlePilihPemasok(pemasok.kodePemasok)}
          checked={pilihPemasok.includes(pemasok.kodePemasok)}
        />
        {pemasok.kodePemasok}
      </td>
      <td>{pemasok.namaPemasok}</td>
      <td>{pemasok.alamatPemasok}</td>
      <td>{pemasok.teleponPemasok}</td>
      <td>
        <PemasokForm
          handleCallback={handleCallback}
          variant="secondary"
          kodePemasok={pemasok.kodePemasok}
          size={"sm"}
          title="Edit Pemasok"
          textButton={
            <>
              <FaSearch /> Lihat
            </>
          }
        />
      </td>
    </tr>
  );
};

export default PemasokList;
