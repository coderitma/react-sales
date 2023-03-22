import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";

const ModulAuth = () => {
  const navigate = useNavigate();

  const handleCallback = (activity, data) => {
    if (activity === LoginComponent.activity.LOGIN_SUCCESS) {
      navigate("/barang");
    }
  };

  return (
    <>
      <div className="vh-100 row d-flex justify-content-center align-items-center ">
        <div className="col-4">
          <LoginComponent handleCallback={handleCallback} />
        </div>
      </div>
    </>
  );
};

export default ModulAuth;
