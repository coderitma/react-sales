import { FaSearch } from "react-icons/fa";
import BarangFormComponent from "./BarangFormComponent";

const BarangListComponent = ({ barang, handleCallback }) => {
  return (
    <tr key={barang.kodeBarang}>
      <td>{barang.kodeBarang}</td>
      <td>{barang.namaBarang}</td>
      <td>{barang.hargaBeli}</td>
      <td>{barang.hargaJual}</td>
      <td>{barang.jumlahBarang}</td>
      <td>
        <BarangFormComponent
          handleCallback={handleCallback}
          textButton={
            <>
              <FaSearch /> Lihat
            </>
          }
          size="sm"
          title="Edit Barang"
          variant="secondary"
          kodeBarang={barang.kodeBarang}
        />
      </td>
    </tr>
  );
};

export default BarangListComponent;
