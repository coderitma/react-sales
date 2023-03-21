import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import config from "../../config";
import UserService from "../../services/UserService";
import Toaster from "../misc/Toaster";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const [toaster, setToaster] = useState({
    message: "",
    configToast: {},
    showToast: false,
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const loginHandler = async () => {
    try {
      setToaster({});
      const payloadResponse = await UserService.loginService(user);
      UserService.saveToken(payloadResponse.data.token);
      setToaster((values) => ({
        ...values,
        message: "Login successfully",
        configToast: config.TOAST_SUCCESS,
        showToast: true,
      }));
    } catch (err) {
      setToaster((values) => ({
        ...values,
        message: err.message,
        configToast: config.TOAST_DANGER,
        showToast: true,
      }));
    }
  };

  return (
    <>
      <Toaster {...toaster} />
      <div className="vh-100 row d-flex justify-content-center align-items-center ">
        <div className="col-4">
          <Card className="shadow">
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
                    value={user.password || ""}
                    placeholder="Masukan password"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button onClick={loginHandler}>Login</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
