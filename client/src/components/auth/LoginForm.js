import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import AlertMessage from "../Layout/AlertMessage.js";
const LoginForm = () => {
  //context
  const { login } = useContext(AuthContext);
  
  //local state
  const [loginValue, setLoginValue] = useState({
    userName: "",
    passWord: "",
  });

  //alert message
  const [alert, setAlert] = useState(null)




  const { userName, passWord } = loginValue;

  const onChangeLoginForm = (event) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  };

  const loginUser = async (event) => {
    event.preventDefault();

    try {
      const loginData = await login(loginValue);

      if (loginData.success) {
        setAlert({type: 'secondary', message: loginData.message})
        setTimeout( () => setAlert(null), 5000)
      } else {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout( () => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Form className="my-4 " onSubmit={loginUser}>
        <AlertMessage info={alert} />
        <Form.Group className="form-group">
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            required
            value={userName}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="password"
            placeholder="Password"
            name="passWord"
            required
            value={passWord}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have account?
        <Link to="/register" className="ps-1">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
