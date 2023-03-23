import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

const AuthLoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleAuthServiceLogin = () => {
    AuthService.login(user)
      .then((response) => {
        AuthService.saveToken(response.data.token);
        setTimeout(() => navigate("/barang"), 1000);
      })
      .catch((error) => alert(error));
  };

  return (
    <Container>
      <Row className="vh-100 row d-flex justify-content-center align-items-center">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="https://picsum.photos/900/400?random=1"
            />
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form>
                <Form.Group className="my-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    name="email"
                    onChange={handleInput}
                    value={user.email || ""}
                    type="email"
                    placeholder="Masukan email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={user.password || ""}
                    placeholder="Masukan password"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button onClick={handleAuthServiceLogin}>Login</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLoginPage;
