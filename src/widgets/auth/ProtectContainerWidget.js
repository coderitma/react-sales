import { createContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AlertContext, ModalContext } from "../../utils/context";
// import { ModalContext } from "../../utils/context";
import NavigationWidget from "../commons/NavigationWidget";

const ProtectContainerWidget = ({ children }) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState({
    header: "",
    message: "",
  });

  useEffect(() => {
    (async () => {
      let isLoggedIn = await AuthService.tokenVerify();
      if (!isLoggedIn) {
        navigate("/");
      }
    })();
  });

  return (
    <>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{showAlertMessage.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showAlertMessage.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowAlert(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertContext.Provider
        value={{
          showAlert,
          setShowAlert,
          showAlertMessage,
          setShowAlertMessage,
        }}>
        <div>{children}</div>
      </AlertContext.Provider>
    </>
  );
};

export default ProtectContainerWidget;
