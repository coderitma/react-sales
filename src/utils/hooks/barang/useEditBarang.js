import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BarangService from "../../../services/BarangService";

const useEditBarang = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { kodeBarang } = useParams();

  useEffect(() => {
    BarangService.get(kodeBarang).then((response) => {
      setData(response.data);
    });
    // eslint-disable-next-line
  }, []);

  const input = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const edit = () => {
    BarangService.edit(data).then(() => {
      navigate("/barang");
    });
  };

  const remove = () => {
    let confirmRemove = window.confirm(`Yakin ingin menghapus ${kodeBarang}?`);
    if (confirmRemove) {
      BarangService.remove(kodeBarang)
        .then(() => {
          alert("Berhasil menghapus barang");
          navigate("/barang");
        })
        .catch((error) => alert(error));
    }
  };

  return [data, input, edit, remove, navigate];
};

export default useEditBarang;
