import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModulAuth from "./modules/auth/ModulAuth";
import ModulBarang from "./modules/barang/ModulBarang";
import Layout from "./modules/commons/components/Layout";
import PrivateLayout from "./modules/commons/components/PrivateLayout";
import ModulPemasok from "./modules/pemasok/ModulPemasok";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ModulAuth />} />
          <Route
            path="/barang"
            element={
              <PrivateLayout title="Modul Barang">
                <ModulBarang />
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

