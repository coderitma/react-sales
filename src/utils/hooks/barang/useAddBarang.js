import { useState } from "react";
import BarangService from "../../../services/BarangService";
import { useNavigate } from "react-router-dom";

const useAddBarang = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((values) => ({ ...values, [name]: value }));
  };

  const create = () => {
    BarangService.create(data).then(() => {
      alert("Berhasil menambahkan barang");
      navigate("/barang");
    });
  };

  const back = () => {
    return navigate(-1);
  };

  return [data, handleInput, create, back];
};

export default useAddBarang;
