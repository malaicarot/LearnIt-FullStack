import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import LearnItLogo from "../../assets/_77c979a1-b417-48f9-995e-ae7f6765dcd7.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
  const {
    authState: {
      user: { userName },
    },
    logout,
    upload,
  } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const logoutHandler = () => logout();

  const onUploadChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleUploadSubmit = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    upload(formData);
  };

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow nav-menu">
      <Navbar.Brand className="font-weight-bolder text-white logo">
        <img src={LearnItLogo} alt="logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar p-2">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            DashBoard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="upload-nav">
            <button type="submit" onClick={handleUploadSubmit}>
            <input type="file" accept=".jpg, .png, .jpeg" onChange={onUploadChange} className="input-file" id="file" />
            <label for='file'>Upload Your Background!</label>
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </button>
          </div>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {userName}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white "
            onClick={logoutHandler}
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
