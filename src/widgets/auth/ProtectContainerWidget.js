import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { ToastContext } from "../../utils/context";

const ProtectContainerWidget = ({ children }) => {
  const [toastContextVariant, setToastContextVariant] = useState("light");
  const [toastContextShow, setToastContextShow] = useState(false);
  const [toastContextMessage, setToastContextMessage] = useState("");

  return (
    <>
      <ToastContainer className="mt-2 me-2" position="top-center">
        <Toast
          bg={toastContextVariant}
          delay={1500}
          autohide
          show={toastContextShow}
          onClose={() => setToastContextShow(false)}>
          <Toast.Header>
            <FaInfoCircle /> &nbsp;
            <strong className="me-auto">Hi, just for info!</strong>
          </Toast.Header>
          <Toast.Body>{toastContextMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContext.Provider
        value={{
          setToastContextShow,
          setToastContextMessage,
          setToastContextVariant,
        }}>
        <div>{children}</div>
      </ToastContext.Provider>
    </>
  );
};

export default ProtectContainerWidget;
