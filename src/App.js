import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarangList from "./components/barang/BarangList";
import Layout from "./components/Layout";
import PemasokList from "./components/pemasok/PemasokList";
import Protected from "./components/Protected";
import LoginPage from "./components/users/LoginPage";
import ModulPemasok from "./modules/pemasok/ModulPemasok";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route
            path="/barang"
            element={
              <Protected title="Modul Barang">
                <BarangList />
              </Protected>
            }
          />
          <Route
            path="/pemasok"
            element={
              <Protected title="Modul Pemasok">
                <ModulPemasok />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

