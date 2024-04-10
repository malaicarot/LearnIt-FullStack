import React, { useContext, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import { AuthContext } from "../../contexts/AuthContext";
import SinglePost from "../Posts/SinglePost";
import AddPostMoDal from "../Posts/AddPostMoDal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UpdatePostModal from "../Posts/UpdatePostModal";

const DashBoard = () => {
  /**Contexts */
  // Posts context
  const {
    postsState: { posts, postLoading, post },
    getAll,
    setShowPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Auth context
  const {
    authState: {
      user: { userName, background },
    },
  } = useContext(AuthContext);
  console.log(background)

  useEffect(() => {
    getAll();
  }, []);

  let body;

  if (postLoading) {
    body = (
      <>
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only"></span>
        </div>
        ;
      </>
    );
  } else if (posts.length === 0) {
    body = (
      <div style={{background: `url(${background}) no-repeat center center/cover`, height: "100vh"}} className="row-learn">
        <Card className="text-center my-3 mx-5">
          <Card.Header>Hi {userName}!</Card.Header>
          <Card.Body>
            <Card.Title>WelCome To LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn!
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowPostModal.bind(this, true)}
              className="m-2"
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  } else {
    body = (
      <div style={{background: `url(${background}) no-repeat center center/cover`, height: "100%"}}>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 row-learn">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* OPEN ADD POST MODAL */}
        <OverlayTrigger placement="left" overlay={<Tooltip>Add New</Tooltip>} className="tooltip">
          <Button
            className="btn-floating"
            onClick={setShowPostModal.bind(this, true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </OverlayTrigger>
      </div>
    );
  }



  return (
    <>
      {body}
      <AddPostMoDal />
      {post !== null && <UpdatePostModal />}
      {/* <UpdatePostModal/> */}

      {/* After post added, show Toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default DashBoard;
