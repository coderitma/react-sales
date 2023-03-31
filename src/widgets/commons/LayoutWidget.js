import { Outlet } from "react-router-dom";
import HTTPService from "../../services/HTTPService";

const LayoutWidget = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutWidget;
