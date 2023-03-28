import { Container, Spinner } from "react-bootstrap";

const WaitingSpinner = ({ isInline, text }) => {
  return (
    <>
      {isInline && (
        <div className="d-flex w-100 justify-content-center">
          <span className="">
            <Spinner size="sm" />
            &nbsp;&nbsp;&nbsp; {text ? text : "Waiting moment"}
          </span>
        </div>
      )}

      {!isInline && (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
          <span className="d-flex align-items-center">
            <Spinner size="lg" animation="grow" />
            &nbsp;&nbsp;&nbsp;{text ? text : "Loading"}
          </span>
        </div>
      )}
    </>
  );
};

export default WaitingSpinner;
