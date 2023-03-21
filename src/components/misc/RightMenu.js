import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";

const RightMenu = ({ title }) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#" onClick={handleShow}>
            <img
              alt=""
              src="https://icons.iconarchive.com/icons/iconka/business-finance/64/cash-register-icon.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            &nbsp;&nbsp; Brick Sales <Badge bg="primary">{title}</Badge>
          </Navbar.Brand>
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

export default RightMenu;
