import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import AuthService from "../services/AuthService";

const activity = {
  LOGIN_SUCCESS: "LoginComponent.LOGIN_SUCCESS",
};

const UserModel = {
  email: "budiasik@gmail.com",
  password: "",
};

const LoginComponent = ({ handleCallback }) => {
  const [user, setUser] = useState(UserModel);
  const [loading, setLoading] = useState(false);

  const handlerInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleAuthServiceLogin = () => {
    setLoading(true);
    AuthService.login(user)
      .then((response) => {
        AuthService.saveToken(response.data.token);
        setTimeout(() => {
          setLoading(false);
          handleCallback(activity.LOGIN_SUCCESS, user);
        }, 1000);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Card className="shadow">
        <Card.Img variant="top" src="https://picsum.photos/900/400?random=1" />
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form>
            <Form.Group className="my-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                onChange={handlerInput}
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
                onChange={handlerInput}
                value={user.password || ""}
                placeholder="Masukan password"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button disabled={loading} onClick={handleAuthServiceLogin}>
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

LoginComponent.activity = activity;
export default LoginComponent;
