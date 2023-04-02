import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { BiBarChartSquare } from "react-icons/bi";
import { Col, Row } from "react-bootstrap";
import { FaChartArea, FaChartBar, FaTable } from "react-icons/fa";

const NavigationWidget = ({ children, buttonCreate, actionTop }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#">
            <BiBarChartSquare className="text-primary" size={"1.5em"} />
            &nbsp;MERN 15 SSP
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end">
            <div className="d-flex">{actionTop}</div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Row>
          <Col md={2}>
            {buttonCreate}
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link eventKey="disabled" disabled>
                <FaTable />
                &nbsp;&nbsp;&nbsp;Master
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/barang")} eventKey="/barang">
                Barang
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/pemasok")}>Pemasok</Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                <FaChartArea />
                &nbsp;&nbsp;&nbsp;Transaksi
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/pembelian")}>
                Pembelian
              </Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                <FaChartBar />
                &nbsp;&nbsp;&nbsp;Laporan
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/reporting")}>
                Laporan
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={10}>{children}</Col>
        </Row>
      </Container>
    </>
  );
};

export default NavigationWidget;
