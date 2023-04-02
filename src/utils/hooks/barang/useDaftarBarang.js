import { useState, useEffect } from "react";
import BarangService from "../../../services/BarangService";

const useDaftarBarang = (query) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [queryBuilder, setQueryBuilder] = useState(
    query || { page: 1, limit: 10 }
  );

  const init = () => {
    BarangService.list(queryBuilder).then((response) => {
      setData(response.data);
      if (response.headers.pagination) {
        setPagination(JSON.parse(response.headers.pagination));
      }
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, [queryBuilder]);

  const callbackSearch = (q) => {
    setQueryBuilder((values) => ({ ...values, ...q }));
  };

  const callbackPagination = (page) => {
    setQueryBuilder((values) => ({ ...values, page }));
  };

  return [data, pagination, callbackSearch, callbackPagination];
};

export default useDaftarBarang;
