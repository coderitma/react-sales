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
import PembelianPrintPage from "./pages/pembelian/PembelianPrintPage";
import PembelianReportingPage from "./pages/pembelian/PembelianReportingPage";
import ProtectContainerWidget from "./widgets/auth/ProtectContainerWidget";
import LayoutWidget from "./widgets/commons/LayoutWidget";
import ReportingListPage from "./pages/reporting/ReportingListPage";
import ReportingPembelianCreatePage from "./pages/reporting/ReportingPembelianCreatePage";

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
          <Route
            path="/pemasok"
            element={
              <ProtectContainerWidget>
                <PemasokListPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pemasok/add"
            element={
              <ProtectContainerWidget>
                <PemasokAddPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pemasok/edit/:kodePemasok"
            element={
              <ProtectContainerWidget>
                <PemasokEditPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pembelian"
            element={
              <ProtectContainerWidget>
                <PembelianListPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pembelian/add"
            element={
              <ProtectContainerWidget>
                <PembelianAddPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pembelian/reporting"
            element={
              <ProtectContainerWidget>
                <PembelianReportingPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/pembelian/:faktur/print"
            element={
              <ProtectContainerWidget>
                <PembelianPrintPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/reporting"
            element={
              <ProtectContainerWidget>
                <ReportingListPage />
              </ProtectContainerWidget>
            }
          />
          <Route
            path="/reporting/pembelian"
            element={
              <ProtectContainerWidget>
                <ReportingPembelianCreatePage />
              </ProtectContainerWidget>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

