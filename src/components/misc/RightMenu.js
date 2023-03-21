import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { BiBarChartSquare } from "react-icons/bi";

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
            <BiBarChartSquare className="text-warning" size={"1.5em"} />
            &nbsp;&nbsp;Brick Sales
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
