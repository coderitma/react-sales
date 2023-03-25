import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { BiBarChartSquare } from "react-icons/bi";

const NavigationWidget = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#" onClick={handleShow}>
            <BiBarChartSquare size={"1.5em"} />
            &nbsp;Brick Sales
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Master" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/barang")}>
                  Barang
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/pemasok")}>
                  Pemasok
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Transaksi" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/pembelian")}>
                  Pembelian
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <ListGroup variant="flush">
          <ListGroup.Item action onClick={() => navigate("/barang")}>
            Barang
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => navigate("/pemasok")}>
            Pemasok
          </ListGroup.Item>
        </ListGroup>
      </Offcanvas>
    </>
  );
};

export default NavigationWidget;
