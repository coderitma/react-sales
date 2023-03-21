import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarangList from "./components/barang/BarangList";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import LoginPage from "./components/users/LoginPage";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

