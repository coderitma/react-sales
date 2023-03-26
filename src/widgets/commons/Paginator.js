import { Pagination } from "react-bootstrap";

const Paginator = ({ paginate, callbackPaginator }) => {
  const handlePagination = (page) => {
    callbackPaginator(page);
  };

  return (
    <Pagination>
      <Pagination.First
        disabled={!paginate.prev}
        onClick={() => handlePagination(paginate.prev)}
      />
      <Pagination.Last
        disabled={!paginate.next}
        onClick={() => handlePagination(paginate.next)}
      />
    </Pagination>
  );
};

export default Paginator;
