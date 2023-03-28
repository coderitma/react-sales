import { Container, Spinner } from "react-bootstrap";

const WaitingSpinner = () => {
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <span className="d-flex align-items-center">
        <Spinner size="lg" animation="grow" />
        &nbsp;&nbsp;&nbsp;Loading..
      </span>
    </div>
  );
};

export default WaitingSpinner;
