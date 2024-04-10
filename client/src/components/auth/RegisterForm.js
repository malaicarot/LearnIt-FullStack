import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";
import AlertMessage from "../Layout/AlertMessage.js";

const RegisterForm = () => {

   //context
   const { register } = useContext(AuthContext);

   //router
   const navigate = useNavigate();
 
   //local state
   const [registerValue, setRegisterValue] = useState({
     userName: "",
     passWord: "",
     confirmPassword: ""
   });
 
   //alert message
   const [alert, setAlert] = useState(null)
 
 
 
 
   const { userName, passWord, confirmPassword } = registerValue;
 
   const onChangeRegisterForm = (event) => {
     setRegisterValue({ ...registerValue, [event.target.name]: event.target.value });
   };
 
   const registerUser = async (event) => {
     event.preventDefault();
     if(passWord !== confirmPassword){
      setAlert({type: 'danger', message: 'Password do not match!'})
      setTimeout(() => setAlert(null), 5000);
      return
     }

 
     try {
       const registerData = await register(registerValue);
 
       if (registerData.success) {
         navigate("/login");
       } else {
         setAlert({type: 'danger', message: registerData.message})
         setTimeout( () => setAlert(null), 5000)
       }
     } catch (error) {
       console.log(error.message);
     }
   };
 




  return (
   <>
   <Form className="my-4 " onSubmit={registerUser}>
   <AlertMessage info={alert} />
     <Form.Group className="form-group">
       <Form.Control
         type="text"
         placeholder="Username"
         name="userName"
         required
         value={userName}
         onChange={onChangeRegisterForm}
       />
     </Form.Group>

     <Form.Group className="form-group">
       <Form.Control
         type="password"
         placeholder="Password"
         name="passWord"
         value={passWord}
         onChange={onChangeRegisterForm}
         required
       />
     </Form.Group>

     <Form.Group className="form-group">
       <Form.Control
         type="password"
         placeholder="Confirm Password"
         name="confirmPassword"
         required
         value={confirmPassword}
         onChange={onChangeRegisterForm}
       />
     </Form.Group>

     <Button variant="success" type="submit">
       Register
     </Button>
   </Form>
   <p>
     Already have account?
     <Link to="/login" className="ps-1">
       <Button variant="info" size="sm" className="ml-2">
         Login
       </Button>
     </Link>
   </p>
 </>
  )
}

export default RegisterForm