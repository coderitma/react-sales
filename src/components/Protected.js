import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import RightMenu from "./misc/RightMenu";

const PrivateLayout = ({ title, children }) => {
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let isLoggedIn = await UserService.tokenVerify();
      if (!isLoggedIn) {
        navigate("/");
      }
    })();
  }, []);

  return (
    <>
      <RightMenu title={title} />
      <div className="mt-4">{children}</div>
    </>
  );
};

export default PrivateLayout;
