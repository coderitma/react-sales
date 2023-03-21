import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Toaster = ({ showToast, message, configToast }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(showToast);
  }, [showToast]);

  return (
    <ToastContainer>
      <Toast
        bg={configToast && configToast.TEXT && configToast.TEXT.toLowerCase()}
        onClose={() => setShow(!show)}
        show={show}
        delay={3000}
        autohide>
        <Toast.Header>
          <img
            src={configToast && configToast.ICON}
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{configToast && configToast.TEXT}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
