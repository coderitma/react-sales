import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModulBarang from "./modules/barang/ModulBarang";
import Layout from "./modules/commons/components/Layout";
import PrivateLayout from "./modules/commons/components/PrivateLayout";
import ModulPemasok from "./modules/pemasok/ModulPemasok";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import BarangAddPage from "./pages/barang/BarangAddPage";
import BarangEditPage from "./pages/barang/BarangEditPage";
import BarangListPage from "./pages/barang/BarangListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AuthLoginPage />} />
          <Route
            path="/barang"
            element={
              <PrivateLayout title="Modul Barang">
                <BarangListPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/barang/add"
            element={
              <PrivateLayout title="Modul Barang">
                <BarangAddPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/barang/edit/:kodeBarang"
            element={
              <PrivateLayout>
                <BarangEditPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/pemasok"
            element={
              <PrivateLayout title="Modul Pemasok">
                <ModulPemasok />
              </PrivateLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

