import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import BarangAddPage from "./pages/barang/BarangAddPage";
import BarangEditPage from "./pages/barang/BarangEditPage";
import BarangListPage from "./pages/barang/BarangListPage";
import PemasokAddPage from "./pages/pemasok/PemasokAddPage";
import PemasokEditPage from "./pages/pemasok/PemasokEditPage";
import PemasokListPage from "./pages/pemasok/PemasokListPage";
import PembelianAddPage from "./pages/pembelian/PembelianAddPage";
import PembelianListPage from "./pages/pembelian/PembelianListPage";
import BasicWidget from "./widgets/commons/BasicWidget";
import ReportingPembelianPage from "./pages/reporting/ReportingPembelianPage";
import AuthRegisterPage from "./pages/auth/AuthRegisterPage";
import AuthRouter from "./plugins/auth/AuthRouter";
import AuthPageLogin from "./plugins/auth/pages/AuthPageLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicWidget />}>
          <Route index element={<AuthLoginPage />} />
          <Route
            path={AuthRouter.AUTH_PAGE_LOGIN.path}
            element={<AuthPageLogin />}
          />
          <Route path="/test" element={<AuthRegisterPage />} />
          <Route path="/barang" element={<BarangListPage />} />
          <Route path="/barang/add" element={<BarangAddPage />} />
          <Route path="/barang/edit/:kodeBarang" element={<BarangEditPage />} />
          <Route path="/pemasok" element={<PemasokListPage />} />
          <Route path="/pemasok/add" element={<PemasokAddPage />} />
          <Route
            path="/pemasok/edit/:kodePemasok"
            element={<PemasokEditPage />}
          />
          <Route path="/pembelian" element={<PembelianListPage />} />
          <Route path="/pembelian/add" element={<PembelianAddPage />} />
          <Route
            path="/reporting/pembelian"
            element={<ReportingPembelianPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

