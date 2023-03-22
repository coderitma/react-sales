import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../auth/services/AuthService";
import MenuNavigation from "./MenuNavigation";

const PrivateLayout = ({ title, children }) => {
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let isLoggedIn = await AuthService.tokenVerify();
      if (!isLoggedIn) {
        navigate("/");
      }
    })();
  }, []);

  return (
    <>
      <MenuNavigation title={title} />
      <div className="mt-4">{children}</div>
    </>
  );
};

export default PrivateLayout;
