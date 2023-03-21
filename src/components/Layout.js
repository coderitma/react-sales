import { Outlet } from "react-router-dom";

const Layout = () => {
  // Periksa token pada localStorage
  // Gunakan token untuk mengecek apakah masih valid

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
