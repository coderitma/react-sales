import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import BarangAddPage from "./pages/barang/BarangAddPage";
import BarangEditPage from "./pages/barang/BarangEditPage";
import BarangListPage from "./pages/barang/BarangListPage";
import ProtectContainerWidget from "./widgets/auth/ProtectContainerWidget";
import LayoutWidget from "./widgets/commons/LayoutWidget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWidget />}>
          <Route index element={<AuthLoginPage />} />
          <Route
            path="/barang"
            element={
              <ProtectContainerWidget>
                <BarangListPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/barang/add"
            element={
              <ProtectContainerWidget>
                <BarangAddPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/barang/edit/:kodeBarang"
            element={
              <ProtectContainerWidget>
                <BarangEditPage />
              </ProtectContainerWidget>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

