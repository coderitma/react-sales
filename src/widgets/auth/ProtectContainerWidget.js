import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import NavigationWidget from "../commons/NavigationWidget";

const ProtectContainerWidget = ({ children }) => {
  const navigate = useNavigate();

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
      <NavigationWidget />
      <div className="mt-4">{children}</div>
    </>
  );
};

export default ProtectContainerWidget;
